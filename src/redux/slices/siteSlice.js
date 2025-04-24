import { createSlice } from "@reduxjs/toolkit";

const siteSlice = createSlice({
  name: "site",
  initialState: {
    data: [],
    pagination: {},
  },
  reducers: {
    setPageSite: (state, action) => {
      state.pagination = action.payload;
    },
    setDataSite: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default siteSlice.reducer;
export const { setPageSite, setDataSite } = siteSlice.actions;
