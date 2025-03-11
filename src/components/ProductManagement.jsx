import React from "react";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

const ProductManagement = () => {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Product Management</h1>
        <ProductForm />
        <ProductTable />
      </div>
  );
};

export default ProductManagement;
