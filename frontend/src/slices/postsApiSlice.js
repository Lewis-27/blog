import { apiSlice } from "./apiSlice";

const POSTS_URL = '/api/posts'

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.mutation({
      query: (query) => ({
        url: `${POSTS_URL}?${query}`,
        method: 'GET'
      })
    }),
    // getLimitedPosts: builder.mutation({
    //   query: (data) => ({
    //     url: `${POSTS_URL}?limit=${data}`,
    //     method: 'GET'
    //   })
    // }),
    getRecentPosts: builder.mutation({
      query: () => ({
        url: `${POSTS_URL}/recent`,
        method: 'GET'
      })
    }),
    getLimitedRecentPosts: builder.mutation({
      query: (query) => ({
        url: `${POSTS_URL}/recent?${query}`,
        method: 'GET'
      })
    }),
    getPost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: 'GET'
      })
    }),
    getUserPosts: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/user/${data.userId}?${data.query}`,
        method: 'GET'
      })
    }),
    createNewPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: 'POST',
        body: data
      })
    }),
    editPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.postId}`,
        method: 'PUT',
        body: data.body
      })
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: 'DELETE',
      })
    })
  })
})

export const {
  useGetAllPostsMutation, 
  useGetLimitedPostsMutation, 
  useGetRecentPostsMutation, 
  useGetLimitedRecentPostsMutation, 
  useGetPostMutation, 
  useGetUserPostsMutation,
  useCreateNewPostMutation,
  useEditPostMutation,
  useDeletePostMutation
} = postsApiSlice