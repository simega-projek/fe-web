import { createSlice } from "@reduxjs/toolkit";

export const asideSlice = createSlice({
  name: "aside",
  initialState: {
    isSidebarOpen: true,
  },
  reducers: {
    setIsSidebarOpen: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export default asideSlice.reducer;
export const { setIsSidebarOpen } = asideSlice.actions;
