const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export interface HeatCell {
  col: number;
  row: number;
  active: boolean;
  dateLabel: string;
  isDomingo: boolean;
}

export interface MonthLabel {
  col: number;
  label: string;
}

export interface YearHeatmap {
  cells: HeatCell[];
  monthLabels: MonthLabel[];
  numWeeks: number;
}

// usa componentes locais (não toISOString, que é UTC e pode deslocar o dia
// dependendo do fuso horário — um treino feito à noite podia cair no dia errado).
export const dateKey = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const parseDateKey = (key: string): Date => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const buildYearHeatmap = (year: number, activeDates: Set<string>, today: Date = new Date()): YearHeatmap => {
  const jan1 = new Date(year, 0, 1);
  const dec31 = new Date(year, 11, 31);
  const gridStart = new Date(jan1);
  gridStart.setDate(gridStart.getDate() - jan1.getDay());

  const cutoff = new Date(today);
  cutoff.setHours(0, 0, 0, 0);
  const gridEnd = cutoff.getTime() < dec31.getTime() ? cutoff : dec31;

  const totalDays = Math.floor((gridEnd.getTime() - gridStart.getTime()) / 86400000) + 1;
  const numWeeks = Math.ceil(totalDays / 7);

  const cells: HeatCell[] = [];
  const monthLabels: MonthLabel[] = [];
  const seenMonths = new Set<number>();

  for (let i = 0; i < numWeeks * 7; i++) {
    const d = new Date(gridStart);
    d.setDate(d.getDate() + i);
    if (d.getFullYear() !== year) continue;
    // igual o GitHub: não desenha quadrado pra dias futuros, o ano corrente para no dia de hoje.
    if (d.getTime() > cutoff.getTime()) continue;

    const col = Math.floor(i / 7) + 1;
    const row = (i % 7) + 1;
    const active = activeDates.has(dateKey(d));

    cells.push({
      col,
      row,
      active,
      dateLabel: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }),
      isDomingo: d.getDay() === 0,
    });

    if (d.getDate() === 1 && !seenMonths.has(d.getMonth())) {
      seenMonths.add(d.getMonth());
      monthLabels.push({ col, label: MESES[d.getMonth()] });
    }
  }

  return { cells, monthLabels, numWeeks };
};

// espera as chaves (YYYY-MM-DD) já em ordem crescente.
export const longestStreak = (sortedKeys: string[]): number => {
  let longest = 0;
  let current = 0;
  let prev: Date | null = null;

  sortedKeys.forEach((key) => {
    const d = parseDateKey(key);
    if (prev) {
      const diffDays = Math.round((d.getTime() - prev.getTime()) / 86400000);
      current = diffDays === 1 ? current + 1 : 1;
    } else {
      current = 1;
    }
    longest = Math.max(longest, current);
    prev = d;
  });

  return longest;
};
