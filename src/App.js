import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import BarChart from "./components/BarChart";
import FilterBar from "./components/FilterBar";
import logo from "./images/logo.png";
import chart from "./images/chart.png";

const App = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [filters, setFilters] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const response = await axios.get("/api/data/", { params: filters });
          setDataPoints(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [filters, isAuthenticated]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAuthChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async () => {
    const url = authMode === "login" ? "/api/login/" : "/api/signup/";
    try {
      const response = await axios.post(url, credentials);
      if (authMode === "login") {
        if (response.data.access) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.access}`;
          setIsAuthenticated(true);
        }
      } else {
        setAuthMode("login");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="navigation">
          <li className="active">
            <button className="link-button">Dashboard</button>
          </li>
          <li>
            <button className="link-button">Users</button>
          </li>
          <li>
            <button className="link-button">Products</button>
          </li>
          <li>
            <button className="link-button">Settings</button>
          </li>
        </ul>
      </aside>
      <main className="main">
        <header className="header">
          <h1>Data Visualization Dashboard</h1>
          <nav>
            <ul>
              <li>
                <button className="link-button">Dashboard</button>
              </li>
              <li>
                <button className="link-button">Projects</button>
              </li>
              <li>
                <button className="link-button">Tasks</button>
              </li>
            </ul>
          </nav>
        </header>
        <div className="main-container">
          <div className="chart">
            <img src={chart} alt="Analytics Chart" />
          </div>
          <section>
            <aside className="sidebar1">
              <h2>Filters</h2>
              <FilterBar onFilterChange={handleFilterChange} />
            </aside>
            <main className="main-content">
              <div>
                <BarChart data={dataPoints} />
              </div>
            </main>
          </section>
          <div className="card">
            <div className="auth-container">
              <h2>{authMode === "login" ? "Login" : "Sign Up"}</h2>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleAuthChange}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleAuthChange}
                placeholder="Password"
              />
              <button onClick={handleAuthSubmit}>
                {authMode === "login" ? "Login" : "Sign Up"}
              </button>
              <button
                onClick={() =>
                  setAuthMode(authMode === "login" ? "signup" : "login")
                }
              >
                Switch to {authMode === "login" ? "Sign Up" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
