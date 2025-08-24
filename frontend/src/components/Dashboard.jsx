// //     import React, { useState } from "react";

// //     const riskCategories = [
// //     {
// //         key: 'weather',
// //         icon: '🌦️',
// //         label: 'Weather Risks',
// //         level: 'Moderate',
// //         color: 'yellow',
// //         details: 'Possible heavy rain and thunderstorms expected along the route. Monitor weather updates.'
// //     },
// //     {
// //         key: 'route',
// //         icon: '🛣️',
// //         label: 'Route Risks',
// //         level: 'Safe',
// //         color: 'green',
// //         details: 'No major traffic or roadblocks detected. Route is clear.'
// //     },
// //     {
// //         key: 'marine',
// //         icon: '🚢',
// //         label: 'Marine/Port Risks',
// //         level: 'Safe',
// //         color: 'green',
// //         details: 'No port congestion or marine delays reported.'
// //     },
// //     {
// //         key: 'geopolitical',
// //         icon: '🌍',
// //         label: 'Geopolitical Risks',
// //         level: 'High',
// //         color: 'red',
// //         details: 'Border strikes and regional unrest may impact delivery schedule.'
// //     },
// //     {
// //         key: 'fuel',
// //         icon: '⛽',
// //         label: 'Fuel/Operational Risks',
// //         level: 'Moderate',
// //         color: 'yellow',
// //         details: 'Fuel prices are volatile. Operational costs may increase.'
// //     },
// //     ];

// //     const riskLevelColor = {
// //     green: '#3ec98f',
// //     yellow: '#ffe066',
// //     red: '#ff5e5e',
// //     };

// //     const recentAlerts = [
// //     { id: 1, message: 'Heavy rain expected tomorrow in northern region.', type: 'Weather', time: '2 hours ago' },
// //     { id: 2, message: 'Border strike reported near checkpoint 3.', type: 'Geopolitical', time: '5 hours ago' },
// //     { id: 3, message: 'Fuel prices increased by 5%.', type: 'Operational', time: 'Today' },
// //     ];

// //   const Dashboard = () => {
// //   const [expanded, setExpanded] = useState({});
// //   const [section, setSection] = useState('dashboard');
// //   const [supplier, setSupplier] = useState(null);

// //   React.useEffect(() => {
// //       const fetchSupplier = async () => {
// //           try {
// //               const token = localStorage.getItem("token");
// //               if (!token) return;

// //               // If you use jwt_decode, make sure to import it at the top
// //               // import jwt_decode from "jwt-decode";
// //               const decoded = window.jwt_decode ? window.jwt_decode(token) : {};
// //               const userId = decoded.id || decoded._id;//yha pr ye supplier id lana kaise bhi krke and loader add krna krna hi

// //               const res = await fetch(`http://localhost:5000/api/suppliers/${userId}/analysis`, {
// //                   headers: { Authorization: `Bearer ${token}` },
// //               });

// //               if (!res.ok) throw new Error("Failed to fetch supplier");
// //               const data = await res.json();
// //               setSupplier(data);
// //           } catch (err) {
// //               console.error(err);
// //           }
// //       };
// //       fetchSupplier();
// //   }, []);

// //   // Dummy overall risk calculation
// //   const overallRisk = 'Moderate';
// //   const overallRiskColor = riskLevelColor['yellow'];

// //   const sidebarItems = [
// //       { key: 'dashboard', label: 'Dashboard' },
// //       { key: 'risk', label: 'Risk Assessment' },
// //       { key: 'routes', label: 'Routes' },
// //       { key: 'settings', label: 'Settings' },
// //   ];

// //   const renderDashboard = () => {
// //       if (!supplier) return <div>Loading...</div>;

// //       return (
// //           <div className="dashboard-content-vertical">
// //               <section className="inventory-card">
// //                   <h2>Inventory Information</h2>
// //                   <div className="details-grid">
// //                       <div><b>Supplier Name:</b> {supplier.companyName}</div>
// //                       <div><b>Lead Time:</b> {supplier.leadTime} days</div>
// //                       <div><b>Transport Mode:</b> {supplier.transportMode}</div>
// //                       <div><b>Reliability:</b> {supplier.reliability}%</div>
// //                       <div><b>Route:</b> {supplier.route?.origin} → {supplier.route?.destination}</div>
// //                       <div><b>Estimated Days:</b> {supplier.route?.estimatedDays || 'N/A'}</div>
// //                       <div><b>Inventory:</b>
// //                           <ul>
// //                               {supplier.inventory.map((item, i) => (
// //                                   <li key={i}>{item.product} - {item.quantity}</li>
// //                               ))}
// //                           </ul>
// //                       </div>
// //                   </div>
// //               </section>

// //               <section className="risk-panel">
// //                   <h2>Recent Alerts</h2>
// //                   <div className="alerts-list">
// //                       {recentAlerts.map(alert => (
// //                           <div key={alert.id} className="alert-card">
// //                               <b>{alert.type}:</b> {alert.message}
// //                               <span className="alert-time">{alert.time}</span>
// //                           </div>
// //                       ))}
// //                   </div>
// //               </section>

// //               <section className="map-preview">
// //                   <h2>Route Map Preview</h2>
// //                   <div className="dummy-map">
// //                       <div className="map-marker" style={{ left: '30%', top: '60%' }}></div>
// //                       <div className="map-marker" style={{ left: '70%', top: '30%' }}></div>
// //                       <span className="map-label">{supplier.route?.origin} → {supplier.route?.destination}</span>
// //                   </div>
// //               </section>
// //           </div>
// //       );
// //   };

// //     const renderRiskAssessment = () => (
// //         <div className="dashboard-content-vertical">
// //         <section className="risk-panel-full">
// //             <h2>Risk Assessment</h2>
// //             <div className="risk-list">
// //             {riskCategories.map(risk => (
// //                 <div key={risk.key} className={`risk-card risk-${risk.color}`}>
// //                 <div className="risk-header" onClick={() => setExpanded(e => ({...e, [risk.key]: !e[risk.key]}))}>
// //                     <span className="risk-icon">{risk.icon}</span>
// //                     <span className="risk-label">{risk.label}</span>
// //                     <span className={`risk-level risk-level-${risk.color}`}>{risk.level}</span>
// //                     <span className="expand-arrow">{expanded[risk.key] ? '▲' : '▼'}</span>
// //                 </div>
// //                 {expanded[risk.key] && (
// //                     <div className="risk-details">{risk.details}</div>
// //                 )}
// //                 </div>
// //             ))}
// //             </div>
// //             <div className="risk-chart">
// //             <h3>Risk by Category</h3>
// //             <div className="bar-chart">
// //                 {riskCategories.map(risk => (
// //                 <div key={risk.key} className="bar-row">
// //                     <span className="bar-label">{risk.label}</span>
// //                     <div className="bar-outer">
// //                     <div className="bar-inner" style={{ width: risk.level === 'High' ? '90%' : risk.level === 'Moderate' ? '60%' : '30%', background: riskLevelColor[risk.color] }}></div>
// //                     </div>
// //                 </div>
// //                 ))}
// //             </div>
// //             </div>
// //         </section>
// //         </div>
// //     );

