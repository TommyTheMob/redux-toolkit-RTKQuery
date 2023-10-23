import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, {getState}) => {
        const allNotifications = selectAllNotifications(getState())

        let link
        if (allNotifications.length > 0) {
            const latestId = allNotifications[allNotifications.length - 1].id
            link = `https://sqfns3-3000.csb.app/notifications?_sort=id&_start=${latestId}&_end=1000`
        } else {
            link = `https://sqfns3-3000.csb.app/notifications?_sort=id`
        }

        const response = await fetch(link)

        return response.json()
    }
)

export const createNewNotify = createAsyncThunk(
    'notifications/createNewNotify',
    async (_, {getState}) => {
        const allNotifications = selectAllNotifications(getState())

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const newNotify = {
            "id": allNotifications.length + 1,
            "date": new Date().toISOString(),
            "message": "makes new notify!",
            "user": getRandomInt(1, 10)
        }

        const response = await fetch(`https://sqfns3-3000.csb.app/notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNotify)
        })

        return response.json()
    }
)

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
        status: 'idle',
        error: null
    },
    reducers: {
        allNotificationsRead: (state) => {
            state.notifications.forEach(notification => {
                notification.read = true
                notification.isNew = !notification.read
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.notifications.push(...action.payload)
                state.notifications.forEach(notification => {
                    notification.isNew = !notification.read
                })

            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(createNewNotify.fulfilled, (state, action) => {
                const newNotify = action.payload
                newNotify.isNew = !newNotify.read
                state.notifications.push(action.payload)
            })
    }
})

export const {allNotificationsRead} = notificationsSlice.actions

export const selectAllNotifications = state => state.notifications.notifications