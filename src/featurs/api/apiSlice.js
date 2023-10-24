import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://sqfns3-3000.csb.app'}),
    tagTypes: ['Post'],
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            providesTags: (result = [], error, arg) => [
                'Post',
                ...result.map(({ id }) => ({type: 'Post', id}))
            ]
        }),
        getSinglePost: builder.query({
            query: (postId) => `/posts?id=${postId}`,
            providesTags: (result, error, arg) => [{type: 'Post', id: arg}]
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: ['Post']
        }),
        editPost: builder.mutation({
            query: post => ({
                url: `/posts/${post.id}`,
                method: 'PATCH',
                body: post
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Post', id: arg.id}]
        }),
        addReaction: builder.mutation({
            query: ({postId, reactions}) => ({
                url: `/posts/${postId}`,
                method: 'PATCH',
                body: {
                    reactions: reactions
                }
            }),
            async onQueryStarted({postId, reactions}, {dispatch, queryFulfilled}) {
                const patchResults = dispatch(
                    apiSlice.util.updateQueryData('getPosts', undefined, draft => {
                        const post = draft.find(post => post.id === postId)
                        if (post) {
                            post.reactions = reactions
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResults.undo()
                }
            }
        })
    })
})

export const {useGetPostsQuery, useGetSinglePostQuery, useAddNewPostMutation, useEditPostMutation, useAddReactionMutation} = apiSlice