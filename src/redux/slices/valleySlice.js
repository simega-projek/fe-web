import { createSlice } from "@reduxjs/toolkit";

const valleySlice = createSlice({
  name: "valley",
  initialState: {
    data: [],
    pagination: {},
  },
  reducers: {
    setPageValley: (state, action) => {
      state.pagination = action.payload;
    },
    setDataValley: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default valleySlice.reducer;
export const { setPageValley, setDataValley } = valleySlice.actions;
