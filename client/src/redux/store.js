import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./features/userSlice"

export const store = configureStore({
    reducer: {
        user:userReduser
    },
})

