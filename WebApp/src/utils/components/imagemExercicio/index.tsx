import { useState } from "react";

interface ImagemExercicioProps {
  url?: string;
  nome?: string;
  largura?: number;
  altura?: number;
  borderRadius?: number;
}

/** Exibe a imagem do exercício com placeholder de iniciais quando sem foto.
 *  Ao clicar na imagem (quando há URL), abre um lightbox para visualização ampliada. */
export const ImagemExercicioComModal = ({
  url,
  nome,
  largura = 64,
  altura = 64,
  borderRadius = 8,
}: ImagemExercicioProps) => {
  const [modalAberto, setModalAberto] = useState(false);

  const iniciais = nome
    ? nome
        .split(" ")
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() ?? "")
        .join("")
    : "";

  const containerStyle: React.CSSProperties = {
    width: largura,
    height: altura,
    minWidth: largura,
    borderRadius,
    border: "1px solid #2e333c",
    overflow: "hidden",
    cursor: url ? "zoom-in" : "default",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: url
      ? `#14171c url(${url}) center/cover no-repeat`
      : "repeating-linear-gradient(45deg, #14171c, #14171c 8px, #22262e 8px, #22262e 16px)",
    flexShrink: 0,
  };

  return (
    <>
      <div
        style={containerStyle}
        onClick={() => url && setModalAberto(true)}
        title={url ? "Clique para ampliar" : undefined}
      >
        {!url && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {iniciais ? (
              <span
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: Math.max(14, largura * 0.28),
                  color: "#75797f",
                  lineHeight: 1,
                  letterSpacing: 1,
                }}
              >
                {iniciais}
              </span>
            ) : (
              <span style={{ fontSize: largura * 0.4, lineHeight: 1 }}>🏋️</span>
            )}
          </div>
        )}
      </div>

      {modalAberto && url && (
        <div
          onClick={() => setModalAberto(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setModalAberto(false); }}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#edeae3",
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
          <img
            src={url}
            alt={nome ?? "Exercício"}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "80vh",
              borderRadius: 12,
              objectFit: "contain",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            }}
          />
        </div>
      )}
    </>
  );
};
