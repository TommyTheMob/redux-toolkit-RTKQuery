import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {store} from "./app/store.js";
import {Provider} from "react-redux";
import {fetchNotifications} from "./featurs/notifications/notificationsSlice.js";
import {extendedApiSlice} from "./featurs/users/usersSlice.js";

store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())
store.dispatch(fetchNotifications())

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App/>
    </Provider>
)
