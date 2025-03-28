import React from "react";
import { Input, Button } from "antd";

const AuthForm = ({
  isSignUp,
  formData,
  formError,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <Input
          placeholder="Username"
          value={formData.username}
          onChange={(e) => handleChange("username", e.target.value)}
          className="form-input"
        />
        {formError.username && <p className="form-error">{formError.username}</p>}
      </div>

      {isSignUp && (
        <div className="form-group">
          <Input
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="form-input"
          />
          {formError.fullName && <p className="form-error">{formError.fullName}</p>}
        </div>
      )}

      <div className="form-group">
        <Input
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="form-input"
        />
        {formError.email && <p className="form-error">{formError.email}</p>}
      </div>

      <div className="form-group">
        <Input.Password
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className="form-input"
        />
        {formError.password && <p className="form-error">{formError.password}</p>}
      </div>

      {isSignUp && (
        <div className="form-group">
          <Input.Password
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            className="form-input"
          />
          {formError.confirmPassword && (
            <p className="form-error">{formError.confirmPassword}</p>
          )}
        </div>
      )}

      <Button type="primary" htmlType="submit" className="form-button">
        {isSignUp ? "Sign Up" : "Sign In"}
      </Button>
    </form>
  );
};

export default AuthForm;