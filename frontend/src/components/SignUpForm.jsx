// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./AuthPanel.css";

// // const initialState = {
// //   username: "",
// //   email: "",
// //   password: "",
// //   confirmPassword: "",
// // };

// // const SignUpForm = () => {
// //   const [form, setForm] = useState(initialState);
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (form.password !== form.confirmPassword) {
// //       setError("Passwords do not match");
// //       return;
// //     }
// //   // Save user data to localStorage (for demo purposes)
// //   localStorage.setItem('user', JSON.stringify({ username: form.username, email: form.email, password: form.password }));
// //   navigate('/form');
// //   };

// //   return (
// //     <div className="auth-bg">
// //       <form className="auth-card" onSubmit={handleSubmit} autoComplete="off">
// //         <h1 className="auth-title">Sign Up</h1>
// //         <input
// //           className="auth-input"
// //           type="text"
// //           id="username"
// //           name="username"
// //           placeholder="Username"
// //           value={form.username}
// //           onChange={handleChange}
// //           required
// //         />
// //         <input
// //           className="auth-input"
// //           type="email"
// //           id="email"
// //           name="email"
// //           placeholder="Email"
// //           value={form.email}
// //           onChange={handleChange}
// //           required
// //         />
// //         <input
// //           className="auth-input"
// //           type="password"
// //           id="password"
// //           name="password"
// //           placeholder="Password"
// //           value={form.password}
// //           onChange={handleChange}
// //           required
// //         />
// //         <input
// //           className="auth-input"
// //           type="password"
// //           id="confirmPassword"
// //           name="confirmPassword"
// //           placeholder="Confirm Password"
// //           value={form.confirmPassword}
// //           onChange={handleChange}
// //           required
// //         />
// //         {error && <div style={{ color: 'red', textAlign: 'center', width: '100%' }}>{error}</div>}
// //         <button className="auth-btn primary" type="submit">Sign Up</button>
// //         <button className="auth-btn secondary" type="button" onClick={() => navigate('/')}>Back to Login</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default SignUpForm;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./AuthPanel.css";

// const initialState = {
//   name: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

// const SignUpForm = () => {
//   const [form, setForm] = useState(initialState);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     // Name: letters + spaces, 2-50 chars
//     if (!/^[A-Za-z\s]{2,50}$/.test(form.name)) {
//       setError("Name must be 2-50 letters only");
//       return false;
//     }

//     // Email validation
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       setError("Invalid email format");
//       return false;
//     }

//     // Password length check
//     if (form.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return false;
//     }

//     // Confirm password match
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match");
//       return false;
//     }

//     setError(""); // clear error if valid
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return; // stop if invalid

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         {
//           name: form.name,
//           email: form.email,
//           password: form.password,
//         }
//       );

//       // Save JWT token & user info
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify({
//         _id: res.data._id,
//         name: res.data.name,
//         email: res.data.email
//       }));

//       navigate("/dashboard"); // redirect after signup
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="auth-bg">
//       <form className="auth-card" onSubmit={handleSubmit} autoComplete="off">
//         <h1 className="auth-title">Sign Up</h1>

//         <input
//           className="auth-input"
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="auth-input"
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="auth-input"
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="auth-input"
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           value={form.confirmPassword}
//           onChange={handleChange}
//           required
//         />

//         {error && <div style={{ color: "red", textAlign: "center", marginTop: "0.5rem" }}>{error}</div>}

//         <button className="auth-btn primary" type="submit">Sign Up</button>
//         <button
//           className="auth-btn secondary"
//           type="button"
//           onClick={() => navigate("/")}
//         >
//           Back to Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthPanel.css";

const SignUpForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!/^[A-Za-z\s]{2,50}$/.test(form.name)) { setError("Name must be 2-50 letters only"); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError("Invalid email format"); return false; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return false; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return false; }
    setError(""); 
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name, email: form.email, password: form.password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({ _id: res.data._id, name: res.data.name, email: res.data.email }));
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-bg">
      <form className="auth-card" onSubmit={handleSubmit} autoComplete="off">
        <h1 className="auth-title">Sign Up</h1>
        <input className="auth-input" type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input className="auth-input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="auth-input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input className="auth-input" type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
        {error && <div style={{ color: "red", textAlign: "center", marginTop: "0.5rem" }}>{error}</div>}
        <button className="auth-btn primary" type="submit">Sign Up</button>
        <button className="auth-btn secondary" type="button" onClick={() => navigate("/login")}>Already have an account?</button>
      </form>
    </div>
  );
};

export default SignUpForm;
