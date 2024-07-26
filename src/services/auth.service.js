import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const authLogin = async (username, password) => {
  try {
    const res = await axios.post("https://fakestoreapi.com/auth/login", {
      username,
      password,
    });
    return res.data.token;
  } catch (err) {}
};

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const payload = (token) => {
  const data = jwtDecode(token);
  return data;
};
