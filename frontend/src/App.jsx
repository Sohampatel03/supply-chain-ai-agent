
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Relative paths were incorrect. Correcting them.
import SupplierForm from "./components/SupplierForm";
import Dashboard from "./components/Dashboard/Dashboard";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm"; // ✅ Add the backend-integrated Login
import './components/AuthPanel.css';
import './App.css';
import 'leaflet/dist/leaflet.css';
import "./components/DynamicMap.css"; // Make sure the path is correct


function App() {
  return (
    <Routes>
      {/* Public routes that anyone can access */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<SignUpForm />} />

      {/* Dashboard - protected after login */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Supplier form */}
      <Route path="/form" element={<SupplierForm />} />

    </Routes>
  );
}

export default App;
