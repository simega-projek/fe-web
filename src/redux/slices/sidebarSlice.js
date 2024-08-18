import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    status: true,
  },
  reducers: {
    setIsSidebar: (state, action) => {
      state.status = action.payload;
    },
  },
});

export default sidebarSlice.reducer;
export const { setIsSidebar } = sidebarSlice.actions;
