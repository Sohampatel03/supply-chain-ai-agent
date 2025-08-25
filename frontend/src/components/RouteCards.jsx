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

const RouteCards = ({ data }) => {
  const routes = data?.result?.routes || [];

  if (routes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
        No route data available for analysis.
      </div>
    );
  }

  return (
    <div className="routes-grid">
      {routes.map((r, i) => {
        // Use notes to determine route type and display label
        let routeLabel = "Route";
        let statusType = "alternate";
        if (r.notes === "primary-route") {
          routeLabel = "Primary Route";
          statusType = "primary";
        } else if (r.notes === "alternate-route") {
          routeLabel = "Alternate Route";
          statusType = "alternate";
        }

        return (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="animate-slide-up"
          >
            <Card title={`${routeLabel} ${i + 1}`}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stepper steps={r.path} />
                  <StatusIndicator type={statusType}>
                    {r.notes === "primary-route" ? "Active" : "Backup"}
                  </StatusIndicator>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <Metric 
                    icon={<Clock size={16} />} 
                    label="Duration" 
                    value={r.durationHours ? `${r.durationHours} hrs` : 'N/A'}
                    // Trend data is not in the JSON, so it remains hardcoded or can be removed
                    trend={-5}
                  />
                  <Metric 
                    icon={<Route size={16} />} 
                    label="Distance" 
                    value={r.distanceKm ? `${r.distanceKm} km` : 'N/A'}
                  />
                  <Metric 
                    icon={<DollarSign size={16} />} 
                    label="Cost" 
                    value={r.costEstimate ? `₹${r.costEstimate.toLocaleString("en-IN")}` : 'N/A'}
                    // Trend data is not in the JSON, so it remains hardcoded or can be removed
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
                  {/* Reliability is not in the JSON, so it's a placeholder */}
                  <span>Reliability: <strong style={{ color: '#1e293b' }}>N/A%</strong></span>
                  {/* Status is not in the JSON, so a fallback is used */}
                  <span>Status: <strong style={{ color: '#1e293b' }}>{r.status || 'N/A'}</strong></span>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RouteCards;