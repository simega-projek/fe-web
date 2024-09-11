import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { sliceAuthGetProfile } from "../redux/actions/authAction";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataProfile = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!dataProfile && localStorage.getItem("token")) {
      dispatch(sliceAuthGetProfile());
    }
  });

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp < currentTime) {
            dispatch(logout()); // Dispatch logout action
            navigate("/admin/login");
          }
        } catch (error) {
          dispatch(logout()); // Dispatch logout action on error
          navigate("/admin/login");
        }
      } else if (dataProfile === null || !token) {
        try {
          dispatch(logout());
          navigate("/admin/login");
        } catch (error) {
          return null;
        }
      } else {
        navigate("/admin/login");
      }
    };

    checkTokenValidity();

    const intervalId = setInterval(checkTokenValidity, 60000);

    return () => clearInterval(intervalId);
  }, [dataProfile, navigate, dispatch]);

  return dataProfile;
};

// import { useEffect, useState } from "react";
// import { payload } from "../services/auth.service";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export const useLogin = () => {
//   const [dataUser, setDataUser] = useState([]);
//   const navigation = useNavigate();
//   const dataProfile = useSelector((state) => state.auth.userData);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setDataUser(dataProfile);
//     } else {
//       navigation("/admin/login");
//     }
//   }, []);

//   return dataUser;
// };
