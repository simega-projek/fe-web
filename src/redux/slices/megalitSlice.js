import { createSlice } from "@reduxjs/toolkit";

const megalitSlice = createSlice({
  name: "megalit",
  initialState: {
    isLoading: true,
    megalitData: [],
  },
  reducers: {
    setMegalitData: (state, action) => {
      state.megalitData = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default megalitSlice.reducer;
export const { setMegalitData, setIsLoading } = megalitSlice.actions;
