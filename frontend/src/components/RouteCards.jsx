import React from "react";
import { motion } from "framer-motion";
import { Clock, Route, DollarSign } from "lucide-react";

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

const Stepper = ({ steps = [] }) => {
  return (
    <div className="stepper">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="stepper-item">{s}</div>
          {i < steps.length - 1 && (
            <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>→</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const StatusIndicator = ({ type, children }) => {
  const statusClass = type === 'primary' ? 'status-primary' : 'status-alternate';
  return (
    <span className={`status-indicator ${statusClass}`}>
      {children}
    </span>
  );
};

const Metric = ({ icon, label, value, trend }) => {
  return (
    <div className="metric-card">
      <div className="metric-icon-label">
        {icon}
        <span className="metric-label">{label}</span>
      </div>
      <div className="metric-value">{value}</div>
      {trend && (
        <div style={{ 
          fontSize: '0.75rem', 
          color: trend > 0 ? '#22c55e' : '#ef4444',
          marginTop: '0.25rem'
        }}>
          {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
};

const RouteCards = () => {
  // Hardcoded route data
  const routes = [
    {
      path: ["Indore", "Interim Hub", "Mumbai"],
      durationHours: 48,
      distanceKm: 1200,
      costEstimate: 5000,
      notes: "primary-route",
      status: "active",
      reliability: 95
    },
    {
      path: ["Indore", "Alternate Hub", "Mumbai"],
      durationHours: 60,
      distanceKm: 1500,
      costEstimate: 6000,
      notes: "alternate-route",
      status: "backup",
      reliability: 88
    },
    {
      path: ["Indore", "Emergency Route", "Mumbai"],
      durationHours: 72,
      distanceKm: 1800,
      costEstimate: 7500,
      notes: "emergency-route",
      status: "emergency",
      reliability: 75
    }
  ];

  return (
    <div className="routes-grid">
      {routes.map((r, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="animate-slide-up"
        >
          <Card title={`Route ${i + 1} ${r.notes === "primary-route" ? "(Primary)" : r.notes === "alternate-route" ? "(Alternate)" : "(Emergency)"}`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Stepper steps={r.path} />
                <StatusIndicator type={r.notes === "primary-route" ? "primary" : "alternate"}>
                  {r.notes === "primary-route" ? "Active" : r.notes === "alternate-route" ? "Backup" : "Emergency"}
                </StatusIndicator>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <Metric 
                  icon={<Clock size={16} />} 
                  label="Duration" 
                  value={`${r.durationHours} hrs`}
                  trend={-5}
                />
                <Metric 
                  icon={<Route size={16} />} 
                  label="Distance" 
                  value={`${r.distanceKm} km`}
                />
                <Metric 
                  icon={<DollarSign size={16} />} 
                  label="Cost" 
                  value={`₹${r.costEstimate.toLocaleString("en-IN")}`}
                  trend={2}
                />
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: '#64748b'
              }}>
                <span>Reliability: <strong style={{ color: '#1e293b' }}>{r.reliability}%</strong></span>
                <span>Status: <strong style={{ color: '#1e293b' }}>{r.status}</strong></span>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default RouteCards;
