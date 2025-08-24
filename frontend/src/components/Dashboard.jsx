import React, { useState } from "react";

const riskCategories = [
  {
    key: 'weather',
    icon: '🌦️',
    label: 'Weather Risks',
    level: 'Moderate',
    color: 'yellow',
    details: 'Possible heavy rain and thunderstorms expected along the route. Monitor weather updates.'
  },
  {
    key: 'route',
    icon: '🛣️',
    label: 'Route Risks',
    level: 'Safe',
    color: 'green',
    details: 'No major traffic or roadblocks detected. Route is clear.'
  },
  {
    key: 'marine',
    icon: '🚢',
    label: 'Marine/Port Risks',
    level: 'Safe',
    color: 'green',
    details: 'No port congestion or marine delays reported.'
  },
  {
    key: 'geopolitical',
    icon: '🌍',
    label: 'Geopolitical Risks',
    level: 'High',
    color: 'red',
    details: 'Border strikes and regional unrest may impact delivery schedule.'
  },
  {
    key: 'fuel',
    icon: '⛽',
    label: 'Fuel/Operational Risks',
    level: 'Moderate',
    color: 'yellow',
    details: 'Fuel prices are volatile. Operational costs may increase.'
  },
];

const riskLevelColor = {
  green: '#3ec98f',
  yellow: '#ffe066',
  red: '#ff5e5e',
};

const recentAlerts = [
  { id: 1, message: 'Heavy rain expected tomorrow in northern region.', type: 'Weather', time: '2 hours ago' },
  { id: 2, message: 'Border strike reported near checkpoint 3.', type: 'Geopolitical', time: '5 hours ago' },
  { id: 3, message: 'Fuel prices increased by 5%.', type: 'Operational', time: 'Today' },
];

