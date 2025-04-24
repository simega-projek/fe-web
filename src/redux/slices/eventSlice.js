import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "events",
  initialState: {
    data: [],
    pagination: {},
  },
  reducers: {
    setPageEvent: (state, action) => {
      state.pagination = action.payload;
    },

    setDataEvent: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default eventSlice.reducer;
export const { setPageEvent, setDataEvent } = eventSlice.actions;
