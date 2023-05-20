import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import "./styles.css";
import { Button } from "@mui/material";

import UserList from "./admin-list/users/UserList";
import ItemList from "./admin-list/items/ItemList";
import ExportData from "./admin-list/export/ExportData";

const Admin = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedOption, setSelectedOption] = useState("list");
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isAdmin) {
      setAuthenticated(true);
    }
  }, [props.isAdmin]);

  const handleLogout = () => {
    setAuthenticated(false);
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
    <div>You are not authorized to access this page.</div>
  );
};

const AdminProfile = () => {
  return <div>Admin Profile</div>;
};

const mapStateToProps = (state) => ({
  isAdmin: state.auth.user?.role === "admin",
});

export default connect(mapStateToProps)(Admin);
