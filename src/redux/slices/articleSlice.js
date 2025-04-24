import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "articles",
  initialState: {
    data: [],
    pagination: {},
  },
  reducers: {
    setPageArticle: (state, action) => {
      state.pagination = action.payload;
    },
    setDataArticle: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default articleSlice.reducer;
export const { setPageArticle, setDataArticle } = articleSlice.actions;
