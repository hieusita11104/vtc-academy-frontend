import React from "react";
import { useForm } from "react-hook-form";

const AdvancedForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert("Form submitted successfully!");
    console.log(data);
  };

  const password = watch("password");

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Advanced Form Validation</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <label className="block font-medium">* Mật khẩu</label>
          <input
            type="password"
            {...register("password", {
              required: "Mật khẩu không được để trống",
              minLength: { value: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt",
              },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block font-medium">* Xác nhận mật khẩu</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Vui lòng nhập lại mật khẩu",
              validate: (value) => value === password || "Mật khẩu không khớp",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <div>
          <label className="block font-medium">* Ngày sinh</label>
          <input
            type="date"
            {...register("dob", {
              required: "Vui lòng chọn ngày sinh",
              validate: (value) => {
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                return age >= 18 || "Bạn phải ít nhất 18 tuổi";
              },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
        </div>

        <div>
          <label className="block font-medium">* Số thẻ tín dụng</label>
          <input
            type="text"
            {...register("creditCard", {
              required: "Vui lòng nhập số thẻ tín dụng",
              pattern: {
                value: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
                message: "Định dạng số thẻ không hợp lệ (XXXX-XXXX-XXXX-XXXX)",
              },
            })}
            className="w-full border p-2 rounded"
            placeholder="XXXX-XXXX-XXXX-XXXX"
          />
          {errors.creditCard && <p className="text-red-500 text-sm">{errors.creditCard.message}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default AdvancedForm;
