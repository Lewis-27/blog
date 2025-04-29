import { apiSlice } from "./apiSlice";

const POSTS_URL = '/api/posts'

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.mutation({
      query: () => ({
        url: `${POSTS_URL}`,
        method: 'GET'
      })
    }),
    getLimitedPosts: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}?limit=${data}`,
        method: 'GET'
      })
    }),
    getRecentPosts: builder.mutation({
      query: () => ({
        url: `${POSTS_URL}/recent`,
        method: 'GET'
      })
    }),
    getLimitedRecentPosts: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/recent?limit=${data}`,
        method: 'GET'
      })
    }),
    getPost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: 'GET'
      })
    })
  })
})

export const {useGetAllPostsMutation, useGetLimitedPostsMutation, useGetRecentPostsMutation, useGetLimitedRecentPostsMutation, useGetPostMutation} = postsApiSlice