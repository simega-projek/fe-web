import { configureStore } from "@reduxjs/toolkit";
import slice from "./slices/_index";

const store = configureStore({
  reducer: slice,
});

// console.log("oncreate store :", store.getState());

// store.subscribe(() => console.log("store change: ", store.getState()));
export default store;