// //     const renderRoutes = () => (
// //         <div className="dashboard-content-vertical">
// //         <section className="map-preview-full">
// //             <h2>Route Map Preview</h2>
// //             <div className="dummy-map">
// //             <div className="map-marker" style={{ left: '30%', top: '60%' }}></div>
// //             <div className="map-marker" style={{ left: '70%', top: '30%' }}></div>
// //             <span className="map-label">{supplier.route || 'Route not specified'}</span>
// //             </div>
// //             <div style={{ marginTop: '1.5rem', color: '#274060', fontWeight: 500 }}>
// //             <b>Route Analysis:</b> No major traffic or roadblocks detected. Route is clear.
// //             </div>
// //         </section>
// //         </div>
// //     );

// //     const renderSettings = () => (
// //         <div className="dashboard-content-vertical">
// //         <section className="risk-panel-full">
// //             <h2>Settings</h2>
// //             <div style={{ color: '#274060', fontWeight: 500 }}>
// //             <div style={{ marginBottom: '1rem' }}>
// //                 Notification Preferences: <input type="checkbox" defaultChecked /> Email Alerts
// //             </div>
// //             <div>
// //                 Theme: <select defaultValue="light">
// //                 <option value="light">Light</option>
// //                 <option value="dark">Dark</option>
// //                 </select>
// //             </div>
// //             </div>
// //         </section>
// //         </div>
// //     );

// //     let mainContent;
// //     if (section === 'dashboard') mainContent = renderDashboard();
// //     else if (section === 'risk') mainContent = renderRiskAssessment();
// //     else if (section === 'routes') mainContent = renderRoutes();
// //     else if (section === 'settings') mainContent = renderSettings();

// //     return (
// //         <div style={{
// //         display: 'flex',
// //         height: '100vh',
// //         fontFamily: 'Arial, sans-serif',
// //         backgroundColor: '#f5f7fa'
// //         }}>
// //         <aside style={{
// //             width: '250px',
// //             backgroundColor: '#2c3e50',
// //             color: 'white',
// //             padding: '0',
// //             flexShrink: 0
// //         }}>
// //             <div style={{
// //             fontSize: '1.5rem',
// //             fontWeight: 'bold',
// //             padding: '1rem',
// //             borderBottom: '1px solid #34495e',
// //             backgroundColor: '#34495e'
// //             }}>
// //             SupplyChain AI
// //             </div>
// //             <nav style={{ padding: '1rem 0' }}>
// //             <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
// //                 {sidebarItems.map(item => (
// //                 <li
// //                     key={item.key}
// //                     style={{
// //                     padding: '1rem 1.5rem',
// //                     cursor: 'pointer',
// //                     backgroundColor: section === item.key ? '#3498db' : 'transparent',
// //                     borderLeft: section === item.key ? '4px solid #2980b9' : '4px solid transparent',
// //                     transition: 'all 0.3s ease'
// //                     }}
// //                     onClick={() => setSection(item.key)}
// //                     onMouseOver={(e) => {
// //                     if (section !== item.key) {
// //                         e.target.style.backgroundColor = '#34495e';
// //                     }
// //                     }}
// //                     onMouseOut={(e) => {
// //                     if (section !== item.key) {
// //                         e.target.style.backgroundColor = 'transparent';
// //                     }
// //                     }}
// //                 >
// //                     {item.label}
// //                 </li>
// //                 ))}
// //             </ul>
// //             </nav>
// //         </aside>

