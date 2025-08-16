import React, { useState } from "react";
import { api } from "../API_REQUEST/api";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", form);

    try {
      let res = await api.post("/login", form);

      alert(res.data.message);
      console.log(res.data.data.username);

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", res.data.data.username);
      localStorage.setItem("role", res.data.data.role)
      console.log("Login with email " + res.data.data.email);
      console.log(res.data.data.role);
      localStorage.setItem("email", res.data.data.email); // ✅ ADD THIS LINE
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };


  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3 text-center">Login</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};
