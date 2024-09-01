import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: [],
    isLoading: false,
    isError: null,
    isSuccess: false,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.authData.push(action.payload);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setAuthData, setIsLoading } = authSlice.actions;
