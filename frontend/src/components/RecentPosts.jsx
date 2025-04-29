import React from 'react'
import { useEffect, useState } from 'react'

import PostSmall from './PostSmall'

import { useGetLimitedRecentPostsMutation } from '../slices/postsApiSlice'

const RecentPosts = () => {
  const [getLimitedRecentPostsApiCall] = useGetLimitedRecentPostsMutation();

  const [posts, setPosts] = useState('')

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getLimitedRecentPostsApiCall(3).unwrap()
      setPosts(res.posts)
      setIsLoading(false);
    }

    fetchPosts();
  }, []);
  return (
    <div className='w-full text-xl px-32 py-8 '>
      <h1 className='px-16 pb-8'>Recent posts</h1>
      <div className="flex flex-col w-full h-full justify-evenly items-center gap-8 px-16">
        {
          (isLoading) 
          ? <h1>Loading</h1>
          : posts.map((post) => {
          return <PostSmall postData={post}/>
          })
        }

        {/* <PostSmall postData={{
          title: 'frontend post test',
          body: 'This is a test to design the look of posts on the blog site',
          tags: ['testing', 'frontend'],
          userId: '6802238e7a57b07caf5d7b94'
        }}/> */}
      </div>
    </div>
  )
}

export default RecentPosts