// //         <main style={{
// //             flex: 1,
// //             padding: '0',
// //             overflow: 'auto'
// //         }}>
// //             <div style={{
// //             display: 'flex',
// //             justifyContent: 'space-between',
// //             alignItems: 'center',
// //             padding: '1.5rem 2rem',
// //             backgroundColor: 'white',
// //             borderBottom: '1px solid #e0e6ed',
// //             boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
// //             }}>
// //             <h1 style={{
// //                 margin: 0,
// //                 color: '#2c3e50',
// //                 fontSize: '2rem',
// //                 fontWeight: '600'
// //             }}>
// //                 Receiving Dashboard
// //             </h1>
// //             <div style={{
// //                 background: overallRiskColor,
// //                 padding: '0.75rem 1.5rem',
// //                 borderRadius: '25px',
// //                 color: '#2c3e50',
// //                 fontWeight: 'bold',
// //                 fontSize: '1rem',
// //                 boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
// //             }}>
// //                 Overall Risk: <b>{overallRisk}</b>
// //             </div>
// //             </div>
// //             <div style={{ padding: '2rem' }}>
// //             {mainContent}
// //             </div>
// //         </main>
// //         <style jsx>{`
// //             .dashboard-content-vertical {
// //             display: flex;
// //             flex-direction: column;
// //             gap: 2rem;
// //             max-width: 100%;
// //             }
// //             .inventory-card, .risk-panel, .risk-panel-full, .map-preview, .map-preview-full {
// //             background: white;
// //             border-radius: 12px;
// //             padding: 2rem;
// //             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// //             border: 1px solid #e0e6ed;
// //             }
// //             .inventory-card h2, .risk-panel h2, .risk-panel-full h2, .map-preview h2, .map-preview-full h2 {
// //             margin-top: 0;
// //             margin-bottom: 1.5rem;
// //             color: #2c3e50;
// //             font-size: 1.5rem;
// //             font-weight: 600;
// //             border-bottom: 2px solid #3498db;
// //             padding-bottom: 0.5rem;
// //             }
// //             .details-grid {
// //             display: grid;
// //             grid-template-columns: 1fr 1fr;
// //             gap: 1rem;
// //             color: #34495e;
// //             line-height: 1.6;
// //             }
// //             .details-grid > div {
// //             padding: 0.75rem;
// //             background: #f8f9fa;
// //             border-radius: 8px;
// //             border-left: 4px solid #3498db;
// //             }
// //             .alerts-list {
// //             display: flex;
// //             flex-direction: column;
// //             gap: 1rem;
// //             }
// //             .alert-card {
// //             padding: 1rem;
// //             background: #ff3b3b;
// //             color: #fff;
// //             border: 1px solid #ffb3b3;
// //             border-radius: 8px;
// //             border-left: 4px solid #c62828;
// //             display: flex;
// //             justify-content: space-between;
// //             align-items: center;
// //             }
// //             .alert-time {
// //             font-size: 0.9rem;
// //             color: #fff;
// //             font-style: italic;
// //             }
// //             .dummy-map {
// //             width: 100%;
// //             height: 300px;
// //             background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
// //             border-radius: 12px;
// //             position: relative;
// //             overflow: hidden;
// //             box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
// //             }
// //             .map-marker {
// //             width: 20px;
// //             height: 20px;
// //             background: #e74c3c;
// //             border: 3px solid white;
// //             border-radius: 50%;
// //             position: absolute;
// //             box-shadow: 0 2px 8px rgba(0,0,0,0.3);
// //             animation: pulse 2s infinite;
// //             }
// //             @keyframes pulse {
// //             0% { transform: scale(1); }
// //             50% { transform: scale(1.1); }
// //             100% { transform: scale(1); }
// //             }
// //             .map-label {
// //             position: absolute;
// //             bottom: 20px;
// //             left: 20px;
// //             color: white;
// //             font-weight: bold;
// //             font-size: 1.2rem;
// //             text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
// //             background: rgba(0,0,0,0.3);
// //             padding: 0.5rem 1rem;
// //             border-radius: 8px;
// //             }
// //             .risk-list {
// //             margin-bottom: 2rem;
// //             }
// //             .risk-card {
// //             border: 1px solid #ddd;
// //             border-radius: 8px;
// //             margin-bottom: 1rem;
// //             overflow: hidden;
// //             transition: all 0.3s ease;
// //             }
// //             .risk-card:hover {
// //             transform: translateY(-2px);
// //             box-shadow: 0 6px 12px rgba(0,0,0,0.15);
// //             }
// //             .risk-header {
// //             display: flex;
// //             align-items: center;
// //             padding: 1rem;
// //             cursor: pointer;
// //             background: #f8f9fa;
// //             transition: background-color 0.3s ease;
// //             }
// //             .risk-header:hover {
// //             background: #e9ecef;
// //             }
// //             .risk-icon {
// //             font-size: 1.5rem;
// //             margin-right: 1rem;
// //             }
// //             .risk-label {
// //             flex: 1;
// //             font-weight: 600;
// //             color: #2c3e50;
// //             }
// //             .risk-level {
// //             padding: 0.25rem 0.75rem;
// //             border-radius: 20px;
// //             font-size: 0.9rem;
// //             font-weight: bold;
// //             margin-right: 1rem;
// //             }
// //             .risk-level-green {
// //             background: #d4edda;
// //             color: #155724;
// //             }
// //             .risk-level-yellow {
// //             background: #fff3cd;
// //             color: #856404;
// //             }
// //             .risk-level-red {
// //             background: #f8d7da;
// //             color: #721c24;
// //             }
// //             .expand-arrow {
// //             color: #6c757d;
// //             font-weight: bold;
// //             }
// //             .risk-details {
// //             padding: 1rem;
// //             background: white;
// //             border-top: 1px solid #e9ecef;
// //             color: #495057;
// //             line-height: 1.5;
// //             }
// //             .risk-chart h3 {
// //             color: #2c3e50;
// //             margin-bottom: 1rem;
// //             font-size: 1.25rem;
// //             }
// //             .bar-chart {
// //             display: flex;
// //             flex-direction: column;
// //             gap: 1rem;
// //             }
// //             .bar-row {
// //             display: flex;
// //             align-items: center;
// //             gap: 1rem;
// //             }
// //             .bar-label {
// //             min-width: 150px;
// //             font-weight: 500;
// //             color: #495057;
// //             font-size: 0.9rem;
// //             }
// //             .bar-outer {
// //             flex: 1;
// //             height: 24px;
// //             background: #e9ecef;
// //             border-radius: 12px;
// //             overflow: hidden;
// //             position: relative;
// //             }
// //             .bar-inner {
// //             height: 100%;
// //             border-radius: 12px;
// //             transition: all 0.3s ease;
// //             position: relative;
// //             }
// //             .bar-inner:hover {
// //             transform: scaleY(1.1);
// //             }
// //             @media (max-width: 768px) {
// //             .details-grid {
// //                 grid-template-columns: 1fr;
// //             }
// //             .bar-row {
// //                 flex-direction: column;
// //                 align-items: stretch;
// //             }
// //             .bar-label {
// //                 min-width: auto;
// //             }
// //             }
// //         `}</style>
// //         </div>
// //     );
// //     };

// //     export default Dashboard;

// //     // import React from "react";
// //     // function Dashboard() {
// //     //   return <div>Dashboard</div>;
// //     // }
// //     // export default Dashboard;
// import React, { useState } from "react";

// const riskCategories = [
// {
//     key: 'weather',
//     icon: '🌦️',
//     label: 'Weather Risks',
//     level: 'Moderate',
//     color: 'yellow',
//     details: 'Possible heavy rain and thunderstorms expected along the route. Monitor weather updates.'
// },
// {
//     key: 'route',
//     icon: '🛣️',
//     label: 'Route Risks',
//     level: 'Safe',
//     color: 'green',
//     details: 'No major traffic or roadblocks detected. Route is clear.'
// },
// {
//     key: 'marine',
//     icon: '🚢',
//     label: 'Marine/Port Risks',
//     level: 'Safe',
//     color: 'green',
//     details: 'No port congestion or marine delays reported.'
// },
// {
//     key: 'geopolitical',
//     icon: '🌍',
//     label: 'Geopolitical Risks',
//     level: 'High',
//     color: 'red',
//     details: 'Border strikes and regional unrest may impact delivery schedule.'
// },
// {
//     key: 'fuel',
//     icon: '⛽',
//     label: 'Fuel/Operational Risks',
//     level: 'Moderate',
//     color: 'yellow',
//     details: 'Fuel prices are volatile. Operational costs may increase.'
// },
// ];

// const riskLevelColor = {
// green: '#3ec98f',
// yellow: '#ffe066',
// red: '#ff5e5e',
// };

// const recentAlerts = [
// { id: 1, message: 'Heavy rain expected tomorrow in northern region.', type: 'Weather', time: '2 hours ago' },
// { id: 2, message: 'Border strike reported near checkpoint 3.', type: 'Geopolitical', time: '5 hours ago' },
// { id: 3, message: 'Fuel prices increased by 5%.', type: 'Operational', time: 'Today' },
// ];

// // Loader Component
// const Loader = () => (
//   <div className="loader-container">
//     <div className="loader-spinner"></div>
//     <p className="loader-text">Loading supplier data...</p>
//   </div>
// );

// const Dashboard = () => {
// const [expanded, setExpanded] = useState({});
// const [section, setSection] = useState('dashboard');
// const [supplier, setSupplier] = useState(null);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

// // 🔄 Function to refresh supplier data from API
// const refreshSupplierData = async () => {
//     // Clear localStorage and force API fetch
//     localStorage.removeItem("supplier");

//     // Reload component data
//     const loadSupplierData = async () => {
//         try {
//             setLoading(true);
//             setError(null);

//             console.log("Refreshing supplier data from API...");

//             const token = localStorage?.getItem?.("token");
//             if (!token) {
//                 throw new Error("No authentication token found");
//             }

//             let supplierId;
//             try {
//                 const base64Url = token.split('.')[1];
//                 const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//                 const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//                     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//                 }).join(''));

//                 const decoded = JSON.parse(jsonPayload);
//                 supplierId = decoded.supplierId || decoded._id || decoded.id || decoded.userId || '68aa48be12762f8ae52c25e5';

//                 if (!supplierId) {
//                     throw new Error("Supplier ID not found in token");
//                 }
//             } catch (decodeError) {
//                 throw new Error("Invalid token format");
//             }

