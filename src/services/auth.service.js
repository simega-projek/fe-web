import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const authLogin = async (username, password) => {
  try {
    const res = await axios.post("http://34.101.227.131:8000/login", {
      username,
      password,
    });
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const payload = (token) => {
  const data = jwtDecode(token);
  return data;
};
