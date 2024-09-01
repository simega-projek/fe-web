import { combineReducers } from "redux";
import sidebarSlice from "./sidebarSlice";
import megalitSlice from "./megalitSlice";
import articleSlice from "./articleSlice";
import authSlice from "./authSlice";

export default combineReducers({
  sidebar: sidebarSlice,
  megalit: megalitSlice,
  article: articleSlice,
  auth: authSlice,
});
