import { createSlice } from "@reduxjs/toolkit";

const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    page: {},
  },
  reducers: {
    setIsPages: (state, action) => {
      state.page = action.payload;
    },
  },
});

export default pagesSlice.reducer;
export const { setIsPages } = pagesSlice.actions;
