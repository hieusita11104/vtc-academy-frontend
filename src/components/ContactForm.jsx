import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên!";
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email!";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email không hợp lệ!";
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập tin nhắn!";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "message") setCharCount(value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Gửi thành công!");
      setFormData({ name: "", email: "", message: "" });
      setCharCount(0);
    }
  };

  return (
    <div className="max-w-md mx-auto font-sans p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">
        Exercise 1: Building a Simple Contact Form
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block font-medium">* Họ tên</label>
        <input
          type="text"
          name="name"
          placeholder="Nhập họ tên của bạn"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md mb-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <label className="block font-medium">* Email</label>
        <input
          type="email"
          name="email"
          placeholder="Nhập email của bạn"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md mb-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <label className="block font-medium">* Tin nhắn</label>
        <textarea
          name="message"
          placeholder="Nhập tin nhắn của bạn"
          value={formData.message}
          onChange={handleChange}
          maxLength="500"
          className={`w-full p-2 border rounded-md mb-2 h-24 ${errors.message ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        <p className="text-gray-600 text-sm">{charCount} / 500</p>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Gửi tin nhắn
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
