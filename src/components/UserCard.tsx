import React from "react";

interface UserProps {
  name: string;
  age: number;
  isAdmin: boolean;
}

const UserCard: React.FC<UserProps> = ({ name, age, isAdmin }) => {
  return (
    <div className="border p-4 rounded-md shadow-md w-64 bg-white">
      <h2 className="text-lg font-bold">{name}</h2>
      <p>Tuổi: {age}</p>
      <p className={isAdmin ? "text-green-600" : "text-gray-600"}>
        {isAdmin ? "Quản trị viên" : "Người dùng"}
      </p>
    </div>
  );
};

export default UserCard;
