import { createSlice } from "@reduxjs/toolkit";

const objectSlice = createSlice({
  name: "objects",
  initialState: {
    data: [],
    pagination: {},
  },
  reducers: {
    setIsPageObject: (state, action) => {
      state.pagination = action.payload;
    },
    setIsDataObject: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default objectSlice.reducer;
export const { setIsPageObject, setIsDataObject } = objectSlice.actions;
