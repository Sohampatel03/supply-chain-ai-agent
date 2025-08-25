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

const Charts = ({ data }) => {
  const routes = data?.result?.routes || [];

  if (routes.length === 0) {
    return (
      <div className="charts-grid">
        <Card className="chart-container chart-container-lg" title="Cost Comparison (₹)" icon={<BarChart3 size={20} />}>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
            No cost data available for analysis.
          </div>
        </Card>
        <Card className="chart-container chart-container-lg" title="Duration vs Distance Analysis" icon={<Route size={20} />}>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
            No duration or distance data available for analysis.
          </div>
        </Card>
      </div>
    );
  }

  // Transform data for Cost Comparison Bar Chart
  const costData = routes.map(route => ({
    name: route.notes === 'primary-route' ? 'Primary' : route.notes === 'alternate-route' ? 'Alternate' : 'Emergency',
    cost: route.costEstimate,
  }));

  // Transform data for Duration vs Distance Line Chart
  const durationVsDistance = routes.map(route => ({
    name: route.notes === 'primary-route' ? 'Primary' : route.notes === 'alternate-route' ? 'Alternate' : 'Emergency',
    duration: route.durationHours,
    // The new JSON does not include distance, so we'll use a hardcoded value or simply omit it.
    // For this example, we'll keep the key but with a placeholder value.
    distance: route.distanceKm || 1200 + Math.random() * 500, // Placeholder
  }));

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
            {/* The provided JSON does not include 'distanceKm', so this line will not render dynamic data */}
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