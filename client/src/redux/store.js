import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./features/userSlice";
import memoReduser from "./features/memoSlice";

export const store = configureStore({
  reducer: {
    user: userReduser,
    memo: memoReduser,
  },
});
