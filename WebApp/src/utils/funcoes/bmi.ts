export interface BmiZone {
  label: string;
  color: string;
}

const ZONES: (BmiZone & { min: number; max: number })[] = [
  { min: 0, max: 18.5, label: "Abaixo do peso", color: "#5B8CAD" },
  { min: 18.5, max: 25, label: "Peso normal", color: "#4F7965" },
  { min: 25, max: 30, label: "Sobrepeso", color: "#E8B34A" },
  { min: 30, max: Infinity, label: "Obesidade", color: "#D64545" },
];

export const ZONE_COLORS = ZONES.map((z) => z.color);

const GAUGE_MIN_BMI = 15;
const GAUGE_MAX_BMI = 40;
const GAUGE_BREAKPOINTS = [15, 18.5, 25, 30, 40];
const CX = 110;
const CY = 110;
const RADIUS = 90;
const NEEDLE_LENGTH = 78;

export const calculateBmi = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

export const classifyBmi = (bmi: number): BmiZone => {
  const zone = ZONES.find((z) => bmi >= z.min && bmi < z.max);
  return zone ?? ZONES[ZONES.length - 1];
};

export const idealWeightRange = (heightCm: number): { min: number; max: number } => {
  const heightM = heightCm / 100;
  return {
    min: 18.5 * heightM * heightM,
    max: 24.9 * heightM * heightM,
  };
};

const bmiToAngle = (bmi: number): number => {
  const clamped = Math.min(GAUGE_MAX_BMI, Math.max(GAUGE_MIN_BMI, bmi));
  const t = (clamped - GAUGE_MIN_BMI) / (GAUGE_MAX_BMI - GAUGE_MIN_BMI);
  return -90 + t * 180;
};

const pointAtAngle = (angleDeg: number, radius: number): { x: number; y: number } => {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + radius * Math.sin(rad),
    y: CY - radius * Math.cos(rad),
  };
};

const describeArc = (startAngle: number, endAngle: number): string => {
  const start = pointAtAngle(startAngle, RADIUS);
  const end = pointAtAngle(endAngle, RADIUS);
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}`;
};

export const gaugeZonePaths = (): string[] => {
  const paths: string[] = [];
  for (let i = 0; i < GAUGE_BREAKPOINTS.length - 1; i++) {
    paths.push(describeArc(bmiToAngle(GAUGE_BREAKPOINTS[i]), bmiToAngle(GAUGE_BREAKPOINTS[i + 1])));
  }
  return paths;
};

export const gaugeNeedlePoint = (bmi: number): { x: number; y: number } => pointAtAngle(bmiToAngle(bmi), NEEDLE_LENGTH);

export const gaugeCenter = () => ({ x: CX, y: CY });
