import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import candidatesSlice from "./slices/candidatesSlice";

const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        cadidates:candidatesSlice.reducer
    }
})

export default store