const Dashboard = ({ supplier }) => {
  const [expanded, setExpanded] = useState({});
  const [section, setSection] = useState('dashboard');

  // Dummy overall risk calculation
  const overallRisk = 'Moderate';
  const overallRiskColor = riskLevelColor['yellow'];

  const sidebarItems = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'risk', label: 'Risk Assessment' },
    { key: 'routes', label: 'Routes' },
    { key: 'settings', label: 'Settings' },
  ];

  const renderDashboard = () => (
    <div className="dashboard-content-vertical">
      <section className="inventory-card">
        <h2>Inventory Information</h2>
        <div className="details-grid">
          <div><b>Supplier Name:</b> {supplier.supplierName}</div>
          <div><b>Contact Number:</b> {supplier.contactNumber}</div>
          <div><b>Item Name:</b> {supplier.itemName}</div>
          <div><b>Inventory Details:</b> {supplier.inventoryInfo}</div>
          <div><b>Route:</b> {supplier.route}</div>
          <div><b>Delivery Date:</b> {supplier.deliveryDate}</div>
          <div><b>Delivery Time:</b> {supplier.deliveryTime}</div>
          <div><b>Deal Price:</b> ₹{supplier.dealPrice}</div>
        </div>
      </section>
      <section className="risk-panel">
        <h2>Recent Alerts</h2>
        <div className="alerts-list">
          {recentAlerts.map(alert => (
            <div key={alert.id} className="alert-card">
              <b>{alert.type}:</b> {alert.message}
              <span className="alert-time">{alert.time}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="map-preview">
        <h2>Route Map Preview</h2>
        <div className="dummy-map">
          <div className="map-marker" style={{ left: '30%', top: '60%' }}></div>
          <div className="map-marker" style={{ left: '70%', top: '30%' }}></div>
          <span className="map-label">{supplier.route || 'Route not specified'}</span>
        </div>
      </section>
    </div>
  );

  const renderRiskAssessment = () => (
    <div className="dashboard-content-vertical">
      <section className="risk-panel-full">
        <h2>Risk Assessment</h2>
        <div className="risk-list">
          {riskCategories.map(risk => (
            <div key={risk.key} className={`risk-card risk-${risk.color}`}> 
              <div className="risk-header" onClick={() => setExpanded(e => ({...e, [risk.key]: !e[risk.key]}))}>
                <span className="risk-icon">{risk.icon}</span>
                <span className="risk-label">{risk.label}</span>
                <span className={`risk-level risk-level-${risk.color}`}>{risk.level}</span>
                <span className="expand-arrow">{expanded[risk.key] ? '▲' : '▼'}</span>
              </div>
              {expanded[risk.key] && (
                <div className="risk-details">{risk.details}</div>
              )}
            </div>
          ))}
        </div>
        <div className="risk-chart">
          <h3>Risk by Category</h3>
          <div className="bar-chart">
            {riskCategories.map(risk => (
              <div key={risk.key} className="bar-row">
                <span className="bar-label">{risk.label}</span>
                <div className="bar-outer">
                  <div className="bar-inner" style={{ width: risk.level === 'High' ? '90%' : risk.level === 'Moderate' ? '60%' : '30%', background: riskLevelColor[risk.color] }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderRoutes = () => (
    <div className="dashboard-content-vertical">
      <section className="map-preview-full">
        <h2>Route Map Preview</h2>
        <div className="dummy-map">
          <div className="map-marker" style={{ left: '30%', top: '60%' }}></div>
          <div className="map-marker" style={{ left: '70%', top: '30%' }}></div>
          <span className="map-label">{supplier.route || 'Route not specified'}</span>
        </div>
        <div style={{ marginTop: '1.5rem', color: '#274060', fontWeight: 500 }}>
          <b>Route Analysis:</b> No major traffic or roadblocks detected. Route is clear.
        </div>
      </section>
    </div>
  );

  const renderSettings = () => (
    <div className="dashboard-content-vertical">
      <section className="risk-panel-full">
        <h2>Settings</h2>
        <div style={{ color: '#274060', fontWeight: 500 }}>
          <div style={{ marginBottom: '1rem' }}>
            Notification Preferences: <input type="checkbox" defaultChecked /> Email Alerts
          </div>
          <div>
            Theme: <select defaultValue="light">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );

  let mainContent;
  if (section === 'dashboard') mainContent = renderDashboard();
  else if (section === 'risk') mainContent = renderRiskAssessment();
  else if (section === 'routes') mainContent = renderRoutes();
  else if (section === 'settings') mainContent = renderSettings();

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f7fa'
    }}>
      <aside style={{
        width: '250px',
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '0',
        flexShrink: 0
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          padding: '1rem',
          borderBottom: '1px solid #34495e',
          backgroundColor: '#34495e'
        }}>
          SupplyChain AI
        </div>
        <nav style={{ padding: '1rem 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {sidebarItems.map(item => (
              <li
                key={item.key}
                style={{
                  padding: '1rem 1.5rem',
                  cursor: 'pointer',
                  backgroundColor: section === item.key ? '#3498db' : 'transparent',
                  borderLeft: section === item.key ? '4px solid #2980b9' : '4px solid transparent',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSection(item.key)}
                onMouseOver={(e) => {
                  if (section !== item.key) {
                    e.target.style.backgroundColor = '#34495e';
                  }
                }}
                onMouseOut={(e) => {
                  if (section !== item.key) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main style={{
        flex: 1,
        padding: '0',
        overflow: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 2rem',
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e6ed',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            margin: 0, 
            color: '#2c3e50',
            fontSize: '2rem',
            fontWeight: '600'
          }}>
            Receiving Dashboard
          </h1>
          <div style={{
            background: overallRiskColor,
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            color: '#2c3e50',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}>
            Overall Risk: <b>{overallRisk}</b>
          </div>
        </div>
        <div style={{ padding: '2rem' }}>
          {mainContent}
        </div>
      </main>
      <style jsx>{`
        .dashboard-content-vertical {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 100%;
        }
        .inventory-card, .risk-panel, .risk-panel-full, .map-preview, .map-preview-full {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e6ed;
        }
        .inventory-card h2, .risk-panel h2, .risk-panel-full h2, .map-preview h2, .map-preview-full h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #2c3e50;
          font-size: 1.5rem;
          font-weight: 600;
          border-bottom: 2px solid #3498db;
          padding-bottom: 0.5rem;
        }
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          color: #34495e;
          line-height: 1.6;
        }
        .details-grid > div {
          padding: 0.75rem;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #3498db;
        }
        .alerts-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .alert-card {
          padding: 1rem;
          background: #ff3b3b;
          color: #fff;
          border: 1px solid #ffb3b3;
          border-radius: 8px;
          border-left: 4px solid #c62828;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .alert-time {
          font-size: 0.9rem;
          color: #fff;
          font-style: italic;
        }
        .dummy-map {
          width: 100%;
          height: 300px;
          background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }
        .map-marker {
          width: 20px;
          height: 20px;
          background: #e74c3c;
          border: 3px solid white;
          border-radius: 50%;
          position: absolute;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .map-label {
          position: absolute;
          bottom: 20px;
          left: 20px;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          background: rgba(0,0,0,0.3);
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }
        .risk-list {
          margin-bottom: 2rem;
        }
        .risk-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 1rem;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .risk-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }
        .risk-header {
          display: flex;
          align-items: center;
          padding: 1rem;
          cursor: pointer;
          background: #f8f9fa;
          transition: background-color 0.3s ease;
        }
        .risk-header:hover {
          background: #e9ecef;
        }
        .risk-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
        }
        .risk-label {
          flex: 1;
          font-weight: 600;
          color: #2c3e50;
        }
        .risk-level {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: bold;
          margin-right: 1rem;
        }
        .risk-level-green {
          background: #d4edda;
          color: #155724;
        }
        .risk-level-yellow {
          background: #fff3cd;
          color: #856404;
        }
        .risk-level-red {
          background: #f8d7da;
          color: #721c24;
        }
        .expand-arrow {
          color: #6c757d;
          font-weight: bold;
        }
        .risk-details {
          padding: 1rem;
          background: white;
          border-top: 1px solid #e9ecef;
          color: #495057;
          line-height: 1.5;
        }
        .risk-chart h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
          font-size: 1.25rem;
        }
        .bar-chart {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .bar-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .bar-label {
          min-width: 150px;
          font-weight: 500;
          color: #495057;
          font-size: 0.9rem;
        }
        .bar-outer {
          flex: 1;
          height: 24px;
          background: #e9ecef;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        .bar-inner {
          height: 100%;
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
        }
        .bar-inner:hover {
          transform: scaleY(1.1);
        }
        @media (max-width: 768px) {
          .details-grid {
            grid-template-columns: 1fr;
          }
          .bar-row {
            flex-direction: column;
            align-items: stretch;
          }
          .bar-label {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;