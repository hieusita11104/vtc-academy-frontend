import React from "react";
import logo from "../assets/images/logo.png";
import nurseImage from "../assets/images/nurse.png";

const AuthLeft = () => {
  return (
    <div className="auth-left">
      <div className="auth-left-content">
        <img src={logo} alt="My Discounted Labs" className="auth-logo" />
        <img src={nurseImage} alt="Nurse" className="auth-nurse-image" />
      </div>
    </div>
  );
};

export default AuthLeft;