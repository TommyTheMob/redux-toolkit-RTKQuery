import {createSlice, nanoid} from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: 'posts',
    initialState: [
        {
            id: '1',
            date: '2023-10-19T19:48:32.581Z',
            title: 'First Post!',
            content: 'Hello!',
            user: '1',
            reactions: {thumbsUp: 2, hooray: 1, heart: 2, rocket: 100, eyes: 50}
        },
        {
            id: '2',
            date: '2023-10-19T19:48:47.988Z',
            title: 'Second Post',
            content: 'More text',
            user: '2',
            reactions: {thumbsUp: 3, hooray: 40, heart: 30, rocket: 120, eyes: 110}
        }
    ],
    reducers: {
        addPost: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: (title, content, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
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
        },
        addReaction: {
            reducer: (state, action) => {
                const post = state.find(post => post.id === action.payload.id)

                post.reactions[action.payload.reaction]++
            },
            prepare: (id, reaction) => {
                return {
                    payload: {
                        id, reaction
                    }
                }
            }
        }
    }
})

export const {addPost, editPost, addReaction} = postsSlice.actions