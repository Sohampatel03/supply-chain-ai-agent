import React from "react";
import { Routes, Route } from "react-router-dom";
import InventoryForm from "./components/SupplierForm";
import Dashboard from "./components/Dashboard";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm"; // ✅ Add the backend-integrated Login
import "./components/AuthPanel.css";
import "./App.css";
import "leaflet/dist/leaflet.css";
import "./components/DynamicMap.css"; // Make sure the path is correct

function App() {
  return (
    <Routes>
      {/* Login page */}
      <Route path="/login" element={<LoginForm />} />

      {/* Signup page */}
      <Route path="/register" element={<SignUpForm />} />

      {/* Dashboard - protected after login */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Supplier form */}
      <Route path="/form" element={<InventoryForm />} />
    </Routes>
  );
}

export default App;
