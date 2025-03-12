import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    status: true,
    scroll: false,
    pathname: "",
  },
  reducers: {
    setIsSidebar: (state, action) => {
      state.status = action.payload;
    },
    setIsScroll: (state, action) => {
      state.scroll = action.payload;
    },
    setIsPathname: (state, action) => {
      state.pathname = action.payload;
    },
  },
});

export default sidebarSlice.reducer;
export const { setIsSidebar, setIsScroll, setIsPathname } =
  sidebarSlice.actions;
