import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    isLoading: true,
    articleData: [],
  },
  reducers: {
    setArticleData: (state, action) => {
      state.articleData = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default articleSlice.reducer;
export const { setArticleData, setIsLoading } = articleSlice.actions;
