import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../app/postsSlice";

const PostList = () => {
  const dispatch = useDispatch();

  // ✅ Kiểm tra toàn bộ state trong Redux Store
  const fullState = useSelector((state) => state);
  console.log("Redux State:", fullState);

  // ✅ Lấy dữ liệu từ state.posts
  const postsState = useSelector((state) => state.posts || {}); // 🛠 Tránh lỗi undefined
  const postsData = postsState.data || []; // 🛠 Nếu `data` undefined, gán []
  const status = postsState.status || "idle";
  const error = postsState.error || null;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Posts</h2>
      {postsData.length > 0 ? (
        <ul>
          {postsData.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
