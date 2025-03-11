import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/products/productSlice"; // Import đúng

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!name.trim() || !price.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin sản phẩm!"); // Kiểm tra input
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price), // Đảm bảo giá là số
    };

    console.log("Thêm sản phẩm:", newProduct); // 🔥 Kiểm tra sản phẩm trước khi dispatch
    dispatch(addProduct(newProduct));

    setName(""); // Reset input
    setPrice("");
  };

  return (
    <form onSubmit={handleAddProduct} className="p-4 bg-white shadow rounded">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="border p-2 rounded w-full mb-2"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded w-full"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
