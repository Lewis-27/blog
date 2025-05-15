import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import PostSmall from './PostSmall'

import { useGetLimitedRecentPostsMutation } from '../slices/postsApiSlice'

const RecentPosts = () => {
  const [getLimitedRecentPostsApiCall] = useGetLimitedRecentPostsMutation();

  const [posts, setPosts] = useState('')

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getLimitedRecentPostsApiCall('limit=3').unwrap()
      setPosts(res.posts)
      setIsLoading(false);
    }

    fetchPosts();
  }, []);
  return (
    <div className='w-full text-xl lg:px-32 py-8'>
      <div className="flex justify-between items-center h-16 px-4 lg:px-16 ">
        <h1 className='text-2xl'>Recent posts:</h1>
        <Link to='/posts' className=' bg-blue-500 text-white px-1 py-2 rounded-lg w-36 text-center'>View all posts</Link>
      </div>
      <div className="flex flex-col w-full h-full justify-evenly items-center gap-8 px-4 lg:px-16">
        {
          (isLoading) 
          ? <h1>Loading</h1>
          : posts.map((post) => {
          return <PostSmall key={post._id} postData={post}/>
          })
        }
      </div>
    </div>
  )
}

export default RecentPosts
