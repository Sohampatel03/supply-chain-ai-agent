import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPanel.css";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Save user data to localStorage (for demo purposes)
    localStorage.setItem('user', JSON.stringify({ username: form.username, email: form.email, password: form.password }));
    navigate('/form');
  };

  return (
    <div className="auth-bg">
      <form className="auth-card" onSubmit={handleSubmit} autoComplete="off">
        <h1 className="auth-title">Sign Up</h1>
        <input
          className="auth-input"
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="auth-input"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="auth-input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          className="auth-input"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        {error && <div style={{ color: 'red', textAlign: 'center', width: '100%' }}>{error}</div>}
        <button className="auth-btn primary" type="submit">Sign Up</button>
        <button className="auth-btn secondary" type="button" onClick={() => navigate('/')}>Back to Login</button>
      </form>
    </div>
  );
};

export default SignUpForm;

