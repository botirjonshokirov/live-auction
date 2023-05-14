import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { TextField, Button, Container, Box, Typography } from "@mui/material";

import UserList from "./admin-list/users/UserList";
import ItemList from "./admin-list/items/ItemList";
import ExportData from "./admin-list/export/ExportData";

const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedOption, setSelectedOption] = useState("list");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const expirationTime = localStorage.getItem("admin_token_expiration_time");

    if (token && expirationTime && Date.now() < Number(expirationTime)) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const validEmail = String(process.env.REACT_APP_ADMIN_EMAIL);
    const validPassword = String(process.env.REACT_APP_ADMIN_PASSWORD);
    if (email === validEmail && password === validPassword) {
      setAuthenticated(true);
      setError(false);
      localStorage.setItem("admin_token", "authenticated");
      localStorage.setItem(
        "admin_token_expiration_time",
        String(Date.now() + TOKEN_EXPIRATION_TIME)
      );
    } else {
      alert("Invalid email or password");
      setError(true);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_token_expiration_time");
    navigate("/");
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "list":
        return <ItemList />;
      case "users":
        return <UserList />;
      case "export":
        return <ExportData />;
      case "profile":
        return <AdminProfile />;
      default:
        return <div>No content available</div>;
    }
  };

  return authenticated ? (
    <div className="admin-panel">
      <div className="left-side-menu">
        <div
          className={`menu-item ${selectedOption === "list" ? "active" : ""}`}
          onClick={() => handleOptionClick("list")}
        >
          List of Items
        </div>
        <div
          className={`menu-item ${selectedOption === "users" ? "active" : ""}`}
          onClick={() => handleOptionClick("users")}
        >
          List of Users
        </div>
        <div
          className={`menu-item ${selectedOption === "export" ? "active" : ""}`}
          onClick={() => handleOptionClick("export")}
        >
          Export Data
        </div>
        <div
          className={`menu-item ${
            selectedOption === "profile" ? "active" : ""
          }`}
          onClick={() => handleOptionClick("profile")}
        >
          Admin Profile
        </div>
        <Button
          className="btn-logout"
          variant="contained"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div className="right-side-content">{renderContent()}</div>
    </div>
  ) : (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            required
            value={email}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {error && (
            <Typography variant="subtitle1" color="error">
              Invalid email or password
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

const AdminProfile = () => {
  return <div>Admin Profile</div>;
};

export default Admin;