//             const res = await fetch(`http://localhost:5000/api/suppliers/${supplierId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//             });

//             if (!res.ok) {
//                 throw new Error(`Failed to fetch supplier: ${res.status} ${res.statusText}`);
//             }

//             const data = await res.json();

//             // Use the supplier data directly (no transformation needed)
//             const supplierData = data.supplier;

//             // Store fresh data
//             localStorage.setItem("supplier", JSON.stringify(supplierData));
//             console.log("Refreshed and stored supplier data:", supplierData);

//             setSupplier(supplierData);
//         } catch (err) {
//             console.error("Error refreshing supplier data:", err);
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     await loadSupplierData();
// };

// React.useEffect(() => {
//     const loadSupplierData = async () => {
//         try {
//             setLoading(true);
//             setError(null);

//             // 🎯 First try to get supplier from localStorage (stored during login)
//             const storedSupplier = localStorage?.getItem?.("supplier");

//             if (storedSupplier) {
//                 try {
//                     const supplierData = JSON.parse(storedSupplier);
//                     console.log("Loaded supplier from localStorage:", supplierData);
//                     setSupplier(supplierData);
//                     setLoading(false);
//                     return; // Exit early if we have stored data
//                 } catch (parseError) {
//                     console.warn("Failed to parse stored supplier data:", parseError);
//                     // Continue to API fetch as fallback
//                 }
//             }

//             // 🔄 Fallback: Fetch from API if no localStorage data
//             console.log("No stored supplier data, fetching from API...");

//             const token = localStorage?.getItem?.("token");
//             if (!token) {
//                 throw new Error("No authentication token found");
//             }

//             // Decode JWT token to get supplier ID
//             let supplierId;
//             try {
//                 const base64Url = token.split('.')[1];
//                 const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//                 const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//                     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//                 }).join(''));

//                 const decoded = JSON.parse(jsonPayload);
//                 supplierId = decoded.supplierId || decoded._id || decoded.id || decoded.userId || '68aa48be12762f8ae52c25e5';

//                 if (!supplierId) {
//                     throw new Error("Supplier ID not found in token");
//                 }
//             } catch (decodeError) {
//                 throw new Error("Invalid token format");
//             }

//             const res = await fetch(`http://localhost:5000/api/suppliers/${supplierId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//             });

//             if (!res.ok) {
//                 throw new Error(`Failed to fetch supplier: ${res.status} ${res.statusText}`);
//             }

//             const data = await res.json();

//             // Transform and store the fetched data
//             const supplierData = {
//                 companyName: data.supplier || 'N/A',
//                 leadTime: data.analysis?.leadTime || 'N/A',
//                 transportMode: data.analysis?.transportMode || 'N/A',
//                 reliability: data.analysis?.reliability || 'N/A',
//                 route: data.analysis?.route || { origin: 'N/A', destination: 'N/A', estimatedDays: 'N/A' },
//                 inventory: data.analysis?.inventory || [],
//                 riskScore: data.analysis?.riskScore || null,
//                 delayRisk: data.analysis?.delayRisk || null,
//                 estimatedCost: data.analysis?.estimatedCost || null,
//                 alternateRoutes: data.analysis?.alternateRoutes || null
//             };

//             // 💾 Store fetched data in localStorage for next time
//             localStorage.setItem("supplier", JSON.stringify(supplierData));
//             console.log("Stored supplier data in localStorage:", supplierData);

//             setSupplier(supplierData);
//         } catch (err) {
//             console.error("Error loading supplier data:", err);
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     loadSupplierData();
// }, []);

// // Dummy overall risk calculation
// const overallRisk = 'Moderate';
// const overallRiskColor = riskLevelColor['yellow'];

// const sidebarItems = [
//     { key: 'dashboard', label: 'Dashboard' },
//     { key: 'risk', label: 'Risk Assessment' },
//     { key: 'routes', label: 'Routes' },
//     { key: 'settings', label: 'Settings' },
// ];

// const renderDashboard = () => {
//     if (loading) return <Loader />;

//     if (error) {
//         return (
//             <div className="error-container">
//                 <div className="error-card">
//                     <h3>Error Loading Data</h3>
//                     <p>{error}</p>
//                     <button
//                         className="retry-button"
//                         onClick={() => window.location.reload()}
//                     >
//                         Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     if (!supplier) {
//         return (
//             <div className="no-data-container">
//                 <div className="no-data-card">
//                     <h3>No Supplier Data</h3>
//                     <p>No supplier information found.</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="dashboard-content-vertical">
//             <section className="inventory-card">
//                 <h2>Inventory Information</h2>
//                 <div className="details-grid">
//                     <div><b>Supplier Name:</b> {supplier.companyName || 'N/A'}</div>
//                     <div><b>Lead Time:</b> {supplier.leadTime || 'N/A'} days</div>
//                     <div><b>Transport Mode:</b> {supplier.transportMode || 'N/A'}</div>
//                     <div><b>Reliability:</b> {supplier.reliability || 'N/A'}%</div>
//                     <div><b>Route:</b> {supplier.route?.origin || 'N/A'} → {supplier.route?.destination || 'N/A'}</div>
//                     <div><b>Estimated Days:</b> {supplier.route?.estimatedDays || 'N/A'}</div>
//                     <div><b>Inventory:</b>
//                         <ul>
//                             {supplier.inventory && supplier.inventory.length > 0 ? (
//                                 supplier.inventory.map((item, i) => (
//                                     <li key={i}>{item.product || 'Product'} - {item.quantity || 'N/A'}</li>
//                                 ))
//                             ) : (
//                                 <li>No inventory data available</li>
//                             )}
//                         </ul>
//                     </div>
//                 </div>
//             </section>

//             <section className="risk-panel">
//                 <h2>Recent Alerts</h2>
//                 <div className="alerts-list">
//                     {recentAlerts.map(alert => (
//                         <div key={alert.id} className="alert-card">
//                             <b>{alert.type}:</b> {alert.message}
//                             <span className="alert-time">{alert.time}</span>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             <section className="map-preview">
//                 <h2>Route Map Preview</h2>
//                 <div className="dummy-map">
//                     <div className="map-marker" style={{ left: '30%', top: '60%' }}></div>
//                     <div className="map-marker" style={{ left: '70%', top: '30%' }}></div>
//                     <span className="map-label">
//                         {supplier.route?.origin || 'Origin'} → {supplier.route?.destination || 'Destination'}
//                     </span>
//                 </div>
//             </section>
//         </div>
//     );
// };

// const renderRiskAssessment = () => (
//     <div className="dashboard-content-vertical">
//     <section className="risk-panel-full">
//         <h2>Risk Assessment</h2>
//         <div className="risk-list">
//         {riskCategories.map(risk => (
//             <div key={risk.key} className={`risk-card risk-${risk.color}`}>
//             <div className="risk-header" onClick={() => setExpanded(e => ({...e, [risk.key]: !e[risk.key]}))}>
//                 <span className="risk-icon">{risk.icon}</span>
//                 <span className="risk-label">{risk.label}</span>
//                 <span className={`risk-level risk-level-${risk.color}`}>{risk.level}</span>
//                 <span className="expand-arrow">{expanded[risk.key] ? '▲' : '▼'}</span>
//             </div>
//             {expanded[risk.key] && (
//                 <div className="risk-details">{risk.details}</div>
//             )}
//             </div>
//         ))}
//         </div>
//         <div className="risk-chart">
//         <h3>Risk by Category</h3>
//         <div className="bar-chart">
//             {riskCategories.map(risk => (
//             <div key={risk.key} className="bar-row">
//                 <span className="bar-label">{risk.label}</span>
//                 <div className="bar-outer">
//                 <div className="bar-inner" style={{ width: risk.level === 'High' ? '90%' : risk.level === 'Moderate' ? '60%' : '30%', background: riskLevelColor[risk.color] }}></div>
//                 </div>
//             </div>
//             ))}
//         </div>
//         </div>
//     </section>
//     </div>
// );

// const renderRoutes = () => (
//     <div className="dashboard-content-vertical">
//     <section className="map-preview-full">
//         <h2>Route Map Preview</h2>
//         <div className="dummy-map">
//         <div className="map-marker" style={{ left: '30%', top: '60%' }}></div>
//         <div className="map-marker" style={{ left: '70%', top: '30%' }}></div>
//         <span className="map-label">
//             {supplier?.route?.origin || 'Origin'} → {supplier?.route?.destination || 'Destination'}
//         </span>
//         </div>
//         <div style={{ marginTop: '1.5rem', color: '#274060', fontWeight: 500 }}>
//         <b>Route Analysis:</b> No major traffic or roadblocks detected. Route is clear.
//         </div>
//     </section>
//     </div>
// );

// const renderSettings = () => (
//     <div className="dashboard-content-vertical">
//     <section className="risk-panel-full">
//         <h2>Settings</h2>
//         <div style={{ color: '#274060', fontWeight: 500 }}>
//         <div style={{ marginBottom: '1rem' }}>
//             Notification Preferences: <input type="checkbox" defaultChecked /> Email Alerts
//         </div>
//         <div>
//             Theme: <select defaultValue="light">
//             <option value="light">Light</option>
//             <option value="dark">Dark</option>
//             </select>
//         </div>
//         </div>
//     </section>
//     </div>
// );

// let mainContent;
// if (section === 'dashboard') mainContent = renderDashboard();
// else if (section === 'risk') mainContent = renderRiskAssessment();
// else if (section === 'routes') mainContent = renderRoutes();
// else if (section === 'settings') mainContent = renderSettings();

// return (
//     <div style={{
//     display: 'flex',
//     height: '100vh',
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#f5f7fa'
//     }}>
//     <aside style={{
//         width: '250px',
//         backgroundColor: '#2c3e50',
//         color: 'white',
//         padding: '0',
//         flexShrink: 0
//     }}>
//         <div style={{
//         fontSize: '1.5rem',
//         fontWeight: 'bold',
//         padding: '1rem',
//         borderBottom: '1px solid #34495e',
//         backgroundColor: '#34495e'
//         }}>
//         SupplyChain AI
//         </div>
//         <nav style={{ padding: '1rem 0' }}>
//         <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//             {sidebarItems.map(item => (
//             <li
//                 key={item.key}
//                 style={{
//                 padding: '1rem 1.5rem',
//                 cursor: 'pointer',
//                 backgroundColor: section === item.key ? '#3498db' : 'transparent',
//                 borderLeft: section === item.key ? '4px solid #2980b9' : '4px solid transparent',
//                 transition: 'all 0.3s ease'
//                 }}
//                 onClick={() => setSection(item.key)}
//                 onMouseOver={(e) => {
//                 if (section !== item.key) {
//                     e.target.style.backgroundColor = '#34495e';
//                 }
//                 }}
//                 onMouseOut={(e) => {
//                 if (section !== item.key) {
//                     e.target.style.backgroundColor = 'transparent';
//                 }
//                 }}
//             >
//                 {item.label}
//             </li>
//             ))}
//         </ul>
//         </nav>
//     </aside>

//     <main style={{
//         flex: 1,
//         padding: '0',
//         overflow: 'auto'
//     }}>
//         <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: '1.5rem 2rem',
//         backgroundColor: 'white',
//         borderBottom: '1px solid #e0e6ed',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//         }}>
//         <h1 style={{
//             margin: 0,
//             color: '#2c3e50',
//             fontSize: '2rem',
//             fontWeight: '600'
//         }}>
//             Receiving Dashboard
//         </h1>
//         <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
//             <button
//                 onClick={refreshSupplierData}
//                 disabled={loading}
//                 style={{
//                     background: loading ? '#bdc3c7' : '#3498db',
//                     color: 'white',
//                     border: 'none',
//                     padding: '0.5rem 1rem',
//                     borderRadius: '8px',
//                     cursor: loading ? 'not-allowed' : 'pointer',
//                     fontSize: '0.9rem',
//                     fontWeight: '500',
//                     transition: 'background-color 0.3s ease'
//                 }}
//                 onMouseOver={(e) => {
//                     if (!loading) e.target.style.background = '#2980b9';
//                 }}
//                 onMouseOut={(e) => {
//                     if (!loading) e.target.style.background = '#3498db';
//                 }}
//             >
//                 {loading ? '🔄 Refreshing...' : '🔄 Refresh'}
//             </button>
//             <div style={{
//                 background: overallRiskColor,
//                 padding: '0.75rem 1.5rem',
//                 borderRadius: '25px',
//                 color: '#2c3e50',
//                 fontWeight: 'bold',
//                 fontSize: '1rem',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
//             }}>
//                 Overall Risk: <b>{overallRisk}</b>
//             </div>
//         </div>
//         </div>
//         <div style={{ padding: '2rem' }}>
//         {mainContent}
//         </div>
//     </main>
//     <style jsx>{`
//         .loader-container {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             min-height: 400px;
//             background: white;
//             border-radius: 12px;
//             padding: 3rem;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             border: 1px solid #e0e6ed;
//         }

//         .loader-spinner {
//             width: 50px;
//             height: 50px;
//             border: 4px solid #f3f3f3;
//             border-top: 4px solid #3498db;
//             border-radius: 50%;
//             animation: spin 1s linear infinite;
//             margin-bottom: 1rem;
//         }

//         @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//         }

//         .loader-text {
//             color: #666;
//             font-size: 1.1rem;
//             margin: 0;
//         }

//         .error-container, .no-data-container {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             min-height: 400px;
//         }

//         .error-card, .no-data-card {
//             background: white;
//             border-radius: 12px;
//             padding: 2rem;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             border: 1px solid #e0e6ed;
//             text-align: center;
//             max-width: 400px;
//         }

//         .error-card h3, .no-data-card h3 {
//             color: #e74c3c;
//             margin-top: 0;
//             margin-bottom: 1rem;
//         }

//         .error-card p, .no-data-card p {
//             color: #666;
//             margin-bottom: 1.5rem;
//         }

