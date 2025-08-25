import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import HeaderCards from "./HeaderCards";
import RouteCards from "./RouteCards";
import Charts from "./Charts";
import ColorAnalysis from "./ColorAnalysis";
import ColorPalette from "./ColorPalette";
import Loader from "./loader";

// Enhanced CSS Styles with better theme consistency
const styles = `
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(246,252,255,0.97) 80%, #eaf6fa 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.topbar-logo {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.topbar-search {
  flex-grow: 1;
  max-width: 400px;
  margin: 0 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 2px solid #e2e8f0;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #475569;
  transition: all 0.3s ease;
}

.topbar-search:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.topbar-search input {
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 0.875rem;
}

.topbar-search input::placeholder {
  color: #94a3b8;
}

.topbar-icons {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #64748b;
}

.topbar-icon {
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.topbar-icon:hover {
  background-color: #f1f5f9;
  color: #475569;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  font-size: 0.625rem;
}

.main-layout {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  padding: 2rem;
  min-height: calc(100vh - 80px);
}

@media (max-width: 1024px) {
  .main-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
}

sidebar {
          position: sticky;
          top: 200px;
          height: fit-content;
          width: 100%;
          padding: 20px;
          box-sizing: border-box;
        }

        @media (max-width: 1024px) {
          .sidebar {
            position: static;
            order: 2;
          }
        }

        .sidebar-nav {
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          background: rgba(255, 255, 255, 0.9);
          padding: 1rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card {
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.card-title {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.card-title h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-cards {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .header-cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.supplier-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .supplier-info {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.supplier-details h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.supplier-details-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

@media (min-width: 768px) {
  .supplier-details-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.donut-progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.donut-svg {
  transform: rotate(-90deg);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.donut-background {
  fill: none;
  stroke: rgba(0,0,0,0.08);
  stroke-width: var(--stroke-width, 12);
}

.donut-foreground {
  fill: none;
  stroke: currentColor;
  stroke-width: var(--stroke-width, 12);
  stroke-linecap: round;
  transition: all 0.5s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.donut-label-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.donut-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.donut-label {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  border-radius: 9999px;
  border-width: 1px;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-amber {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
  border-color: #f59e0b;
}

.badge-green {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  color: #166534;
  border-color: #22c55e;
}

.badge-red {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #b91c1c;
  border-color: #ef4444;
}

.badge-blue {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1d4ed8;
  border-color: #3b82f6;
}

.metric-card {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 1rem;
  transition: all 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.metric-icon-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.metric-label {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
}

.stepper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #334155;
  flex-wrap: wrap;
}

.stepper-item {
  border-radius: 8px;
  border-width: 1px;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-color: #e2e8f0;
  color: #475569;
  transition: all 0.2s ease;
}

.stepper-item:hover {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
}

.nav-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.75rem;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  color: #475569;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.nav-item-active {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: #1d4ed8;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}

.nav-item:hover:not(.nav-item-active) {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #334155;
}

.nav-item span {
  font-weight: 500;
}

.chart-container {
  height: 300px;
}

.chart-container-lg {
  height: 350px;
}

.routes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .routes-grid {
    grid-template-columns: 1fr;
  }
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-primary {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1d4ed8;
}

.status-alternate {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
}

.insight-card {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 1px solid #0ea5e9;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
}

.insight-title {
  font-weight: 600;
  color: #0c4a6e;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.insight-text {
  color: #0369a1;
  font-size: 0.875rem;
  line-height: 1.5;
}

.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

// Enhanced Main Component
export default function NewDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        // 1️⃣ Fetch suppliers
        const suppliersRes = await fetch(
          "http://localhost:5000/api/suppliers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // ensure token is stored at login
            },
          }
        );
        const suppliers = await suppliersRes.json();
        setSuppliers(suppliers);
        console.log("✅ Suppliers fetched:", suppliers);

        if (!suppliers.length) {
          console.warn("⚠️ No suppliers found");
          setLoading(false);
          return;
        }

        // 2️⃣ Pick first supplier ID (or you can add dropdown later for selection)
        const supplierId = suppliers[0]._id;

        // 3️⃣ Fetch analysis data
        const analysisRes = await fetch(
          `http://localhost:5000/api/suppliers/${supplierId}/analysis`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const analysis = await analysisRes.json();
        console.log("✅ Analysis fetched:", analysis);

        setAnalysisData(analysis); // ✅ Save for components
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <>
      {loading && <Loader />}

      <style>{styles}</style>
      <div className="dashboard-container">
        <Topbar />
        <div className="main-layout">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            data={suppliers}
          />

          <main className="main-content">
            {/* ✅ Pass fetched analysisData to components */}
            <HeaderCards data={analysisData} />
            <RouteCards data={analysisData} />
            <Charts data={analysisData} />
            {/* <ColorAnalysis data={analysisData} /> */}
            {/* <ColorPalette data={analysisData} /> */}
          </main>
        </div>
      </div>
    </>
  );
}
