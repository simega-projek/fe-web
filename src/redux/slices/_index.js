import { combineReducers } from "redux";
import authSlice from "./authSlice";
import sidebarSlice from "./sidebarSlice";

export default combineReducers({
  sidebar: sidebarSlice,
  auth: authSlice,
});
