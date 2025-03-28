import React, { useEffect } from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const NotFound = ({
  darkMode,
}) => {
  const navigate = useNavigate();
  const isLoggedIn = Cookies.get("user_logged_in");

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isLoggedIn ? "/dashboard" : "/auth");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, isLoggedIn]);

  return (
    <div
      className={`h-screen w-full flex items-center justify-center ${
        darkMode ? "dark-theme" : "light-theme"
      }`}
    >
      <div
        className={`p-8 rounded-lg max-w-md w-full ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-600"
        }`}
      >
        <Result
          status="404"
          title={
            <span
              className={`text-4xl font-bold ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              404
            </span>
          }
          subTitle={
            <div className={`mt-3 mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <p className="text-lg">Trang không tìm thấy</p>
              <p className="text-sm mt-2">
                Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
              </p>
              <p className="text-sm mt-2">Bạn sẽ được chuyển hướng sau 5 giây...</p>
            </div>
          }
        />

        <div className="flex justify-center mt-6">
          <div
            className={`px-4 py-2 rounded-full ${
              darkMode ? "bg-blue-900 text-blue-300" : "bg-blue-50 text-blue-600"
            } text-sm`}
          >
            Error Code: 404 Page Not Found
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            type="primary"
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/auth")}
            className="px-6 py-2 rounded-full"
          >
            {isLoggedIn ? "Quay lại trang chủ" : "Đi đến trang đăng nhập"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;