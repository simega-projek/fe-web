import { createSlice } from "@reduxjs/toolkit";

const megalithSlice = createSlice({
  name: "megalith",
  initialState: {
    data: [],
    pagination: {},
  },
  reducers: {
    setPageMegalith: (state, action) => {
      state.pagination = action.payload;
    },
    setDataMegalith: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default megalithSlice.reducer;
export const { setPageMegalith, setDataMegalith } = megalithSlice.actions;
