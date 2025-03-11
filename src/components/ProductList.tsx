import React from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "Áo Thun", price: 200000 },
  { id: 2, name: "Giày Sneaker", price: 1200000 },
  { id: 3, name: "Nón Lưỡi Trai", price: 150000 },
];

const ProductList: React.FC<{ addToCart: (product: Product) => void }> = ({ addToCart }) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex justify-between bg-gray-100 p-4 rounded-md">
          <span>{product.name} - {product.price.toLocaleString()} VND</span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => addToCart(product)}
          >
            Thêm vào giỏ
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
