import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { message } from "antd";

const useAuthLogic = (setUser) => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const isLoggedIn = Cookies.get("user_logged_in");
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const setLoginCookie = () => {
    Cookies.set("user_logged_in", "true", { expires: 5 / 1440 });
  };

  const validateEmail = (email) => {
    if (!email) return "Email không được để trống!";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Email không hợp lệ!";
    return "";
  };

  const validateUsername = (username) => {
    if (!username) return "Tên người dùng không được bỏ trống!";
    if (username.length < 3) return "Tên người dùng phải có ít nhất 3 kí tự!";
    return "";
  };

  const validateFullName = (fullName) => {
    if (!fullName) return "Họ tên không được bỏ trống!";
    if (fullName.length < 3) return "Họ tên phải có ít nhất 3 kí tự!";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Mật khẩu không được bỏ trống";
    if (password.length < 8) return "Mật khẩu phải có ít nhất 8 kí tự!";
    if (!/[A-Z]/.test(password)) return "Mật khẩu phải chứa ít nhất 1 chữ hoa!";
    if (!/[a-z]/.test(password)) return "Mật khẩu phải chứa ít nhất 1 chữ thường!";
    if (!/[\d]/.test(password)) return "Mật khẩu phải chứa ít nhất 1 chữ số!";
    if (password.length > 20) return "Mật khẩu đã quá độ dài cho phép (tối đa 20 kí tự)!";
    return "";
  };

  const validateConfirmPassword = (confirmPwd) => {
    if (!confirmPwd) return "Xác nhận mật khẩu không được để trống!";
    if (confirmPwd !== formData.password) return "Mật khẩu xác nhận không khớp!";
    return "";
  };

  const validateLoginData = () => {
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = !formData.password ? "Mật khẩu không được để trống!" : "";
    const registeredUsers = JSON.parse(localStorage.getItem("registered_users")) || [];

    if (!registeredUsers.length) {
      setFormError({ ...formError, username: "", email: "Tài khoản chưa được đăng ký!", password: "" });
      return false;
    }

    const user = registeredUsers.find((u) => u.email === formData.email);
    if (!user) {
      setFormError({ ...formError, username: "", email: "Email không tồn tại!", password: "" });
      return false;
    }
    if (user.username !== formData.username) {
      setFormError({ ...formError, username: "Tên người dùng không chính xác!", email: "", password: "" });
      return false;
    }
    if (user.password !== formData.password) {
      setFormError({ ...formError, username: "", email: "", password: "Mật khẩu không chính xác!" });
      return false;
    }

    setFormError({ ...formError, username: usernameError, email: emailError, password: passwordError });
    return !usernameError && !emailError && !passwordError && user.username === formData.username && user.email === formData.email && user.password === formData.password;
  };

  const validateRegisterData = () => {
    const usernameError = validateUsername(formData.username);
    const fullNameError = validateFullName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword);

    const registeredUsers = JSON.parse(localStorage.getItem("registered_users")) || [];
    const emailExists = registeredUsers.some((user) => user.email === formData.email);
    const finalEmailError = emailError || (emailExists ? "Email đã được đăng ký!" : "");

    setFormError({
      username: usernameError,
      fullName: fullNameError,
      email: finalEmailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    return !usernameError && !fullNameError && !finalEmailError && !passwordError && !confirmPasswordError;
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (validateRegisterData()) {
      const user = {
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      };
      const registeredUsers = JSON.parse(localStorage.getItem("registered_users")) || [];
      registeredUsers.push(user);
      localStorage.setItem("registered_users", JSON.stringify(registeredUsers));
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      message.success("Đăng ký thành công! Vui lòng đăng nhập.");
      setIsSignUp(false);
      setFormError({
        username: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setFormData({
        username: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const registeredUsers = JSON.parse(localStorage.getItem("registered_users")) || [];

    if (!registeredUsers.length) {
      setAlertMessage("Tài khoản chưa được đăng ký!");
      setAlertType("error");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
      return;
    }

    const user = registeredUsers.find((u) => u.email === formData.email);
    if (!user) {
      setAlertMessage("Email không tồn tại!");
      setAlertType("error");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
      return;
    }
    if (user.username !== formData.username) {
      setAlertMessage("Tên người dùng không chính xác!");
      setAlertType("error");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
      return;
    }
    if (user.password !== formData.password) {
      setAlertMessage("Mật khẩu không chính xác!");
      setAlertType("error");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
      return;
    }
    if (validateLoginData()) {
      setAlertMessage("Đăng nhập thành công!");
      setAlertType("success");
      setAlertVisible(true);
      setLoginCookie();
      setUser({ username: formData.username, email: formData.email });
      localStorage.setItem("user", JSON.stringify({ username: formData.username, email: formData.email }));
      setTimeout(() => navigate("/dashboard"), 1000);
      setFormError({
        username: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setFormData({
        username: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setFormError({
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    let errorMessage = "";
    switch (name) {
      case "username":
        errorMessage = validateUsername(value);
        setFormError({ ...formError, username: errorMessage });
        break;
      case "fullName":
        errorMessage = validateFullName(value);
        setFormError({ ...formError, fullName: errorMessage });
        break;
      case "email":
        errorMessage = validateEmail(value);
        setFormError({ ...formError, email: errorMessage });
        break;
      case "password":
        errorMessage = validatePassword(value);
        setFormError({
          ...formError,
          password: errorMessage,
          confirmPassword: formData.confirmPassword
            ? value !== formData.confirmPassword
              ? "Mật khẩu xác nhận không khớp!"
              : ""
            : formError.confirmPassword,
        });
        break;
      case "confirmPassword":
        errorMessage = validateConfirmPassword(value);
        setFormError({ ...formError, confirmPassword: errorMessage });
        break;
      default:
        break;
    }
  };

  return {
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
  };
};

export default useAuthLogic;