import React from "react";
import { Home, BarChart3, Route, Truck, Settings } from "lucide-react";

const NavItem = ({ icon, label, active, onClick }) => {
  return (
    <button 
      className={`nav-item ${active ? "nav-item-active" : ""}`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavItem 
          icon={<Home size={18} />} 
          label="Dashboard" 
          active={activeTab === 'home'}
          onClick={() => setActiveTab('home')}
        />
        <NavItem 
          icon={<BarChart3 size={18} />} 
          label="Supplier Analysis" 
          active={activeTab === 'analysis'}
          onClick={() => setActiveTab('analysis')}
        />
        <NavItem 
          icon={<Route size={18} />} 
          label="Route Management" 
          active={activeTab === 'routes'}
          onClick={() => setActiveTab('routes')}
        />
        <NavItem 
          icon={<Truck size={18} />} 
          label="Logistics" 
          active={activeTab === 'logistics'}
          onClick={() => setActiveTab('logistics')}
        />
        <NavItem 
          icon={<Settings size={18} />} 
          label="Settings" 
          active={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
