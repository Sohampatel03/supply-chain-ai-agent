import React from "react";
import { BarChart3, DollarSign, AlertTriangle, CheckCircle } from "lucide-react";

const DonutProgress = ({ value = 0, size = 120, stroke = 12, label = "", color = "#667eea" }) => {
  const radius = (36 - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;
  
  return (
    <div className="donut-progress-container">
      <svg width={size} height={size} viewBox="0 0 36 36" className="donut-svg">
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={stroke}
          className="donut-background"
        />
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          className="donut-foreground"
        />
      </svg>
      <div className="donut-label-container">
        <div className="donut-value">{value}%</div>
        {label && <div className="donut-label">{label}</div>}
      </div>
    </div>
  );
};

const Badge = ({ children, tone = "amber", icon }) => {
  const color = {
    green: "badge-green",
    amber: "badge-amber",
    red: "badge-red",
    blue: "badge-blue",
  }[tone];
  
  return (
    <span className={`badge ${color}`}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
};

const Card = ({ title, action, children, className = "", icon }) => {
  return (
    <div className={`card ${className} animate-fade-in`}>
      {(title || action) && (
        <div className="card-title">
          {title && (
            <h3>
              {icon && <span>{icon}</span>}
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
};

const HeaderCards = () => {
  // Hardcoded data
  const data = {
    supplier: "TechFlow Electronics Pvt Ltd",
    result: {
      user: "68aa3ec4d164d8099df17f77",
      supplier: "68aa7721be2ae28edb9a12ad",
      delayRisk: "Medium",
      estimatedCost: 25275,
    },
  };

  const percentRisk = 14; // Hardcoded risk percentage
  const riskTone = "amber";
  const riskColor = "#f59e0b";

  return (
    <div className="header-cards">
      <Card className="header-card-lg" title="Supplier Analysis" icon={<BarChart3 size={20} />}>
        <div className="supplier-info">
          <div className="supplier-details">
            <h1>{data.supplier}</h1>
            <div className="supplier-details-grid">
              <div><span style={{ fontWeight: '600', color: '#475569' }}>User ID:</span> {data.result.user}</div>
              <div><span style={{ fontWeight: '600', color: '#475569' }}>Supplier ID:</span> {data.result.supplier}</div>
              <div><span style={{ fontWeight: '600', color: '#475569' }}>Analysis Date:</span> {new Date().toLocaleDateString()}</div>
              <div><span style={{ fontWeight: '600', color: '#475569' }}>Last Updated:</span> {new Date().toLocaleTimeString()}</div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Badge tone={riskTone} icon={<AlertTriangle size={12} />}>
                {data.result.delayRisk.toUpperCase()} RISK
              </Badge>
            </div>
          </div>
          <DonutProgress value={percentRisk} label="Risk Score" color={riskColor} />
        </div>
      </Card>

      <Card className="header-card-sm" title="Cost & Risk Insights" icon={<DollarSign size={20} />}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '0.25rem' }}>
              Estimated Cost
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b' }}>
              ₹{data.result.estimatedCost.toLocaleString("en-IN")}
            </div>
          </div>
          <DonutProgress value={percentRisk} color={riskColor} />
        </div>
        <div className="insight-card">
          <div className="insight-title">
            <CheckCircle size={16} />
            Analysis Complete
          </div>
          <div className="insight-text">
            Risk assessment completed with {percentRisk}% risk score. 
            {percentRisk < 20 ? " Low risk route recommended." : 
             percentRisk < 50 ? " Medium risk - monitor closely." : 
             " High risk - consider alternatives."}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HeaderCards;
