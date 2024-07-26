import { useEffect, useState } from "react";
import { payload } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = payload(token);
      setUsername(data.user);
    } else {
      navigation("/login");
    }
  }, []);

  return username;
};
