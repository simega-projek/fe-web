import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    isLoading: false,
    isError: null,
    isSuccess: false,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.userData = action.payload;
      state.isError = null;
      state.isSuccess = true;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.isError = action.payload;
    },
    setProfile: (state, action) => {
      state.userData = action.payload;
    },

    logout: (state) => {
      state.userData = null;
      state.isSuccess = false;
      localStorage.removeItem("token");
    },
  },
});

export default authSlice.reducer;
export const { setAuthData, setIsLoading, setError, logout } =
  authSlice.actions;
