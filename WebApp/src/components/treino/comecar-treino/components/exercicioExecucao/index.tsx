import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import { IExercicioTreino, ISetLog } from "../../service";
import { formatarRotuloDescanso } from "../../controller";
import {
  BotaoConcluirSerie,
  CabecalhoExercicioExecucao,
  CabecalhoSeriesExecucao,
  CampoEdicaoSerie,
  CartaoExercicioExecucao,
  ColunaPesoRepTitulo,
  ColunaSerieTitulo,
  ImagemExercicioExecucao,
  InfoExercicioExecucao,
  LinhaSerieExecucao,
  ListaSeriesExecucao,
  NomeExercicioExecucao,
  RotuloDescansoExercicio,
  RotuloSerieExecucao,
  RotuloUnidadeSerie,
  ValorSerieLeitura,
} from "../../styles";

interface ExercicioExecucaoCardProps {
  exercicio: IExercicioTreino;
  imagemUrl?: string;
  modoEdicao: boolean;
  sessaoAtiva: boolean;
  setLogsPorSetId: Map<string, ISetLog>;
  aoAlternarConcluido: (log: ISetLog, restSec: number | null) => void;
  aoEditarSerie: (log: ISetLog, patch: { weightKg?: number; reps?: number }) => void;
}

export const ExercicioExecucaoCard = ({
  exercicio,
  imagemUrl,
  modoEdicao,
  sessaoAtiva,
  setLogsPorSetId,
  aoAlternarConcluido,
  aoEditarSerie,
}: ExercicioExecucaoCardProps) => {
  const rotuloDescanso = formatarRotuloDescanso(exercicio.restSec);

  return (
    <CartaoExercicioExecucao>
      <CabecalhoExercicioExecucao>
        <ImagemExercicioExecucao $url={imagemUrl} />
        <InfoExercicioExecucao>
          <NomeExercicioExecucao>{exercicio.name}</NomeExercicioExecucao>
          {rotuloDescanso && (
            <RotuloDescansoExercicio>
              <AccessTimeIcon sx={{ fontSize: 12, color: "#9A9890" }} />
              Descanso entre séries: {rotuloDescanso}
            </RotuloDescansoExercicio>
          )}
        </InfoExercicioExecucao>
      </CabecalhoExercicioExecucao>

      <CabecalhoSeriesExecucao>
        <ColunaSerieTitulo>Série</ColunaSerieTitulo>
        <ColunaPesoRepTitulo>Peso x Repetições</ColunaPesoRepTitulo>
      </CabecalhoSeriesExecucao>

      <ListaSeriesExecucao>
        {exercicio.sets.map((set, index) => {
          const log = setLogsPorSetId.get(set.id);
          const peso = log?.weightKg ?? set.weightKg;
          const reps = log?.reps ?? set.reps;
          const concluida = log?.completed ?? false;

          const esmaecido = concluida && !modoEdicao;

          return (
            <LinhaSerieExecucao key={set.id}>
              <RotuloSerieExecucao $esmaecido={esmaecido}>Série {index + 1}</RotuloSerieExecucao>

              {modoEdicao ? (
                <>
                  <CampoEdicaoSerie
                    type="number"
                    min={0}
                    defaultValue={peso ?? ""}
                    onKeyDown={(e) => e.key === "-" && e.preventDefault()}
                    onBlur={(e) => log && aoEditarSerie(log, { weightKg: Math.max(0, Number(e.target.value)) || undefined })}
                    placeholder="kg"
                  />
                  <CampoEdicaoSerie
                    type="number"
                    min={0}
                    defaultValue={reps ?? ""}
                    onKeyDown={(e) => e.key === "-" && e.preventDefault()}
                    onBlur={(e) => log && aoEditarSerie(log, { reps: Math.max(0, Number(e.target.value)) || undefined })}
                    placeholder="reps"
                  />
                  <RotuloUnidadeSerie>kg / reps</RotuloUnidadeSerie>
                </>
              ) : (
                <ValorSerieLeitura $esmaecido={esmaecido}>
                  {peso ?? "—"}kg x {reps ?? "—"}
                </ValorSerieLeitura>
              )}

              {sessaoAtiva && log && (
                <BotaoConcluirSerie $concluida={concluida} onClick={() => aoAlternarConcluido(log, exercicio.restSec)}>
                  {concluida && (
                    <CheckIcon
                      sx={{
                        color: "#fff",
                        stroke: "#fff",
                        strokeWidth: 1,
                        fontSize: 20,
                      }}
                    />
                  )}
                </BotaoConcluirSerie>
              )}
            </LinhaSerieExecucao>
          );
        })}
      </ListaSeriesExecucao>
    </CartaoExercicioExecucao>
  );
};
