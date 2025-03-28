import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaTachometerAlt, FaUsers, FaCog, FaBars } from "react-icons/fa";

const Sidebar = ({
  user,
  onLogout,
  darkMode,
  collapsed,
  setCollapsed,
}) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleItemClick = (item, path) => {
    setActiveItem(item);
    navigate(path);
  };

  return (
    <div
      className={`sidebar ${darkMode ? "dark-theme" : "light-theme"} ${
        collapsed ? "collapsed" : ""
      }`}
    >
      <div className="sidebar-header">
        <button onClick={() => setCollapsed(!collapsed)} className="collapse-button">
          <FaBars className="collapse-icon" />
        </button>
        {!collapsed && (
          <div className="sidebar-user">
            <FaUser className="user-icon" />
            <p>{user?.email || "User"}</p>
          </div>
        )}
      </div>

      <div className="sidebar-menu">
        <button
          className={`sidebar-item ${activeItem === "Dashboard" ? "active" : ""}`}
          onClick={() => handleItemClick("Dashboard", "/dashboard")}
        >
          <FaTachometerAlt className="sidebar-icon" />
          {!collapsed && <span>Dashboard</span>}
        </button>
        <button
          className={`sidebar-item ${activeItem === "Patients" ? "active" : ""}`}
          onClick={() => handleItemClick("Patients", "/patients")}
        >
          <FaUsers className="sidebar-icon" />
          {!collapsed && <span>Patients</span>}
        </button>
        <button
          className={`sidebar-item ${activeItem === "Settings" ? "active" : ""}`}
          onClick={() => handleItemClick("Settings", "/settings")}
        >
          <FaCog className="sidebar-icon" />
          {!collapsed && <span>Settings</span>}
        </button>
      </div>

      <button className="sidebar-logout" onClick={onLogout}>
        <FaSignOutAlt className="logout-icon" />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;