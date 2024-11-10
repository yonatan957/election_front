import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import candidatesSlice from "./slices/candidatesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        cadidates:candidatesSlice.reducer
    }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()