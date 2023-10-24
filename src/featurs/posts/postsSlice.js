import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";

const postsAdapter = createEntityAdapter()

const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch('https://sqfns3-3000.csb.app/posts')
    return response.json()
})

export const addPostToServer = createAsyncThunk('posts/addPostToServer', async (args) => {
    const { titleValue: title, contentValue: content, userId } = args

    const newPost = {
        date: new Date().toISOString(),
        title,
        content,
        user: userId,
        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
    }

    const response = await fetch('https://sqfns3-3000.csb.app/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })

    return response.json()
})

export const editPostThroughServer = createAsyncThunk('posts/editPostThroughServer', async (args) => {
    const { postId, title, content } = args

    const response = await fetch(`https://sqfns3-3000.csb.app/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
            title
        })
    })

    return response.json()
})

export const addReactionThroughServer = createAsyncThunk(
    'posts/addReactionThroughServer',
    async (args, {getState}) => {
        const { postId, name } = args

        const post = getState().posts.posts.find(post => post.id === postId)

        const reactions = Object.entries(post.reactions).map(([reaction, value]) => reaction === name
            ? [reaction, value + 1]
            : [reaction, value]
        )

        let updatedReactions = {}
        reactions.forEach(([reaction, value]) => {
            updatedReactions[reaction] = value
        })

        const response = await fetch(`https://sqfns3-3000.csb.app/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reactions: updatedReactions
            })
        })

        return response.json()
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addPostToServer.fulfilled, (state, action) => {
                state.posts.push(action.payload)
            })
            .addCase(editPostThroughServer.fulfilled, (state, action) => {
                state.posts = state.posts.map(post => post.id === action.payload.id ? action.payload : post)
            })
            .addCase(addReactionThroughServer.fulfilled, (state, action) => {
                state.posts = state.posts.map(post => post.id === action.payload.id ? action.payload : post)
            })
    }
})

// export const selectAllPosts = (state) => state.posts.posts
//
// export const selectPostById = (state, postId) =>
//     state.posts.posts.find(post => post.id === postId)

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts)

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) =>  posts.filter(post => post.user === userId)
)