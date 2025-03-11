import React, { useState } from "react";
import UserCard from "./components/UserCard";
import GenericList from "./components/GenericList";
import Calculator from "./components/Calculator";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

type Product = {
  id: number;
  name: string;
  price: number;
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"UserCard" | "GenericList" | "Calculator" | "Shopping">("UserCard");
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const checkout = () => {
    alert("Thanh toán thành công!");
    setCart([]); // Xóa giỏ hàng sau khi thanh toán
  };

  // Danh sách chuỗi
  const names = ["Alice", "Bob", "Charlie"];

  // Danh sách đối tượng
  const users = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
  ];

  return (
    <div className="p-8 flex flex-col items-center space-y-6">
      {/* Tabs chuyển đổi */}
      <div className="flex space-x-4">
        {["UserCard", "GenericList", "Calculator", "Shopping"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Hiển thị nội dung theo tab */}
      {activeTab === "UserCard" && (
        <div className="flex space-x-4">
          <UserCard name="Nguyễn Văn A" age={25} isAdmin={true} />
          <UserCard name="Trần Thị B" age={30} isAdmin={false} />
        </div>
      )}

      {activeTab === "GenericList" && (
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold">👾 Generic List Example</h1>
          <GenericList
            items={names}
            renderItem={(name) => <span className="text-blue-500">{name}</span>}
          />
          <GenericList
            items={users}
            renderItem={(user) => (
              <div>
                <strong>{user.name}</strong> - {user.age} tuổi
              </div>
            )}
          />
        </div>
      )}

      {activeTab === "Calculator" && (
        <div className="w-full max-w-md">
          <Calculator />
        </div>
      )}

      {activeTab === "Shopping" && (
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center">🛍️ Mua Sắm Online</h1>
          <ProductList addToCart={addToCart} />
          <Cart cart={cart} checkout={checkout} />
        </div>
      )}
    </div>
  );
};

export default App;