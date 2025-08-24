import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3, AlertTriangle } from "lucide-react";

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

const ColorAnalysis = () => {
  // Hardcoded reliability data
  const reliabilityData = [
    { name: "Primary", value: 95, fill: "#667eea" },
    { name: "Alternate", value: 88, fill: "#f59e0b" },
    { name: "Emergency", value: 75, fill: "#ef4444" }
  ];

  return (
    <div className="charts-grid">
      <Card className="chart-container chart-container-lg" title="Route Reliability Distribution" icon={<BarChart3 size={20} />}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={reliabilityData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {reliabilityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="chart-container chart-container-lg" title="Color-Coded Risk Analysis" icon={<AlertTriangle size={20} />}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
              border: '2px solid #22c55e',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#166534' }}>95%</div>
              <div style={{ fontSize: '0.875rem', color: '#166534', fontWeight: '500' }}>Primary Route</div>
              <div style={{ fontSize: '0.75rem', color: '#15803d' }}>Excellent Reliability</div>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              border: '2px solid #f59e0b',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#92400e' }}>88%</div>
              <div style={{ fontSize: '0.875rem', color: '#92400e', fontWeight: '500' }}>Alternate Route</div>
              <div style={{ fontSize: '0.75rem', color: '#a16207' }}>Good Reliability</div>
            </div>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            border: '2px solid #ef4444',
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#b91c1c' }}>75%</div>
            <div style={{ fontSize: '0.875rem', color: '#b91c1c', fontWeight: '500' }}>Emergency Route</div>
            <div style={{ fontSize: '0.75rem', color: '#dc2626' }}>Moderate Reliability</div>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '0.75rem',
            marginTop: 'auto'
          }}>
            <div style={{ 
              background: '#22c55e', 
              height: '8px', 
              borderRadius: '4px',
              opacity: 0.95
            }}></div>
            <div style={{ 
              background: '#f59e0b', 
              height: '8px', 
              borderRadius: '4px',
              opacity: 0.88
            }}></div>
            <div style={{ 
              background: '#ef4444', 
              height: '8px', 
              borderRadius: '4px',
              opacity: 0.75
            }}></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ColorAnalysis;
