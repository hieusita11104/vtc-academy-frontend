import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Switch, Button, Card, Table } from "antd";
import { FaBell, FaMoon, FaSun, FaUser, FaCalendar, FaUsers } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Cookies from "js-cookie";
import Sidebar from "../components/Sidebar";
import DataService from "../DataService";
import logo from "../assets/images/vtc.png";
import "../assets/styles/Dashboard.css";

const Dashboard = ({
  user, 
  darkMode,
  setDarkMode,
}) => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await DataService.fetchAll();
        setRecords(data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();

    const handleDataUpdate = () => fetchRecords();
    window.addEventListener("dataUpdated", handleDataUpdate);

    return () => window.removeEventListener("dataUpdated", handleDataUpdate);
  }, []);

  const handleLogout = () => {
    Cookies.remove("user_logged_in");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const totalPatients = records.length;
  const newPatientsThisMonth = records.filter((record) => {
    const recordDate = new Date(record.createdAt);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
  }).length;
  const appointmentsToday = 5;

  const activePatients = records.filter((record) => record.status === "Active").length;
  const inactivePatients = records.filter((record) => record.status === "Inactive").length;
  const pieData = [
    { name: "Active", value: activePatients },
    { name: "Inactive", value: inactivePatients },
  ];
  const COLORS = ["#10b981", "#ef4444"];

  const recentPatients = records.slice(0, 5);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={status === "Active" ? "status-active" : "status-inactive"}>
          {status}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className={`dashboard-wrapper ${darkMode ? "dark-theme" : "light-theme"}`}>
      <div className="dashboard-header">
        <div className="header-logo">
          <img src={logo} alt="VTC Academy" className="logo-image" />
          <span className="logo-text">VTC Academy</span>
        </div>
        <div className="header-right">
          <div className="notification">
            <FaBell className="notification-icon" />
            <span className="notification-badge">3</span>
          </div>
          <Switch
            checkedChildren={<FaMoon />}
            unCheckedChildren={<FaSun />}
            checked={darkMode}
            onChange={(checked) => setDarkMode(checked)}
            className="dark-mode-switch"
          />
          <div className="user-avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt="User Avatar" className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard">
        <Sidebar
          user={user}
          onLogout={handleLogout}
          darkMode={darkMode}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <div className="dashboard-content">
          <h1>Dashboard Overview</h1>
          <div className="welcome-message">
            <h2>Hello, {user?.email || "User"}!</h2>
            <p>Welcome to your patient management dashboard.</p>
          </div>

          <div className="dashboard-overview">
            <div className="overview-cards">
              <Card className="overview-card">
                <FaUsers className="card-icon" />
                <div className="card-content">
                  <h3>Total Patients</h3>
                  <p>{totalPatients}</p>
                </div>
              </Card>
              <Card className="overview-card">
                <FaUser className="card-icon" style={{ color: "#10b981" }} />
                <div className="card-content">
                  <h3>New Patients This Month</h3>
                  <p>{newPatientsThisMonth}</p>
                </div>
              </Card>
              <Card className="overview-card">
                <FaCalendar className="card-icon" style={{ color: "#2563eb" }} />
                <div className="card-content">
                  <h3>Appointments Today</h3>
                  <p>{appointmentsToday}</p>
                </div>
              </Card>
            </div>

            <Card className="chart-card">
              <h3>Patient Status Distribution</h3>
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  cx={200}
                  cy={150}
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Card>

            <Card className="recent-patients-card">
              <h3>Recent Patients</h3>
              <Table
                columns={columns}
                dataSource={recentPatients}
                pagination={false}
                className="recent-patients-table"
              />
            </Card>

            <div className="cta-button">
              <Button
                type="primary"
                onClick={() => navigate("/patients")}
                className="px-6 py-2 rounded-full"
              >
                View All Patients
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;