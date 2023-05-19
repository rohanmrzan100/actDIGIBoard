import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./slice/toggleSlice";

export const store = configureStore({
  reducer: {
    toggle:toggleSlice
  },
});
