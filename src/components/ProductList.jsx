import React from "react";

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-50">
      <h2 className="text-xl font-semibold mb-3">Products</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between items-center p-2 border-b">
            <span>{product.name} - ${product.price}</span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
