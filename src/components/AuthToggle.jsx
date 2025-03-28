import React from "react";

const AuthToggle = ({
  isSignUp, 
  toggleForm,
}) => {
  return (
    <div className="auth-toggle">
      <button
        className={`toggle-button ${isSignUp ? "active" : ""}`}
        onClick={() => !isSignUp && toggleForm()}
      >
        Sign Up
      </button>

      <button
        className={`toggle-button ${!isSignUp ? "active" : ""}`}
        onClick={() => isSignUp && toggleForm()}
      >
        Sign In
      </button>
    </div>
  );
};

export default AuthToggle;