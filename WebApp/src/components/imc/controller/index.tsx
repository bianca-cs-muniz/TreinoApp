import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import ImcService from "../service";
import { calculateBmi, classifyBmi, idealWeightRange, gaugeZonePaths, gaugeNeedlePoint } from "../../../utils/funcoes/bmi";

export function controllerImc() {
  const { user, updateUser } = useAuth();

  const [nome, setNome] = useState(user?.name ?? "");
  const [objetivo, setObjetivo] = useState<string | null>(user?.goal ?? null);
  const [idade, setIdade] = useState(user?.age != null ? String(user.age) : "");
  const [peso, setPeso] = useState(user?.weightKg != null ? String(user.weightKg) : "");
  const [altura, setAltura] = useState(user?.heightCm != null ? String(user.heightCm) : "");
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);

  const pesoNum = Number(peso);
  const alturaNum = Number(altura);
  const imc = pesoNum > 0 && alturaNum > 0 ? calculateBmi(pesoNum, alturaNum) : null;
  const zona = imc !== null ? classifyBmi(imc) : null;
  const faixaIdeal = alturaNum > 0 ? idealWeightRange(alturaNum) : null;
  const caminhosZonas = gaugeZonePaths();
  const ponteiro = imc !== null ? gaugeNeedlePoint(imc) : null;

  async function salvar() {
    if (!user || salvando) return;
    setSalvando(true);
    setSalvo(false);
    try {
      const atualizado = await ImcService.atualizarUsuario(user.id, {
        name: nome.trim() || undefined,
        goal: objetivo ?? undefined,
        age: idade ? Number(idade) : undefined,
        weightKg: peso ? Number(peso) : undefined,
        heightCm: altura ? Number(altura) : undefined,
      });
      updateUser(atualizado);
      setSalvo(true);
    } catch {
      // erro silencioso — o botão continua disponível pra tentar de novo.
    } finally {
      setSalvando(false);
    }
  }

  return {
    nome,
    setNome,
    objetivo,
    setObjetivo,
    idade,
    setIdade,
    peso,
    setPeso,
    altura,
    setAltura,
    salvando,
    salvo,
    imc,
    zona,
    faixaIdeal,
    caminhosZonas,
    ponteiro,
    salvar,
  };
}
