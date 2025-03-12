import { createSlice } from "@reduxjs/toolkit";

const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    page: {},
    valleyName: "",
  },
  reducers: {
    setIsPages: (state, action) => {
      state.page = action.payload;
    },
    setIsID: (state, action) => {
      state.ID = action.payload;
    },
  },
});

export default pagesSlice.reducer;
export const { setIsPages, setIsID } = pagesSlice.actions;
