import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import PatientList from "./pages/PatientList";
import NotFound from "./pages/NotFound";

const ProtectedRoute = ({ element, isLoggedIn, ...props }) => {
  return isLoggedIn ? element : <Navigate to="/auth" />;
};

const PatientDetailRoute = ({ user, darkMode, setDarkMode }) => {
  const { id } = useParams();
  const patientId = Number(id);

  if (isNaN(patientId)) {
    return <Navigate to="/not-found" />;
  }

  return <PatientList user={user} darkMode={darkMode} setDarkMode={setDarkMode} />;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const isLoggedIn = Cookies.get("user_logged_in");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <AuthPage setUser={setUser} />}
        />

        <Route path="/auth" element={<AuthPage setUser={setUser} />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={<Dashboard user={user} darkMode={darkMode} setDarkMode={setDarkMode} />}
            />
          }
        />

        <Route
          path="/patients"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={<PatientList user={user} darkMode={darkMode} setDarkMode={setDarkMode} />}
            />
          }
        />

        <Route
          path="/patients/:id"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={<PatientDetailRoute user={user} darkMode={darkMode} setDarkMode={setDarkMode} />}
            />
          }
        />

        <Route path="/not-found" element={<NotFound darkMode={darkMode} />} />
        <Route path="*" element={<NotFound darkMode={darkMode} />} />
      </Routes>
    </Router>
  );
};

export default App;