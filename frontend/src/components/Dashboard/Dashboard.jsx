  import React, { useState, useEffect } from "react";
  import './dashboard.css';
  import Sidebar from './Sidebar';
  import Loader from './Loader';
  import InventoryCard from './InventoryCard';
  import RiskPanel from './RiskPanel';
  import MapPreview from './MapPreview';
  import RecentAlerts from './RecentAlerts';
  import RiskChart from './RiskChart';
  import RoutesPreview from './RoutesPreview';
  import SettingsPanel from './SettingsPanel';

  const Dashboard = () => {
    const [supplierData, setSupplierData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState({});
    const [section, setSection] = useState('dashboard');

    // Fetch supplier data from backend
    useEffect(() => {
      const fetchSupplierData = async () => {
        setLoading(true);
        setError(null);

        try {
          const token = localStorage.getItem("token");
          
          if (!token) {
            // Use demo data if no token
            const demoData = {
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
            setSupplierData(demoData);
            setLoading(false);
            return;
          }

          // Try analysis API first
          const apiUrl = 'http://localhost:5000/api/analysis/run';
          const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          };

          const response = await fetch(apiUrl, { 
            method: 'POST',
            headers 
          });

          if (!response.ok) {
            // Fallback to suppliers API
            const suppliersResponse = await fetch('http://localhost:5000/api/suppliers', {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            if (!suppliersResponse.ok) {
              throw new Error(`Both APIs failed. Analysis: ${response.status}, Suppliers: ${suppliersResponse.status}`);
            }

            const suppliersData = await suppliersResponse.json();
            
            if (suppliersData.suppliers && suppliersData.suppliers.length > 0) {
              const firstSupplier = suppliersData.suppliers[0];
              const transformedData = {
                companyName: firstSupplier.companyName || "Unknown Supplier",
                leadTime: firstSupplier.leadTime || 7,
                transportMode: firstSupplier.transportMode || "Road Transport",
                reliability: firstSupplier.reliability || 94,
                route: firstSupplier.route || {
                  origin: "Origin",
                  destination: "Destination",
                  estimatedDays: 5,
                },
                inventory: firstSupplier.inventory || [
                  { product: "Steel Rods", quantity: "500 tons" },
                  { product: "Iron Plates", quantity: "200 tons" },
                ],
                estimatedCost: firstSupplier.cost?.amount || 1250000,
                riskScore: Math.floor(Math.random() * 100) + 1,
                delayRisk: Math.random() > 0.5 ? "High" : "Medium",
              };
              setSupplierData(transformedData);
            } else {
              throw new Error("No suppliers found in the database");
            }
          } else {
            const result = await response.json();
            
            if (result.results && result.results.length > 0) {
              setSupplierData(result.results[0]);
            } else {
              throw new Error("API response was empty or not in the expected format.");
            }
          }
        } catch (e) {
          console.error("Failed to fetch supplier data:", e);
          
          // Use demo data as fallback
          const demoData = {
            companyName: "Demo Steel Suppliers Ltd.",
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
            riskScore: 75,
            delayRisk: "High",
            estimatedCost: 1500000,
            alternateRoutes: ["Via Pune", "Via Nashik", "Via Surat"],
            lastAnalyzed: new Date().toISOString(),
          };
          setSupplierData(demoData);
          setError(null);
        } finally {
          setLoading(false);
        }
      };

      fetchSupplierData();
    }, []);

    // Dummy overall risk calculation
    const overallRisk = "Moderate";
    const overallRiskColor = "#ffe066";

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

      if (!supplierData) {
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
          <InventoryCard supplierData={supplierData} />
          <RecentAlerts />
          <MapPreview supplierData={supplierData} />
        </div>
      );
    };

    const renderRiskAssessment = () => (
      <div className="dashboard-content-vertical">
        <RiskPanel expanded={expanded} setExpanded={setExpanded} />
        <RiskChart />
      </div>
    );

    const renderRoutes = () => (
      <div className="dashboard-content-vertical">
        <RoutesPreview supplierData={supplierData} />
      </div>
    );

    const renderSettings = () => (
      <div className="dashboard-content-vertical">
        <SettingsPanel />
      </div>
    );

    let mainContent;
    if (section === 'dashboard') mainContent = renderDashboard();
    else if (section === 'risk') mainContent = renderRiskAssessment();
    else if (section === 'routes') mainContent = renderRoutes();
    else if (section === 'settings') mainContent = renderSettings();

    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f5f7fa",
        }}
      >
        <Sidebar section={section} setSection={setSection} />

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
      </div>
    );
  };

  export default Dashboard;
