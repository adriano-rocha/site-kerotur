import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSEO } from "../../hooks/useSEO";
import { Target, Eye, Star } from "lucide-react";

const cards = [
  { key: "mission", Icon: Target },
  { key: "vision", Icon: Eye },
  { key: "values", Icon: Star },
];

function MissionVisionValues() {
  useSEO({
    title: "Missão, Visão e Valores",
    description:
      "Conheça a missão, visão e valores da Kerotur Turismo e Eventos.",
  });

  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const move = (dir: number) => {
    setCurrent((prev) => (prev + dir + 3) % 3);
  };

  return (
    <section className="py-20" style={{ backgroundColor: "#00008B" }}>
      <div className="container mx-auto px-8">
        {/* ── Desktop ── */}
        <div className="hidden md:grid grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {cards.map(({ key, Icon }) => (
            <div
              key={key}
              className="rounded-2xl p-10 text-center flex flex-col items-center justify-start shadow-xl border-t-4"
              style={{
                backgroundColor: "#00CED1",
                borderTopColor: "#FFA500",
                minHeight: "320px",
              }}
              data-aos="fade-up"
            >
              {/* Ícone */}
              <div
                className="mb-4 p-3 rounded-full"
                style={{ backgroundColor: "#00008B" }}
              >
                <Icon className="w-8 h-8" style={{ color: "#FFA500" }} />
              </div>

              {/* Título */}
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: "#00008B" }}
              >
                {t(`${key}.title`)}
              </h3>

              {/* Linha decorativa */}
              <div
                className="mb-5 rounded-full"
                style={{
                  width: "40px",
                  height: "3px",
                  backgroundColor: "#FFA500",
                }}
              />

              {/* Texto */}
              <p
                className="text-base leading-relaxed"
                style={{ color: "#003366" }}
              >
                {t(`${key}.text`)}
              </p>
            </div>
          ))}
        </div>

        {/* ── Mobile ── */}
        <div className="md:hidden max-w-xs mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {cards.map(({ key, Icon }) => (
                <div
                  key={key}
                  className="min-w-full rounded-2xl p-10 text-center flex flex-col items-center justify-start border-t-4"
                  style={{
                    backgroundColor: "#00CED1",
                    borderTopColor: "#FFA500",
                    minHeight: "320px",
                  }}
                >
                  {/* Ícone */}
                  <div
                    className="mb-4 p-3 rounded-full"
                    style={{ backgroundColor: "#00008B" }}
                  >
                    <Icon className="w-8 h-8" style={{ color: "#FFA500" }} />
                  </div>

                  {/* Título */}
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: "#00008B" }}
                  >
                    {t(`${key}.title`)}
                  </h3>

                  {/* Linha decorativa */}
                  <div
                    className="mb-5 rounded-full"
                    style={{
                      width: "40px",
                      height: "3px",
                      backgroundColor: "#FFA500",
                    }}
                  />

                  {/* Texto */}
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "#003366" }}
                  >
                    {t(`${key}.text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Botões Mobile */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => move(-1)}
              className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold transition"
              style={{ backgroundColor: "#00CED1", color: "#00008B" }}
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={() => move(1)}
              className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold transition"
              style={{ backgroundColor: "#00CED1", color: "#00008B" }}
              aria-label="Próximo"
            >
              →
            </button>
          </div>

          {/* Indicadores Mobile */}
          <div className="flex justify-center gap-2 mt-3">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-2.5 h-2.5 rounded-full transition"
                style={{
                  backgroundColor:
                    i === current ? "#FFA500" : "rgba(0,206,209,0.35)",
                }}
                aria-label={`Card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionVisionValues;
