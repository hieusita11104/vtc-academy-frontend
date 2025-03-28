import React from "react";
import { Alert } from "antd";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaTwitter, FaPinterest } from "react-icons/fa";
import AuthToggle from "./AuthToggle";
import AuthForm from "./AuthForm";

const AuthRight = ({
  isSignUp,
  alertVisible,
  setAlertVisible,
  alertMessage,
  alertType,
  formData,
  formError,
  handleSubmitLogin,
  handleSubmitRegister,
  toggleForm,
  handleChange,
}) => {
  return (
    <div className="auth-right">
      {alertVisible && (
        <Alert
          message={alertMessage}
          type={alertType}
          showIcon
          closable
          onClose={() => setAlertVisible(false)}
          className="auth-alert"
        />
      )}

      <div className="auth-right-content">
        <AuthToggle isSignUp={isSignUp} toggleForm={toggleForm} />

        <AuthForm
          isSignUp={isSignUp}
          formData={formData}
          formError={formError}
          handleChange={handleChange}
          handleSubmit={isSignUp ? handleSubmitRegister : handleSubmitLogin}
        />

        <div className="auth-social-links">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="social-icon linkedin" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon instagram" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="social-icon facebook" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon twitter" />
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <FaPinterest className="social-icon pinterest" />
          </a>
        </div>

        <div className="auth-contact-info">
          <p>📞 0509152-67</p>
          <p>✉️ info@mydiscountedlabs.in</p>
        </div>
      </div>
    </div>
  );
};

export default AuthRight;