import { combineReducers } from "redux";
import authSlice from "./authSlice";
import sidebarSlice from "./sidebarSlice";
import pagesSlice from "./pagesSlice";
import megalithSlice from "./megalithSlice";
import articleSlice from "./articleSlice";
import eventSlice from "./eventSlice";
import siteSlice from "./siteSlice";
import valleySlice from "./valleySlice";
import categorySlice from "./categorySlice";

export default combineReducers({
  sidebar: sidebarSlice,
  auth: authSlice,
  pages: pagesSlice,
  megalith: megalithSlice,
  articles: articleSlice,
  events: eventSlice,
  site: siteSlice,
  valley: valleySlice,
  category: categorySlice,
});
