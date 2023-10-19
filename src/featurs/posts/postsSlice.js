import {createSlice, nanoid} from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: 'posts',
    initialState: [
        {id: '1', title: 'First Post!', content: 'Hello!'},
        {id: '2', title: 'Second Post', content: 'More text'}
    ],
    reducers: {
        addPost: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: (title, content) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content
                    }
                }
            }
        },
        editPost: {
            reducer: (state, action) => {
                const post = state.find(post => post.id === action.payload.id)

                post.title = action.payload.title
                post.content = action.payload.content
            },
            prepare: (id, title, content) => {
                return {
                    payload: {
                        id, title, content
                    }
                }
            }
        }
    }
})

export const {addPost, editPost} = postsSlice.actions