import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Vui lòng nhập họ và tên!";
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ!";
    }
    if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại!";
    if (!formData.dob) newErrors.dob = "Vui lòng chọn ngày sinh!";
    if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính!";
    if (!formData.address) newErrors.address = "Vui lòng nhập địa chỉ!";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Dữ liệu đã gửi:", formData);
      alert("Đăng ký thành công!");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Đăng ký</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">* Họ và tên</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block font-medium">* Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block font-medium">* Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div>
          <label className="block font-medium">* Ngày sinh</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        <div>
          <label className="block font-medium">* Giới tính</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div>
          <label className="block font-medium">* Địa chỉ</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 h-20"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Register;
