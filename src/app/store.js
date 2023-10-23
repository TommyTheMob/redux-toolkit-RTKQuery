import {configureStore} from "@reduxjs/toolkit";
import { counterSlice } from "../featurs/counter/counterSlice.js";
import {postsSlice} from "../featurs/posts/postsSlice.js";
import {usersSlice} from "../featurs/users/usersSlice.js";
import {notificationsSlice} from "../featurs/notifications/notificationsSlice.js";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        posts: postsSlice.reducer,
        users: usersSlice.reducer,
        notifications: notificationsSlice.reducer,
    }
})