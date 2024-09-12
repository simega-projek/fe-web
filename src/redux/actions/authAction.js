import axios from "axios";
import { authLogin } from "../../services/auth.service";
import { setAuthData, setError, setIsLoading } from "../slices/authSlice";
import { getProfile } from "../../services/profile.service";

export const sliceAuthLogin = (username, password) => async (dispatch) => {
  if (!username || !password) {
    dispatch(setError("Username atau Password Tidak Boleh Kosong"));
    return;
  }
  try {
    dispatch(setIsLoading(true));
    const data = await authLogin(username, password);

    if (data && data.data && data.data.access_token) {
      localStorage.setItem("token", data.data.access_token);

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${data.data.access_token}`;

      dispatch(setAuthData(data.data));
      console.log({ data });
    } else {
      dispatch(setError("Login gagal. Cek username dan password Anda."));
    }
  } catch (err) {
    dispatch(setError("Username atau Password Salah"));
    throw new Error(err.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const sliceAuthLogout = () => async (dispatch) => {
  dispatch(setAuthData(null));
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
};

export const sliceAuthGetProfile = () => async (dispatch) => {
  try {
    const data = await getProfile();
    dispatch(setAuthData(data));
  } catch (err) {
    throw new Error(err.message);
  }
};
