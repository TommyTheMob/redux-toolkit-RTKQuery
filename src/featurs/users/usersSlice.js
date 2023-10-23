import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

// const initialState = [
//     { id: 0, name: 'Tianna Jenkins' },
//     { id: 1, name: 'Kevin Grant' },
//     { id: 2, name: 'Madison Price' }
// ]

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('https://8gk4w7-8080.csb.app/users')
    return response.json()
})

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const selectAllUsers = state => state.users
export const selectUserById = (state, userId) => state.users.find(user => user.id === userId)