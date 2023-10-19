import {createSlice} from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: 'users',
    initialState: [
        { id: '0', name: 'Tianna Jenkins' },
        { id: '1', name: 'Kevin Grant' },
        { id: '2', name: 'Madison Price' }
    ],
    reducers: {}
})