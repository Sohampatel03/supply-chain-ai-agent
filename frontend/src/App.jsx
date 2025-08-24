import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import InventoryForm from "./components/SupplierForm";
import Dashboard from "./components/Dashboard";
import SignUpForm from "./components/SignUpForm";
import './components/AuthPanel.css';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h1 className="auth-title">Receiver Panel</h1>
        <input className="auth-input" type="text" placeholder="Username" />
        <input className="auth-input" type="password" placeholder="Password" />
        <button className="auth-btn primary" onClick={() => navigate('/form')}>Login</button>
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
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
  );
}

export default App;
