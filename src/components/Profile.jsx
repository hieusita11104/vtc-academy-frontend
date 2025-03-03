import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();

  return (
    <div className="text-center">
      <h1>👤 Profile Page</h1>
      <p>Welcome, <strong>{username}</strong>!</p>
    </div>
  );
};
export default Profile;
