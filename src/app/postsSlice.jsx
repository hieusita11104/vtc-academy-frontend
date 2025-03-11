import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🛠️ Action để fetch dữ liệu từ API
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched Posts:", data); // ✅ Debug log để kiểm tra dữ liệu

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return rejectWithValue(error.message);
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: [], 
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.length > 0 ? action.payload : [];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch posts";
      });
  },
});

export default postsSlice.reducer;
