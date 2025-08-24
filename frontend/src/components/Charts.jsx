import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from "recharts";
import { BarChart3, Route } from "lucide-react";

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

const Charts = () => {
  // Hardcoded chart data
  const costData = [
    { name: "Primary", cost: 5000, fill: "#667eea" },
    { name: "Alternate", cost: 6000, fill: "#f59e0b" },
    { name: "Emergency", cost: 7500, fill: "#ef4444" }
  ];

  const durationVsDistance = [
    { name: "Primary", duration: 48, distance: 1200 },
    { name: "Alternate", duration: 60, distance: 1500 },
    { name: "Emergency", duration: 72, distance: 1800 }
  ];

  return (
    <div className="charts-grid">
      <Card className="chart-container chart-container-lg" title="Cost Comparison (₹)" icon={<BarChart3 size={20} />}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="cost" radius={[8, 8, 0, 0]} fill="#667eea" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="chart-container chart-container-lg" title="Duration vs Distance Analysis" icon={<Route size={20} />}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={durationVsDistance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="duration" 
              stroke="#667eea" 
              strokeWidth={3}
              dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="distance" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Charts;
