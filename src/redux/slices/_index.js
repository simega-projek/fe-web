import { combineReducers } from "redux";
import sidebarSlice from "./sidebarSlice";
import megalitSlice from "./megalitSlice";
import articleSlice from "./articleSlice";

export default combineReducers({
  sidebar: sidebarSlice,
  megalit: megalitSlice,
  article: articleSlice,
});
