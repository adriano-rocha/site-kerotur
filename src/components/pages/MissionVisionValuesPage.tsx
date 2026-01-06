import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MissionVisionValuesPage: React.FC = () => {
  const { t } = useTranslation();
  const query = useQuery();
  const type = query.get("type") as "mission" | "vision" | "values" | null;

  const title =
    type === "mission"
      ? t("mission.title")
      : type === "vision"
      ? t("vision.title")
      : type === "values"
      ? t("values.title")
      : "";

  const text =
    type === "mission"
      ? t("mission.text")
      : type === "vision"
      ? t("vision.text")
      : type === "values"
      ? t("values.text")
      : "";

  return (
    <section className="mvv-hero">
      <div className="mvv-hero-overlay" />
      <div className="mvv-hero-content">
        <div className="mvv-card">
          <h1 className="mvv-title">{title}</h1>
          <p className="mvv-text">{text}</p>
          <button
            type="button"
            className="mvv-back-button"
            onClick={() => window.history.back()}
          >
            ×
          </button>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionValuesPage;
