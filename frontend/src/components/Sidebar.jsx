import React from "react";
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

const Sidebar = ({
  activeTab,
  setActiveTab,
  data,
  selectedSupplier,
  setSelectedSupplier,
}) => {
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

        {/* Supplier Analysis Dropdown (MODIFIED) */}
        <div className="nav-item-wrapper">
          <div className="nav-item supplier-dropdown-wrapper">
            <span>
              <BarChart3 size={18} />
            </span>
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