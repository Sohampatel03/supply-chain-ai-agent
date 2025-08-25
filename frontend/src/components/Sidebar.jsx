
import React, { useEffect, useState } from "react";
import { Home, BarChart3, Route, Truck, Settings, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";


const NavItem = ({ icon, label, active, onClick, children }) => {
  return (
    <div className="nav-item-wrapper">
      <button
        className={`nav-item ${active ? "nav-item-active" : ""}`}
        onClick={onClick}
      >
        <span>{icon}</span>
        <span>{label}</span>
      </button>
      {children && <div className="nav-dropdown">{children}</div>}
    </div>
  );
};

const Sidebar = ({
  activeTab,
  setActiveTab,
  data,
  selectedSupplier,
  setSelectedSupplier,
}) => {
const Sidebar = ({ activeTab, setActiveTab, data }) => {
  const [selectedCompany, setSelectedCompany] = useState(data[0]?.companyName);
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavItem
          icon={<Home size={18} />}
          label="Dashboard"
          active={activeTab === "home"}
          onClick={() => setActiveTab("home")}
        />

        {/* Supplier Analysis Dropdown (MODIFIED) */}
        <div className="nav-item-wrapper">
          <div className="nav-item supplier-dropdown-wrapper">
            <span>
              <BarChart3 size={18} />
            </span>
        <NavItem
          icon={<BarChart3 size={18} />}
          label={selectedCompany || "Analysis"}
          active={activeTab === "analysis"}
          onClick={() => setActiveTab("analysis")}
        >
          {data.length > 1 && (
            <select
              className="company-dropdown"
              value={selectedSupplier?.companyName || ""}
              onChange={(e) => {
                const companyName = e.target.value;
                setSelectedSupplier(data.find((c) => c.companyName === companyName));
                setActiveTab("analysis");
              }}
            >
              <option value="" disabled>
                TransGlobal Logistics
              </option>
              {data.map((company, idx) => (
                <option key={idx} value={company.companyName}>
                  {company.companyName}
                </option>
              ))}
            </select>
          </div>
        </div>

       
        <NavItem
          icon={<Route size={18} />}
          label="Route Management"
          active={activeTab === "routes"}
          onClick={() => setActiveTab("routes")}
        />

      
        <NavItem
          icon={<Truck size={18} />}
          label="Logistics"
          active={activeTab === "logistics"}
          onClick={() => navigate("/map")}
        />
        
        <NavItem
          icon={<PlusCircle size={18} />}
          label="Add Supplier"
          active={activeTab === "add-supplier"}
          onClick={() => navigate("/form")}
        />

        <NavItem
          icon={<Settings size={18} />}
          label="Settings"
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />
      </nav>
    </aside>
  );
};
export default Sidebar;