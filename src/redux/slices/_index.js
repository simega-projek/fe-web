import { combineReducers } from "redux";
import authSlice from "./authSlice";
import sidebarSlice from "./sidebarSlice";
import pagesSlice from "./pagesSlice";

export default combineReducers({
  sidebar: sidebarSlice,
  auth: authSlice,
  pages: pagesSlice,
});
