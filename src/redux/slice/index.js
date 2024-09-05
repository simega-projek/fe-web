import { combineReducers } from "redux";
import authSlice from "./authSlice";
import asideSlice from "./asideSlice";

export default combineReducers({
  auth: authSlice,
  aside: asideSlice,
});
