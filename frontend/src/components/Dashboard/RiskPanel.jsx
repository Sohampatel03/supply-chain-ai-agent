import React from 'react';

const RiskPanel = ({ expanded, setExpanded }) => {
  const riskCategories = [
    {
      key: "weather",
      icon: "🌦️",
      label: "Weather Risks",
      level: "Moderate",
      color: "yellow",
      details:
        "Possible heavy rain and thunderstorms expected along the route. Monitor weather updates.",
    },
    {
      key: "route",
      icon: "🛣️",
      label: "Route Risks",
      level: "Safe",
      color: "green",
      details: "No major traffic or roadblocks detected. Route is clear.",
    },
    {
      key: "marine",
      icon: "🚢",
      label: "Marine/Port Risks",
      level: "Safe",
      color: "green",
      details: "No port congestion or marine delays reported.",
    },
    {
      key: "geopolitical",
      icon: "🌍",
      label: "Geopolitical Risks",
      level: "High",
      color: "red",
      details: "Border strikes and regional unrest may impact delivery schedule.",
    },
    {
      key: "fuel",
      icon: "⛽",
      label: "Fuel/Operational Risks",
      level: "Moderate",
      color: "yellow",
      details: "Fuel prices are volatile. Operational costs may increase.",
    },
  ];

  return (
    <section className="risk-panel-full">
      <h2>Risk Assessment</h2>
      <div className="risk-list">
        {riskCategories.map((risk) => (
          <div key={risk.key} className={`risk-card risk-${risk.color}`}>
            <div
              className="risk-header"
              onClick={() =>
                setExpanded((e) => ({ ...e, [risk.key]: !e[risk.key] }))
              }
            >
              <span className="risk-icon">{risk.icon}</span>
              <span className="risk-label">{risk.label}</span>
              <span className={`risk-level risk-level-${risk.color}`}>
                {risk.level}
              </span>
              <span className="expand-arrow">
                {expanded[risk.key] ? "▲" : "▼"}
              </span>
            </div>
            {expanded[risk.key] && (
              <div className="risk-details">{risk.details}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default RiskPanel;
