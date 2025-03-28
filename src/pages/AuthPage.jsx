import React from "react";
import useAuthLogic from "../hooks/useAuthLogic";
import AuthLeft from "../components/AuthLeft";
import AuthRight from "../components/AuthRight";
import "../assets/styles/AuthPage.css";

const AuthPage = ({
  setUser,
}) => {
  const {
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
  } = useAuthLogic(setUser);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <AuthLeft />

        <AuthRight
          isSignUp={isSignUp}
          alertVisible={alertVisible}
          setAlertVisible={setAlertVisible}
          alertMessage={alertMessage}
          alertType={alertType}
          formData={formData}
          formError={formError}
          handleSubmitLogin={handleSubmitLogin}
          handleSubmitRegister={handleSubmitRegister}
          toggleForm={toggleForm}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AuthPage;