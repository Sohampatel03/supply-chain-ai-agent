import React, { useState } from "react";
import { Home, BarChart3, Route, Truck, Settings } from "lucide-react";

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

        {/* Analysis with Dropdown if multiple companies */}
        <NavItem
          icon={<BarChart3 size={18} />}
          label={selectedCompany || "Analysis"}
          active={activeTab === "analysis"}
          onClick={() => setActiveTab("analysis")}
        >
          {data.length > 1 && (
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

        {/* Route Management */}
        <NavItem
          icon={<Route size={18} />}
          label="Route Management"
          active={activeTab === "routes"}
          onClick={() => setActiveTab("routes")}
        />

        {/* Logistics */}
        <NavItem
          icon={<Truck size={18} />}
          label="Logistics"
          active={activeTab === "logistics"}
          onClick={() => setActiveTab("logistics")}
        />

        {/* Settings */}
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
