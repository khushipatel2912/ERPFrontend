import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  
  //   try {
  //     const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
  //       email: email,
  //       password: password,
  //     });
  
  //     if (response) {
  //       // If login is successful, redirect to a different page (e.g., the offers page)
  //       console.log(response);
  //       window.location.href = '/offers'; // or any other route you want
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error.response ? error.response.data : error.message);
  //   }
  // };
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });
      console.log("Response data:", response.data);
      const token = response.data;

      if (!token) {
        console.error("Token is missing from the API response.");
        setError("Login failed. Please try again.");
        return;
      }

      localStorage.setItem("jwtToken", token); 
      localStorage.setItem("isLoggedIn", "true"); 
      console.log("Token saved in localStorage:", localStorage.getItem("jwtToken"));
     
      window.location.href = "/offers"; 
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card shadow">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
