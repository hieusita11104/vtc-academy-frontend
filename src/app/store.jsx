import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import postsReducer from "./postsSlice";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    posts: postsReducer,
    counter: counterReducer,
  },
});

export default store;
