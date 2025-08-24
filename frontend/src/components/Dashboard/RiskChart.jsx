import React from 'react';

const RiskChart = () => {
  const riskCategories = [
    {
      key: 'weather',
      label: 'Weather Risks',
      level: 'Moderate',
      color: 'yellow'
    },
    {
      key: 'route',
      label: 'Route Risks',
      level: 'Safe',
      color: 'green'
    },
    {
      key: 'marine',
      label: 'Marine/Port Risks',
      level: 'Safe',
      color: 'green'
    },
    {
      key: 'geopolitical',
      label: 'Geopolitical Risks',
      level: 'High',
      color: 'red'
    },
    {
      key: 'fuel',
      label: 'Fuel/Operational Risks',
      level: 'Moderate',
      color: 'yellow'
    },
  ];

  const riskLevelColor = {
    green: '#3ec98f',
    yellow: '#ffe066',
    red: '#ff5e5e',
  };

  return (
    <div className="risk-chart">
      <h3>Risk by Category</h3>
      <div className="bar-chart">
        {riskCategories.map((risk) => (
          <div key={risk.key} className="bar-row">
            <span className="bar-label">{risk.label}</span>
            <div className="bar-outer">
              <div
                className="bar-inner"
                style={{
                  width:
                    risk.level === "High"
                      ? "90%"
                      : risk.level === "Moderate"
                      ? "60%"
                      : "30%",
                  background: riskLevelColor[risk.color],
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskChart;
