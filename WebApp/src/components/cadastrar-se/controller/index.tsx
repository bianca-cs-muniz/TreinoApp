import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import UsuariosService from "../service";
import { calculateBmi, classifyBmi, idealWeightRange, gaugeZonePaths, gaugeNeedlePoint, ZONE_COLORS } from "../../../utils/funcoes/bmi";
import {
  Etapa,
  ValorObjetivo,
  etapaAnterior,
  montarPayloadCadastro,
  proximaEtapa,
  validarEtapa1,
  validarEtapa2,
  validarEtapa3,
} from "../../../utils/funcoes/cadastro";

export function controllerCadastro() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [etapa, setEtapa] = useState<Etapa>(1);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [objetivo, setObjetivo] = useState<ValorObjetivo | null>(null);

  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imcCalculado, setImcCalculado] = useState(false);

  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);

  const etapa1Valida = validarEtapa1(nome, email, senha);
  const etapa2Valida = validarEtapa2(objetivo);
  const valoresEtapa3Validos = validarEtapa3(idade, peso, altura);

  const imc = useMemo(() => {
    if (!imcCalculado || !valoresEtapa3Validos) return null;
    return calculateBmi(Number(peso), Number(altura));
  }, [imcCalculado, valoresEtapa3Validos, peso, altura]);

  const zona = imc !== null ? classifyBmi(imc) : null;
  const faixaIdeal = valoresEtapa3Validos ? idealWeightRange(Number(altura)) : null;
  const caminhosZonas = useMemo(() => gaugeZonePaths(), []);
  const ponteiro = imc !== null ? gaugeNeedlePoint(imc) : null;

  function resetarImcAoEditar() {
    setImcCalculado(false);
  }

  function editarIdade(valor: string) {
    setIdade(valor);
    resetarImcAoEditar();
  }

  function editarPeso(valor: string) {
    setPeso(valor);
    resetarImcAoEditar();
  }

  function editarAltura(valor: string) {
    setAltura(valor);
    resetarImcAoEditar();
  }

  function calcularImc() {
    if (!valoresEtapa3Validos) return;
    setImcCalculado(true);
  }

  function irParaLogin() {
    navigate("/login");
  }

  function avancarEtapa() {
    setEtapa(proximaEtapa);
  }

  function voltarEtapa() {
    setEtapa(etapaAnterior);
  }

  async function criarConta() {
    if (!imc || !objetivo || enviando || sucesso) return;
    setEnviando(true);
    setErro(false);
    try {
      const { user, token } = await UsuariosService.criarUsuario(
        montarPayloadCadastro({ nome, email, senha, objetivo, idade, peso, altura })
      );
      login(user, token);
      setSucesso(true);
      setTimeout(() => navigate("/"), 1200);
    } catch {
      setErro(true);
    } finally {
      setEnviando(false);
    }
  }

  return {
    etapa,
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    objetivo,
    setObjetivo,
    idade,
    setIdade: editarIdade,
    peso,
    setPeso: editarPeso,
    altura,
    setAltura: editarAltura,
    imcCalculado,
    enviando,
    sucesso,
    erro,
    etapa1Valida,
    etapa2Valida,
    valoresEtapa3Validos,
    imc,
    zona,
    faixaIdeal,
    caminhosZonas,
    coresZonas: ZONE_COLORS,
    ponteiro,
    calcularImc,
    criarConta,
    irParaLogin,
    avancarEtapa,
    voltarEtapa,
  };
}
