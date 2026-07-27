export type Etapa = 1 | 2 | 3;
export type ValorObjetivo = "EMAGRECER" | "GANHAR_MASSA" | "MANTER" | "CONDICIONAMENTO";

interface DadosCadastro {
  nome: string;
  email: string;
  senha: string;
  objetivo: ValorObjetivo;
  idade: string;
  peso: string;
  altura: string;
}

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export const validarEmail = (email: string): boolean => EMAIL_RE.test(email);

export const validarEtapa1 = (nome: string, email: string, senha: string): boolean =>
  nome.trim().length > 0 && validarEmail(email) && senha.length >= 6;

export const validarEtapa2 = (objetivo: ValorObjetivo | null): boolean => objetivo !== null;

export const validarEtapa3 = (idade: string, peso: string, altura: string): boolean =>
  Number(idade) > 0 && Number(peso) > 0 && Number(altura) > 0;

export const proximaEtapa = (atual: Etapa): Etapa => (atual < 3 ? ((atual + 1) as Etapa) : atual);

export const etapaAnterior = (atual: Etapa): Etapa => (atual > 1 ? ((atual - 1) as Etapa) : atual);

export const montarPayloadCadastro = ({ nome, email, senha, objetivo, idade, peso, altura }: DadosCadastro) => ({
  name: nome,
  email,
  password: senha,
  goal: objetivo,
  age: Number(idade),
  weightKg: Number(peso),
  heightCm: Number(altura),
});