//         .retry-button {
//             background: #3498db;
//             color: white;
//             border: none;
//             padding: 0.75rem 1.5rem;
//             border-radius: 8px;
//             cursor: pointer;
//             font-size: 1rem;
//             transition: background-color 0.3s ease;
//         }

//         .retry-button:hover {
//             background: #2980b9;
//         }

//         .dashboard-content-vertical {
//         display: flex;
//         flex-direction: column;
//         gap: 2rem;
//         max-width: 100%;
//         }
//         .inventory-card, .risk-panel, .risk-panel-full, .map-preview, .map-preview-full {
//         background: white;
//         border-radius: 12px;
//         padding: 2rem;
//         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//         border: 1px solid #e0e6ed;
//         }
//         .inventory-card h2, .risk-panel h2, .risk-panel-full h2, .map-preview h2, .map-preview-full h2 {
//         margin-top: 0;
//         margin-bottom: 1.5rem;
//         color: #2c3e50;
//         font-size: 1.5rem;
//         font-weight: 600;
//         border-bottom: 2px solid #3498db;
//         padding-bottom: 0.5rem;
//         }
//         .details-grid {
//         display: grid;
//         grid-template-columns: 1fr 1fr;
//         gap: 1rem;
//         color: #34495e;
//         line-height: 1.6;
//         }
//         .details-grid > div {
//         padding: 0.75rem;
//         background: #f8f9fa;
//         border-radius: 8px;
//         border-left: 4px solid #3498db;
//         }
//         .alerts-list {
//         display: flex;
//         flex-direction: column;
//         gap: 1rem;
//         }
//         .alert-card {
//         padding: 1rem;
//         background: #ff3b3b;
//         color: #fff;
//         border: 1px solid #ffb3b3;
//         border-radius: 8px;
//         border-left: 4px solid #c62828;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         }
//         .alert-time {
//         font-size: 0.9rem;
//         color: #fff;
//         font-style: italic;
//         }
//         .dummy-map {
//         width: 100%;
//         height: 300px;
//         background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
//         border-radius: 12px;
//         position: relative;
//         overflow: hidden;
//         box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
//         }
//         .map-marker {
//         width: 20px;
//         height: 20px;
//         background: #e74c3c;
//         border: 3px solid white;
//         border-radius: 50%;
//         position: absolute;
//         box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//         animation: pulse 2s infinite;
//         }
//         @keyframes pulse {
//         0% { transform: scale(1); }
//         50% { transform: scale(1.1); }
//         100% { transform: scale(1); }
//         }
//         .map-label {
//         position: absolute;
//         bottom: 20px;
//         left: 20px;
//         color: white;
//         font-weight: bold;
//         font-size: 1.2rem;
//         text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
//         background: rgba(0,0,0,0.3);
//         padding: 0.5rem 1rem;
//         border-radius: 8px;
//         }
//         .risk-list {
//         margin-bottom: 2rem;
//         }
//         .risk-card {
//         border: 1px solid #ddd;
//         border-radius: 8px;
//         margin-bottom: 1rem;
//         overflow: hidden;
//         transition: all 0.3s ease;
//         }
//         .risk-card:hover {
//         transform: translateY(-2px);
//         box-shadow: 0 6px 12px rgba(0,0,0,0.15);
//         }
//         .risk-header {
//         display: flex;
//         align-items: center;
//         padding: 1rem;
//         cursor: pointer;
//         background: #f8f9fa;
//         transition: background-color 0.3s ease;
//         }
//         .risk-header:hover {
//         background: #e9ecef;
//         }
//         .risk-icon {
//         font-size: 1.5rem;
//         margin-right: 1rem;
//         }
//         .risk-label {
//         flex: 1;
//         font-weight: 600;
//         color: #2c3e50;
//         }
//         .risk-level {
//         padding: 0.25rem 0.75rem;
//         border-radius: 20px;
//         font-size: 0.9rem;
//         font-weight: bold;
//         margin-right: 1rem;
//         }
//         .risk-level-green {
//         background: #d4edda;
//         color: #155724;
//         }
//         .risk-level-yellow {
//         background: #fff3cd;
//         color: #856404;
//         }
//         .risk-level-red {
//         background: #f8d7da;
//         color: #721c24;
//         }
//         .expand-arrow {
//         color: #6c757d;
//         font-weight: bold;
//         }
//         .risk-details {
//         padding: 1rem;
//         background: white;
//         border-top: 1px solid #e9ecef;
//         color: #495057;
//         line-height: 1.5;
//         }
//         .risk-chart h3 {
//         color: #2c3e50;
//         margin-bottom: 1rem;
//         font-size: 1.25rem;
//         }
//         .bar-chart {
//         display: flex;
//         flex-direction: column;
//         gap: 1rem;
//         }
//         .bar-row {
//         display: flex;
//         align-items: center;
//         gap: 1rem;
//         }
//         .bar-label {
//         min-width: 150px;
//         font-weight: 500;
//         color: #495057;
//         font-size: 0.9rem;
//         }
//         .bar-outer {
//         flex: 1;
//         height: 24px;
//         background: #e9ecef;
//         border-radius: 12px;
//         overflow: hidden;
//         position: relative;
//         }
//         .bar-inner {
//         height: 100%;
//         border-radius: 12px;
//         transition: all 0.3s ease;
//         position: relative;
//         }
//         .bar-inner:hover {
//         transform: scaleY(1.1);
//         }
//         @media (max-width: 768px) {
//         .details-grid {
//             grid-template-columns: 1fr;
//         }
//         .bar-row {
//             flex-direction: column;
//             align-items: stretch;
//         }
//         .bar-label {
//             min-width: auto;
//         }
//         }
//     `}</style>
//     </div>
// );
// };

// export default Dashboard;
import React, { useState } from "react";

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

const riskLevelColor = {
  green: "#3ec98f",
  yellow: "#ffe066",
  red: "#ff5e5e",
};

const recentAlerts = [
  {
    id: 1,
    message:
      "Heavy rain and thunderstorms expected in Mumbai-Delhi route tomorrow.",
    type: "Weather",
    time: "2 hours ago",
  },
  {
    id: 2,
    message:
      "Border strike reported near checkpoint 3. Possible delays expected.",
    type: "Geopolitical",
    time: "5 hours ago",
  },
  {
    id: 3,
    message: "Fuel prices increased by 5% - operational costs may rise.",
    type: "Operational",
    time: "Today",
  },
  {
    id: 4,
    message: "Port congestion cleared - marine routes now operational.",
    type: "Marine",
    time: "1 day ago",
  },
  {
    id: 5,
    message: "New alternate route via Nashik recommended for faster delivery.",
    type: "Route",
    time: "2 days ago",
  },
];

// Loader Component
const Loader = () => (
  <div className="loader-container">
    <div className="loader-spinner"></div>
    <p className="loader-text">Loading supplier data...</p>
  </div>
);

