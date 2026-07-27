import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { SelectCustomizado } from "../../../../../utils/components/selectCustomizado";
import { ExercicioRascunho, SerieRascunho } from "../../controller";
import { ISugestaoExercicio } from "../../service";
import {
  BotaoIcone,
  CabecalhoExercicio,
  CabecalhoSeries,
  CampoBusca,
  CampoPeso,
  CampoRepeticoes,
  CartaoExercicio,
  ColunaPesoTitulo,
  ColunaRepeticoesTitulo,
  ColunaSerieTitulo,
  ImagemExercicio,
  ItemSugestao,
  LinhaDescanso,
  LinhaSerie,
  LinkAdicionarSerie,
  LinkRemoverExercicio,
  ListaSeries,
  ListaSugestoes,
  NomeExercicio,
  RotuloDescanso,
  RotuloSerie,
  SemFoto,
} from "../../styles";

const formatarRotuloDescanso = (segundos: number): string => {
  if (segundos === 0) return "Sem descanso";
  if (segundos < 60) return `${segundos}s`;
  const minutos = segundos / 60;
  return `${minutos % 1 === 0 ? minutos : minutos.toFixed(1)}min`;
};

const OPCOES_DESCANSO = [0, 15, 30, 45, 60, 90, 120, 150, 180, 240, 300].map((segundos) => ({
  value: segundos,
  label: formatarRotuloDescanso(segundos),
}));

const bloquearNegativo = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "-") e.preventDefault();
};

interface CartaoExercicioTreinoProps {
  exercicio: ExercicioRascunho;
  podeRemover: boolean;
  aoAlterarBusca: (idLocal: string, termo: string) => void;
  aoSelecionarSugestao: (idLocal: string, sugestao: ISugestaoExercicio) => void;
  aoConfirmarNomeManual: (idLocal: string, termo: string) => void;
  aoRemover: (idLocal: string) => void;
  aoAtualizar: (idLocal: string, patch: Partial<ExercicioRascunho>) => void;
  aoAdicionarSerie: (idLocal: string) => void;
  aoAtualizarSerie: (idLocal: string, index: number, patch: Partial<SerieRascunho>) => void;
  aoRemoverSerie: (idLocal: string, index: number) => void;
}

export const CartaoExercicioTreino = ({
  exercicio,
  podeRemover,
  aoAlterarBusca,
  aoSelecionarSugestao,
  aoConfirmarNomeManual,
  aoRemover,
  aoAtualizar,
  aoAdicionarSerie,
  aoAtualizarSerie,
  aoRemoverSerie,
}: CartaoExercicioTreinoProps) => {
  return (
    <CartaoExercicio>
      {!exercicio.selecionado && (
        <>
          <CampoBusca
            type="text"
            value={exercicio.termoBusca}
            onChange={(e) => aoAlterarBusca(exercicio.idLocal, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") aoConfirmarNomeManual(exercicio.idLocal, exercicio.termoBusca);
            }}
            placeholder="Buscar exercício (ex: Supino reto)"
          />
          {exercicio.sugestoes.length > 0 && (
            <ListaSugestoes>
              {exercicio.sugestoes.slice(0, 5).map((sugestao) => (
                <ItemSugestao key={sugestao.id} onClick={() => aoSelecionarSugestao(exercicio.idLocal, sugestao)}>
                  {sugestao.name}
                </ItemSugestao>
              ))}
            </ListaSugestoes>
          )}
          {podeRemover && (
            <LinkRemoverExercicio onClick={() => aoRemover(exercicio.idLocal)}>Remover</LinkRemoverExercicio>
          )}
        </>
      )}

      {exercicio.selecionado && (
        <>
          <CabecalhoExercicio>
            <ImagemExercicio $url={exercicio.imagemUrl}>
              {!exercicio.imagemUrl && <SemFoto>sem foto</SemFoto>}
            </ImagemExercicio>
            <NomeExercicio>{exercicio.nome}</NomeExercicio>
            <BotaoIcone onClick={() => aoRemover(exercicio.idLocal)}>
              <DeleteIcon sx={{ color: "#fff", fontSize: 20 }} />
            </BotaoIcone>
          </CabecalhoExercicio>

          <LinhaDescanso>
            <AccessTimeIcon sx={{ color: "#fff", fontSize: 16 }} />
            <RotuloDescanso>Descanso</RotuloDescanso>
            <SelectCustomizado
              value={exercicio.descansoSeg}
              onChange={(descansoSeg) => aoAtualizar(exercicio.idLocal, { descansoSeg })}
              opcoes={OPCOES_DESCANSO}
            />
          </LinhaDescanso>

          <CabecalhoSeries>
            <ColunaSerieTitulo>Série</ColunaSerieTitulo>
            <ColunaPesoTitulo>kg</ColunaPesoTitulo>
            <ColunaRepeticoesTitulo>Repetições</ColunaRepeticoesTitulo>
          </CabecalhoSeries>

          <ListaSeries>
            {exercicio.series.map((serie, index) => (
              <LinhaSerie key={index}>
                <RotuloSerie>Série {index + 1}</RotuloSerie>
                <CampoPeso
                  type="number"
                  min={0}
                  value={serie.peso}
                  onChange={(e) => aoAtualizarSerie(exercicio.idLocal, index, { peso: e.target.value })}
                  onKeyDown={bloquearNegativo}
                  placeholder="kg"
                />
                <CampoRepeticoes
                  type="number"
                  min={0}
                  value={serie.repeticoes}
                  onChange={(e) => aoAtualizarSerie(exercicio.idLocal, index, { repeticoes: e.target.value })}
                  onKeyDown={bloquearNegativo}
                  placeholder="reps"
                />
                <BotaoIcone onClick={() => aoRemoverSerie(exercicio.idLocal, index)}>
                  <DeleteIcon sx={{ color: "#fff", fontSize: 18 }} />
                </BotaoIcone>
              </LinhaSerie>
            ))}
          </ListaSeries>

          <LinkAdicionarSerie onClick={() => aoAdicionarSerie(exercicio.idLocal)}>+ Adicionar série</LinkAdicionarSerie>
        </>
      )}
    </CartaoExercicio>
  );
};
