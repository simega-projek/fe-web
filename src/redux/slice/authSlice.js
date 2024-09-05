import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../services/service";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, {
        username: user.username,
        password: user.password,
      });
      return res.data;
    } catch (err) {
      if (err.response) {
        const message = err.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  },
);

export const MeUser = createAsyncThunk("auth/MeUser", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/profile`);
    return res.data;
  } catch (err) {
    if (err.response) {
      const message = err.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.data.info;
    });

    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export default authSlice.reducer;

export const { reset } = authSlice.actions;
