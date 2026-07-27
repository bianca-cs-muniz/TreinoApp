import AppException from "@errors/app-exception";

// https://github.com/joao-gugel/exercicios-bd-ptbr — nomes em PT-BR, mesmos ids/paths do free-exercise-db original.
const DATASET_URL =
  "https://raw.githubusercontent.com/joao-gugel/exercicios-bd-ptbr/main/exercises/exercises-ptbr-full-translation.json";
const IMAGE_BASE_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

const STOP_WORDS = new Set(["com", "de", "da", "do", "das", "dos", "em", "para", "por"]);

export interface CachedExercise {
  id: string;
  name: string;
  images: string[];
}

interface RawExercise {
  id: string;
  name: string;
  images?: string[];
}

let cache: CachedExercise[] = [];
let loadingPromise: Promise<void> | null = null;

const loadCache = async () => {
  const res = await fetch(DATASET_URL);
  if (!res.ok) throw new Error(`dataset de exercícios respondeu ${res.status}`);

  const data: RawExercise[] = await res.json();
  cache = data.map((item) => ({
    id: item.id,
    name: item.name,
    images: (item.images ?? []).map((path) => `${IMAGE_BASE_URL}${path}`),
  }));
};

export const ensureCache = async () => {
  if (cache.length > 0) return;
  if (!loadingPromise) {
    loadingPromise = loadCache().finally(() => {
      loadingPromise = null;
    });
  }
  await loadingPromise;
};

const stripAccents = (text: string) => text.normalize("NFD").replace(/[̀-ͯ]/g, "");

const normalizeWords = (text: string): string[] =>
  stripAccents(text)
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));

// compara só a raiz da palavra, pra tolerar variação de gênero/número (ex: "abdutora" casa com "Abdutor").
const sharesRoot = (a: string, b: string): boolean => {
  const len = Math.min(a.length, b.length, 5);
  return a.slice(0, len) === b.slice(0, len);
};

export const searchCache = (termPt: string, limit = 5): CachedExercise[] => {
  const queryWords = normalizeWords(termPt);
  if (queryWords.length === 0) return [];

  const scored = cache
    .map((ex) => {
      const nameWords = normalizeWords(ex.name);
      const matchCount = queryWords.filter((qw) => nameWords.some((nw) => sharesRoot(qw, nw))).length;
      const precision = nameWords.length > 0 ? matchCount / nameWords.length : 0;
      return { ex, matchCount, precision };
    })
    .filter((scoredEx) => scoredEx.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount || b.precision - a.precision);

  return scored.slice(0, limit).map((scoredEx) => scoredEx.ex);
};

export const getExerciseDetails = async (id: string) => {
  await ensureCache();

  const found = cache.find((ex) => ex.id === id);
  if (!found) throw new AppException(404, "Exercício não encontrado");
  return found;
};

ensureCache().catch(() => {});
