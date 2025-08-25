import React, { useState } from "react";
import { Home, BarChart3, Route, Truck, Settings, Plus } from "lucide-react";
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

const Sidebar = ({ activeTab, setActiveTab, data }) => {
  const [selectedCompany, setSelectedCompany] = useState(data[0]?.companyName);
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {/* Dashboard */}
        <NavItem
          icon={<Home size={18} />}
          label="Dashboard"
          active={activeTab === "home"}
          onClick={() => setActiveTab("home")}
        />

        {/* Analysis with Supplier Dropdown */}
        <NavItem
          icon={<BarChart3 size={18} />}
          label="Analysis"
          active={activeTab === "analysis"}
          onClick={() => setActiveTab("analysis")}
        >
          {data.length > 0 && (
            <select
              className="company-dropdown"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              {data.map((company, idx) => (
                <option key={idx} value={company.companyName}>
                  {company.companyName}
                </option>
              ))}
            </select>
          )}
        </NavItem>

       
        {/* Logistics → Redirect to /map */}
        <NavItem
          icon={<Truck size={18} />}
          label="Logistics"
          active={activeTab === "logistics"}
          onClick={() => navigate("/map")}
        />

        {/* Settings */}
        <NavItem
          icon={<Settings size={18} />}
          label="Settings"
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />

        {/* ➕ Add Supplier (Redirect to /form) */}
        <NavItem
          icon={<Plus size={18} />}
          label="Add Supplier"
          active={false}
          onClick={() => navigate("/form")}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
