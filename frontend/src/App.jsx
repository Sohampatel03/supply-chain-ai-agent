import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SupplierForm from "./components/SupplierForm";
// import Dashboard from "./components/Dashboard/Dashboard";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import RecentAlerts from "./components/Dashboard/RecentAlerts";
import "./components/AuthPanel.css";
import "./App.css";
import "leaflet/dist/leaflet.css";
import "./components/DynamicMap.css";
import NewDashboard from "./components/d"; // 👈 this looks suspicious

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<SignUpForm />} />

      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

      <Route path="/form" element={<SupplierForm />} />
      <Route path="/dash" element={<NewDashboard />} />

      <Route path="/alerts" element={<RecentAlerts />} />
    </Routes>
  );
}

export default App;
