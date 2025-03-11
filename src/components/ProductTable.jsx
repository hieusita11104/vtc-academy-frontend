import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../features/products/productSlice";

const ProductTable = () => {
  const products = useSelector((state) => {
    console.log("Redux State:", state.products); // Kiểm tra Redux state
    return state.products?.items || []; // Đảm bảo `items` luôn tồn tại
  });

  const dispatch = useDispatch();

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-2">Product List</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center p-2 border-b"
            >
              {product.name} - ${product.price}
              <button
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => dispatch(removeProduct(product.id))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductTable;
