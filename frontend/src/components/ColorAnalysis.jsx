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
   </div>
  );
};

export default ColorAnalysis;
