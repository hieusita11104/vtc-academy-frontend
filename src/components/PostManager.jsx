import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const PostManager = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setPosts(res.data.slice(0, 5)));
  }, []);

  const addPost = () => {
    axios.post(API_URL, { title: newPost })
      .then(res => setPosts([...posts, res.data]));
    setNewPost("");
  };

  const deletePost = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setPosts(posts.filter(post => post.id !== id)));
  };

  return (
    <div>
      <h2>Post Manager</h2>
      <input 
        value={newPost} 
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Enter post title"
      />
      <button onClick={addPost}>Add Post</button>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.title} 
            <button onClick={() => deletePost(post.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostManager;