const Dashboard = () => {
  const [expanded, setExpanded] = useState({});
  const [section, setSection] = useState("dashboard");
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Function to refresh supplier data from API
  const refreshSupplierData = async () => {
    // Clear localStorage and force API fetch
    localStorage.removeItem("supplier");

    // Reload component data
    const loadSupplierData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Refreshing supplier data from API...");

        const token = localStorage?.getItem?.("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        let supplierId;
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );

          const decoded = JSON.parse(jsonPayload);
          supplierId =
            decoded.supplierId ||
            decoded._id ||
            decoded.id ||
            decoded.userId ||
            "68aa48be12762f8ae52c25e5";

          if (!supplierId) {
            throw new Error("Supplier ID not found in token");
          }
        } catch (decodeError) {
          throw new Error("Invalid token format");
        }

        const res = await fetch(
          `http://localhost:5000/api/suppliers/${supplierId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch supplier: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();

        // Use the supplier data directly (no transformation needed)
        const supplierData = data.supplier;

        // Store fresh data
        localStorage.setItem("supplier", JSON.stringify(supplierData));
        console.log("Refreshed and stored supplier data:", supplierData);

        setSupplier(supplierData);
      } catch (err) {
        console.error("Error refreshing supplier data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    await loadSupplierData();
  };

  React.useEffect(() => {
    const loadSupplierData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 🎯 First try to get supplier from localStorage (stored during login)
        const storedSupplier = localStorage?.getItem?.("supplier");

        if (storedSupplier) {
          try {
            const supplierData = JSON.parse(storedSupplier);
            console.log("Loaded supplier from localStorage:", supplierData);
            setSupplier(supplierData);
            setLoading(false);
            return; // Exit early if we have stored data
          } catch (parseError) {
            console.warn("Failed to parse stored supplier data:", parseError);
            // Continue to API fetch as fallback
          }
        }

        // 🔄 Fallback: Fetch from API if no localStorage data
        console.log("No stored supplier data, fetching from API...");

        // Demo data for proper display (remove this in production)
        const demoSupplierData = {
          _id: "68aa48be12762f8ae52c25e5",
          companyName: "Global Steel Suppliers Ltd.",
          leadTime: 7,
          transportMode: "Road Transport",
          reliability: 94,
          route: {
            origin: "Mumbai, Maharashtra",
            destination: "Delhi, NCR",
            estimatedDays: 5,
          },
          inventory: [
            { product: "Steel Rods", quantity: "500 tons" },
            { product: "Iron Plates", quantity: "200 tons" },
            { product: "Copper Wire", quantity: "50 tons" },
            { product: "Aluminum Sheets", quantity: "300 tons" },
          ],
          contactInfo: {
            email: "contact@globalsteel.com",
            phone: "+91-98765-43210",
            address: "Industrial Area, Mumbai - 400001",
          },
          riskScore: 65,
          delayRisk: 25,
          estimatedCost: 1250000,
          alternateRoutes: ["Via Pune", "Via Nashik", "Via Surat"],
          lastAnalyzed: new Date().toISOString(),
        };

        // Use demo data for now
        console.log("Using demo supplier data for display");
        localStorage.setItem("supplier", JSON.stringify(demoSupplierData));
        setSupplier(demoSupplierData);
        setLoading(false);
        return;

        const token = localStorage?.getItem?.("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        // Decode JWT token to get supplier ID
        let supplierId;
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );

          const decoded = JSON.parse(jsonPayload);
          supplierId =
            decoded.supplierId ||
            decoded._id ||
            decoded.id ||
            decoded.userId ||
            "68aa48be12762f8ae52c25e5";

          if (!supplierId) {
            throw new Error("Supplier ID not found in token");
          }
        } catch (decodeError) {
          throw new Error("Invalid token format");
        }

        const res = await fetch(
          `http://localhost:5000/api/suppliers/${supplierId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch supplier: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();

        // Transform and store the fetched data
        const supplierData = {
          companyName: data.supplier || "N/A",
          leadTime: data.analysis?.leadTime || "N/A",
          transportMode: data.analysis?.transportMode || "N/A",
          reliability: data.analysis?.reliability || "N/A",
          route: data.analysis?.route || {
            origin: "N/A",
            destination: "N/A",
            estimatedDays: "N/A",
          },
          inventory: data.analysis?.inventory || [],
          riskScore: data.analysis?.riskScore || null,
          delayRisk: data.analysis?.delayRisk || null,
          estimatedCost: data.analysis?.estimatedCost || null,
          alternateRoutes: data.analysis?.alternateRoutes || null,
        };

        // 💾 Store fetched data in localStorage for next time
        localStorage.setItem("supplier", JSON.stringify(supplierData));
        console.log("Stored supplier data in localStorage:", supplierData);

        setSupplier(supplierData);
      } catch (err) {
        console.error("Error loading supplier data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSupplierData();
  }, []);

  // Dummy overall risk calculation
  const overallRisk = "Moderate";
  const overallRiskColor = riskLevelColor["yellow"];

  const sidebarItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "risk", label: "Risk Assessment" },
    { key: "routes", label: "Routes" },
    { key: "settings", label: "Settings" },
  ];

  const renderDashboard = () => {
    if (loading) return <Loader />;

    if (error) {
      return (
        <div className="error-container">
          <div className="error-card">
            <h3>Error Loading Data</h3>
            <p>{error}</p>
            <button
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (!supplier) {
      return (
        <div className="no-data-container">
          <div className="no-data-card">
            <h3>No Supplier Data</h3>
            <p>No supplier information found.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard-content-vertical">
        <section className="inventory-card">
          <h2>Inventory Information</h2>
          <div className="details-grid">
            <div>
              <b>Supplier Name:</b> {supplier.companyName || "N/A"}
            </div>
            <div>
              <b>Lead Time:</b> {supplier.leadTime || "N/A"} days
            </div>
            <div>
              <b>Transport Mode:</b> {supplier.transportMode || "N/A"}
            </div>
            <div>
              <b>Reliability:</b> {supplier.reliability || "N/A"}%
            </div>
            <div>
              <b>Route:</b> {supplier.route?.origin || "N/A"} →{" "}
              {supplier.route?.destination || "N/A"}
            </div>
            <div>
              <b>Estimated Days:</b> {supplier.route?.estimatedDays || "N/A"}
            </div>
            {/* <div><b>Contact:</b> {supplier.contactInfo?.email || 'N/A'} | {supplier.contactInfo?.phone || 'N/A'}</div> */}
            {/* <div><b>Risk Score:</b> <span style={{color: supplier.riskScore > 70 ? '#e74c3c' : supplier.riskScore > 40 ? '#f39c12' : '#27ae60'}}>{supplier.riskScore || 'N/A'}</span></div> */}
            <div>
              <b>Inventory:</b>
              <ul>
                {supplier.inventory && supplier.inventory.length > 0 ? (
                  supplier.inventory.map((item, i) => (
                    <li key={i}>
                      {item.product || "Product"} - {item.quantity || "N/A"}
                    </li>
                  ))
                ) : (
                  <li>No inventory data available</li>
                )}
              </ul>
            </div>
          </div>
        </section>

        <section className="risk-panel">
          <h2>Recent Alerts</h2>
          <div className="alerts-list">
            {recentAlerts.map((alert) => (
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
            <div
              className="map-marker origin-marker"
              style={{ left: "20%", top: "70%" }}
            >
              <div className="marker-label origin-label">
                {supplier.route?.origin || "Origin"}
              </div>
            </div>
            <div
              className="map-marker destination-marker"
              style={{ left: "75%", top: "25%" }}
            >
              <div className="marker-label destination-label">
                {supplier.route?.destination || "Destination"}
              </div>
            </div>
            <div className="route-line"></div>
            <div className="map-info">
              <div className="route-distance">🚛 Distance: ~1,400 km</div>
              <div className="route-time">
                ⏱️ Est. Time: {supplier.route?.estimatedDays || "N/A"} days
              </div>
              <div className="route-mode">
                🛣️ Mode: {supplier.transportMode || "N/A"}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const renderRiskAssessment = () => (
    <div className="dashboard-content-vertical">
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
      </section>
    </div>
  );

  const renderRoutes = () => (
    <div className="dashboard-content-vertical">
      <section className="map-preview-full">
        <h2>Route Map Preview</h2>
        <div className="dummy-map">
          <div className="map-marker" style={{ left: "30%", top: "60%" }}></div>
          <div className="map-marker" style={{ left: "70%", top: "30%" }}></div>
          <span className="map-label">
            {supplier?.route?.origin || "Origin"} →{" "}
            {supplier?.route?.destination || "Destination"}
          </span>
        </div>
        <div style={{ marginTop: "1.5rem", color: "#274060", fontWeight: 500 }}>
          <b>Route Analysis:</b> No major traffic or roadblocks detected. Route
          is clear.
        </div>
      </section>
    </div>
  );

  const renderSettings = () => (
    <div className="dashboard-content-vertical">
      <section className="risk-panel-full">
        <h2>Settings</h2>
        <div style={{ color: "#274060", fontWeight: 500 }}>
          <div style={{ marginBottom: "1rem" }}>
            Notification Preferences: <input type="checkbox" defaultChecked />{" "}
            Email Alerts
          </div>
          <div>
            Theme:{" "}
            <select defaultValue="light">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );

  let mainContent;
  if (section === "dashboard") mainContent = renderDashboard();
  else if (section === "risk") mainContent = renderRiskAssessment();
  else if (section === "routes") mainContent = renderRoutes();
  else if (section === "settings") mainContent = renderSettings();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f7fa",
      }}
    >
      <aside
        style={{
          width: "250px",
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "0",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            padding: "1rem",
            borderBottom: "1px solid #34495e",
            backgroundColor: "#34495e",
          }}
        >
          Shrinkhla AI{" "}
        </div>
        <nav style={{ padding: "1rem 0" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {sidebarItems.map((item) => (
              <li
                key={item.key}
                style={{
                  padding: "1rem 1.5rem",
                  cursor: "pointer",
                  backgroundColor:
                    section === item.key ? "#3498db" : "transparent",
                  borderLeft:
                    section === item.key
                      ? "4px solid #2980b9"
                      : "4px solid transparent",
                  transition: "all 0.3s ease",
                }}
                onClick={() => setSection(item.key)}
                onMouseOver={(e) => {
                  if (section !== item.key) {
                    e.target.style.backgroundColor = "#34495e";
                  }
                }}
                onMouseOut={(e) => {
                  if (section !== item.key) {
                    e.target.style.backgroundColor = "transparent";
                  }
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "0",
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.5rem 2rem",
            backgroundColor: "white",
            borderBottom: "1px solid #e0e6ed",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#2c3e50",
              fontSize: "2rem",
              fontWeight: "600",
            }}
          >
            Receiving Dashboard
          </h1>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {/* <button
                onClick={refreshSupplierData}
                disabled={loading}
                style={{
                    background: loading ? '#bdc3c7' : '#3498db',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => {
                    if (!loading) e.target.style.background = '#2980b9';
                }}
                onMouseOut={(e) => {
                    if (!loading) e.target.style.background = '#3498db';
                }}
            >
                {loading ? '🔄 Refreshing...' : '🔄 Refresh'}
            </button> */}
            <div
              style={{
                background: overallRiskColor,
                padding: "0.75rem 1.5rem",
                borderRadius: "25px",
                color: "#2c3e50",
                fontWeight: "bold",
                fontSize: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              Overall Risk: <b>{overallRisk}</b>
            </div>
          </div>
        </div>
        <div style={{ padding: "2rem" }}>{mainContent}</div>
      </main>
      <style jsx>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          background: white;
          border-radius: 12px;
          padding: 3rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e6ed;
        }

        .loader-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .loader-text {
          color: #666;
          font-size: 1.1rem;
          margin: 0;
        }

        .error-container,
        .no-data-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }

        .error-card,
        .no-data-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e6ed;
          text-align: center;
          max-width: 400px;
        }

        .error-card h3,
        .no-data-card h3 {
          color: #e74c3c;
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .error-card p,
        .no-data-card p {
          color: #666;
          margin-bottom: 1.5rem;
        }

        .retry-button {
          background: #3498db;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }

        .retry-button:hover {
          background: #2980b9;
        }

        .dashboard-content-vertical {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 100%;
        }
        .inventory-card,
        .risk-panel,
        .risk-panel-full,
        .map-preview,
        .map-preview-full {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e6ed;
        }
        .inventory-card h2,
        .risk-panel h2,
        .risk-panel-full h2,
        .map-preview h2,
        .map-preview-full h2 {
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
        .details-grid > div:nth-child(8) {
          grid-column: 1 / -1; /* Make inventory span full width */
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
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .map-marker {
          width: 20px;
          height: 20px;
          background: #e74c3c;
          border: 3px solid white;
          border-radius: 50%;
          position: absolute;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          animation: pulse 2s infinite;
        }
        .origin-marker {
          background: #27ae60;
        }
        .destination-marker {
          background: #e74c3c;
        }
        .marker-label {
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: bold;
          white-space: nowrap;
          pointer-events: none;
        }
        .origin-label {
          background: rgba(39, 174, 96, 0.9);
        }
        .destination-label {
          background: rgba(231, 76, 60, 0.9);
        }
        .route-line {
          position: absolute;
          top: 50%;
          left: 22%;
          width: 53%;
          height: 3px;
          background: linear-gradient(
            90deg,
            #27ae60 0%,
            #f39c12 50%,
            #e74c3c 100%
          );
          transform: translateY(-50%) rotate(-15deg);
          border-radius: 2px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .map-info {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.75rem;
          border-radius: 8px;
          font-size: 0.8rem;
        }
        .map-info div {
          margin-bottom: 0.25rem;
        }
        .map-info div:last-child {
          margin-bottom: 0;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        .map-label {
          position: absolute;
          top: 20px;
          left: 20px;
          color: white;
          font-weight: bold;
          font-size: 1.1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          background: rgba(0, 0, 0, 0.3);
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
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
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
