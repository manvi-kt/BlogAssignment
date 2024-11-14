import { blogReducer } from "@/slices/blogSlice";
import { configureStore } from "@reduxjs/toolkit";
import { LoggedReducer } from "@/slices/authSlice";

const store = configureStore({
    reducer: {
     blog:blogReducer,
     logged: LoggedReducer
    } 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
