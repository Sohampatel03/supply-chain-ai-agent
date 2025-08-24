import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import InventoryForm from "./components/SupplierForm";
import Dashboard from "./components/Dashboard";
import SignUpForm from "./components/SignUpForm";
import './components/AuthPanel.css';
import './App.css';

const defaultSuppliers = [
  {
    supplierName: "Abhay Singh",
    contactNumber: "9876543210",
    itemName: "Steel Rods",
    route: "Mumbai → Pune",
    deliveryDate: "2024-06-10",
    deliveryTime: "10:00",
    dealPrice: "50000",
    inventoryInfo: "100 units, batch #A123"
  },
  {
    supplierName: "Ravi Kumar",
    contactNumber: "9123456789",
    itemName: "Copper Wires",
    route: "Delhi → Jaipur",
    deliveryDate: "2024-06-12",
    deliveryTime: "14:00",
    dealPrice: "30000",
    inventoryInfo: "200 units, batch #B456"
  },
  {
    supplierName: "Priya Sharma",
    contactNumber: "9988776655",
    itemName: "Plastic Sheets",
    route: "Chennai → Bangalore",
    deliveryDate: "2024-06-15",
    deliveryTime: "09:30",
    dealPrice: "15000",
    inventoryInfo: "50 units, batch #C789"
  }
];

const DashboardLayout = () => {
  const [suppliers, setSuppliers] = useState(() => {
    const stored = localStorage.getItem('suppliers');
    return stored ? JSON.parse(stored) : defaultSuppliers;
  });
  const [selected, setSelected] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [section, setSection] = useState('dashboard');

  const handleAddSupplier = () => setShowForm(true);
  const handleSelectSupplier = (idx) => {
    setSelected(idx);
    setShowForm(false);
  };
  const handleFormSubmit = (form) => {
    const newSuppliers = [...suppliers, form];
    setSuppliers(newSuppliers);
    localStorage.setItem('suppliers', JSON.stringify(newSuppliers));
    setSelected(newSuppliers.length - 1);
    setShowForm(false);
  };

  // Sidebar navigation items (now removed)
  // const sidebarItems = [ ... ];

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(135deg, #a8edea 0%, #274060 100%)', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}>
      {showForm ? (
        <InventoryForm onSubmit={handleFormSubmit} />
      ) : (
        <Dashboard supplier={suppliers[selected]} section={section} setSection={setSection} />
      )}
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h1 className="auth-title">Receiver Panel</h1>
        <input className="auth-input" type="text" placeholder="Username" />
        <input className="auth-input" type="password" placeholder="Password" />
        <button className="auth-btn primary" onClick={() => navigate('/dashboard')}>Login</button>
        <button className="auth-btn secondary" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/form" element={<InventoryForm />} />
      <Route path="/dashboard" element={<DashboardLayout />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
  );
}

export default App;
