import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Relative paths were incorrect. Correcting them.
import SupplierForm from "./components/SupplierForm";
import Dashboard from "./components/Dashboard";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
// Relative paths were incorrect. Correcting them.
import "./components/AuthPanel.css";
import "./App.css";
// This is an external library, so the path is correct.
import "leaflet/dist/leaflet.css";
// import "./assets/DynamicMap.css";

/**
 * A component that checks for a token and protects its child routes.
 * If no token is found, it redirects the user to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token exists, use <Navigate> to immediately redirect.
  // The 'replace' prop ensures the user can't go back to the protected route.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If a token is found, render the child components.
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public routes that anyone can access */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<SignUpForm />} />

      {/* Protected routes that require a valid login token */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form"
        element={
          <ProtectedRoute>
            <SupplierForm />
          </ProtectedRoute>
        }
      />

      {/* Redirect to the login page by default */}
      <Route path="/" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
