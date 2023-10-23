import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://sqfns3-8000.csb.app'}),
    tagTypes: ['Post'],
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            providesTags: ['Post']
        }),
        getSinglePost: builder.query({
            query: (postId) => `/posts?id=${postId}`
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: ['Post']
        })
    })
})

export const { useGetPostsQuery, useGetSinglePostQuery, useAddNewPostMutation } = apiSlice