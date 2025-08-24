import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SupplierForm from "./components/SupplierForm";
import Dashboard from "./components/Dashboard/Dashboard";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import RecentAlerts from "./components/Dashboard/RecentAlerts"; // Import the RecentAlerts component
import './components/AuthPanel.css';
import './App.css';
import 'leaflet/dist/leaflet.css';
import "./components/DynamicMap.css";
import D from "./components/d";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<SignUpForm />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/form" element={<SupplierForm />} />
      <Route path="/d" element={<D />} />

      <Route path="/alerts" element={<RecentAlerts />} /> {/* Add this new route */}

    </Routes>
  );
}

export default App;