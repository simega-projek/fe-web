import { configureStore } from "@reduxjs/toolkit";

import slice from "./slice";

export const store = configureStore({
  reducer: slice,
});

console.log("Oncreate store: ", store.getState());

store.subscribe(() => {
  console.log("Store change : ", store.getState());
});
