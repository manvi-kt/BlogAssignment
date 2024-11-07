import { blogReducer } from "@/slices/blogSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
     blog:blogReducer
    } 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
