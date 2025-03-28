import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Switch, message } from "antd";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import Cookies from "js-cookie";
import PatientTable from "../components/PatientTable";
import Sidebar from "../components/Sidebar";
import DataService from "../DataService";
import logo from "../assets/images/vtc.png";
import "../assets/styles/Dashboard.css";

const PatientList = ({ user, darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [patients, setPatients] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingPatient, setViewingPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const data = await DataService.fetchAll();
        const normalizedData = data.map((patient) => ({
          ...patient,
          id: Number(patient.id),
        }));
        setPatients(normalizedData.sort((a, b) => b.id - a.id));
      } catch (error) {
        console.error("Error fetching patients:", error);
        message.error("Failed to fetch patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();

    const handleDataUpdate = () => fetchPatients();
    window.addEventListener("dataUpdated", handleDataUpdate);
    return () => window.removeEventListener("dataUpdated", handleDataUpdate);
  }, []);

  useEffect(() => {
    if (loading || patients.length === 0) return;

    const pathParts = location.pathname.split("/");
    const patientId = Number(pathParts[pathParts.length - 1]);
    console.log("Patient ID from URL:", patientId);
    console.log("Patients list:", patients);

    if (pathParts.length === 3 && pathParts[1] === "patients") {
      if (!isNaN(patientId)) {
        const patient = patients.find((p) => p.id === patientId);
        console.log("Found patient:", patient);
        if (patient) {
          setViewingPatient(patient);
          setIsViewModalOpen(true);
        } else if (!isNavigating) {
          message.error("Patient not found!");
          setIsViewModalOpen(false);
          setViewingPatient(null);
          navigate("/patients");
        }
      } else {
        navigate("/not-found");
      }
    } else if (!isNavigating) {
      setIsViewModalOpen(false);
      setViewingPatient(null);
    }
  }, [location.pathname, loading, patients, isNavigating, navigate]);

  const handleLogout = () => {
    Cookies.remove("user_logged_in");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const addPatient = async (patient) => {
    try {
      const newPatient = await DataService.addNew(patient);
      setPatients((prevPatients) => {
        const updatedPatients = [...prevPatients, { ...newPatient, id: Number(newPatient.id) }];
        return updatedPatients.sort((a, b) => b.id - a.id);
      });
      message.success("Patient added successfully!");
    } catch (error) {
      console.error("Error adding patient:", error);
      message.error("Failed to add patient.");
    }
  };

  const updatePatient = async (id, updatedPatient) => {
    try {
      const updated = await DataService.modify(id, updatedPatient);
      setPatients((prevPatients) =>
        prevPatients.map((patient) => (patient.id === Number(id) ? { ...updated, id: Number(id) } : patient))
      );
      message.success("Patient updated successfully!");
    } catch (error) {
      console.error("Error updating patient:", error);
      message.error("Failed to update patient.");
    }
  };

  const deletePatient = async (id) => {
    try {
      const updatedPatients = await DataService.remove(id);
      setPatients(updatedPatients.map((patient) => ({ ...patient, id: Number(patient.id) })));
      message.success("Patient deleted successfully!");
    } catch (error) {
      console.error("Error deleting patient:", error);
      message.error("Failed to delete patient.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <h1>Patient Management</h1>
          <PatientTable
            patients={patients}
            onAdd={addPatient}
            onEdit={updatePatient}
            onDelete={deletePatient}
            darkMode={darkMode}
            viewMode={viewMode}
            setViewMode={setViewMode}
            isViewModalOpen={isViewModalOpen}
            setIsViewModalOpen={setIsViewModalOpen}
            viewingPatient={viewingPatient}
            setViewingPatient={setViewingPatient}
            setIsNavigating={setIsNavigating}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientList;