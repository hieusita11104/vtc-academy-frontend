import { useState } from "react";

const DynamicForm = () => {
  const [education, setEducation] = useState([{ school: "", degree: "", year: "" }]);
  const [errors, setErrors] = useState([]);

  const handleChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const addField = () => {
    setEducation([...education, { school: "", degree: "", year: "" }]);
  };

  const removeField = (index) => {
    if (education.length === 1) return;
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const validate = () => {
    const newErrors = education.map((edu) => ({
      school: edu.school ? "" : "Vui lòng nhập trường!",
      degree: edu.degree ? "" : "Vui lòng nhập bằng cấp!",
      year: edu.year ? "" : "Vui lòng nhập năm tốt nghiệp!",
    }));
    setErrors(newErrors);
    return newErrors.every((err) => !err.school && !err.degree && !err.year);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Dữ liệu đã gửi:", education);
      alert("Lưu thành công!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Exercise 3: Dynamic Form Fields</h2>
      <form onSubmit={handleSubmit}>
        {education.map((edu, index) => (
          <div key={index} className="p-4 border rounded-lg mb-4 bg-gray-100 relative">
            <button
              type="button"
              onClick={() => removeField(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              ❌
            </button>
            <h4 className="text-lg font-medium mb-2">Học vấn #{index + 1}</h4>
            <input
              type="text"
              placeholder="Tên trường"
              value={edu.school}
              onChange={(e) => handleChange(index, "school", e.target.value)}
              className={`w-full p-2 border rounded-md mb-2 ${errors[index]?.school ? "border-red-500" : "border-gray-300"}`}
            />
            {errors[index]?.school && <p className="text-red-500 text-sm">{errors[index].school}</p>}

            <input
              type="text"
              placeholder="Bằng cấp"
              value={edu.degree}
              onChange={(e) => handleChange(index, "degree", e.target.value)}
              className={`w-full p-2 border rounded-md mb-2 ${errors[index]?.degree ? "border-red-500" : "border-gray-300"}`}
            />
            {errors[index]?.degree && <p className="text-red-500 text-sm">{errors[index].degree}</p>}

            <input
              type="text"
              placeholder="Năm tốt nghiệp"
              value={edu.year}
              onChange={(e) => handleChange(index, "year", e.target.value)}
              className={`w-full p-2 border rounded-md mb-2 ${errors[index]?.year ? "border-red-500" : "border-gray-300"}`}
            />
            {errors[index]?.year && <p className="text-red-500 text-sm">{errors[index].year}</p>}
          </div>
        ))}
        <button
          type="button"
          onClick={addField}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mb-2"
        >
          + Thêm học vấn
        </button>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Lưu thông tin
        </button>
      </form>
    </div>
  );
};
export default DynamicForm;
