import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthPanel.css";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // 1️⃣ Login request
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: form.email,
        password: form.password
      });

      const user = { _id: res.data._id, name: res.data.name, email: res.data.email };

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      // 2️⃣ Check if supplier exists
      const supplierCheck = await axios.get(`http://localhost:5000/api/supplier/check/${user._id}`);
    console.log(supplierCheck.data);
      if (supplierCheck.data.exists) {
        // Supplier exists → store supplier data and navigate to dashboard
        localStorage.setItem("supplier", JSON.stringify(supplierCheck.data.supplier));
        navigate("/dashboard");
      } else {
        // Supplier does not exist → navigate to supplier form
        navigate("/form");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="auth-bg">
      <form className="auth-card" onSubmit={handleSubmit} autoComplete="off">
        <h1 className="auth-title">Login</h1>
        {error && <div style={{ color: "red", textAlign: "center", marginTop: "0.5rem" }}>{error}</div>}
        <input className="auth-input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="auth-input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      
        <button className="auth-btn primary" type="submit">Login</button>
        <button className="auth-btn secondary" type="button" onClick={() => navigate("/register")}>Sign Up</button>
      </form>
    </div>
  );
};

export default LoginForm;
