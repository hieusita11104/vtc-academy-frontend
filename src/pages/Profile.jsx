import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const Profile = () => {
  const { name } = useParams(); 
  const navigate = useNavigate(); 
  const [inputName, setInputName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim() !== "") {
      navigate(`/profile/${inputName.trim()}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">👤 Profile Page</h2>

      <p className="mt-4 text-lg">
        Welcome, <span className="font-semibold text-blue-500">{name}</span>!
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter a name..."
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg text-lg"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Go to Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
