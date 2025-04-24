import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    pagination: {},
  },
  reducers: {
    setPageCategory: (state, action) => {
      state.pagination = action.payload;
    },
    setDataCategory: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default categorySlice.reducer;
export const { setPageCategory, setDataCategory } = categorySlice.actions;
