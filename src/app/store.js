import {configureStore} from "@reduxjs/toolkit";
import { counterSlice } from "../featurs/counter/counterSlice.js";
import {postsSlice} from "../featurs/posts/postsSlice.js";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        posts: postsSlice.reducer,
    }
})