import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Đảm bảo luôn có mảng rỗng
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      console.log("Adding product:", action.payload); // Kiểm tra đầu vào
      state.items.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
