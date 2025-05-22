import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {FaPlus} from 'react-icons/fa'
import { useGetUserPostsMutation } from '../slices/postsApiSlice'
import { useState, useEffect } from 'react'
import PostSmall from '../components/PostSmall'

const WelcomeBanner = () => {
  const {userInfo} = useSelector((state) => state.auth)

  const [getUserPostsApiCall] = useGetUserPostsMutation();

  const [recentPost, setRecentPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecentPost = async () => {
      console.log(userInfo._id)
      const res = await getUserPostsApiCall({
        userId: userInfo._id,
        query: 'limit=1&sort=desc',
      }).unwrap();
      setRecentPost(res[0]);
      setIsLoading(false);
    }
    getRecentPost();
  }, [])

  return (
    <div className='w-full flex flex-col lg:flex-row items-center justify-evenly min-h-128 text-xl'>
      <div className="flex flex-col gap-4 items-center justify-center min-h-100">
        <h1 className="text-3xl">Welcome {userInfo.name}</h1>
        <p className="">Ready to share your ideas?</p>
        <Link to='/newPost' className='bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition duration-200'>
          <div className="flex gap-1 items-center">
            <FaPlus className='text-sm'/>
            <div className="">Create new post</div>
          </div>
          
        </Link>
      </div>
      {isLoading ? <h1>Loading...</h1> : <></>}
      {(!isLoading && recentPost) ? <div className='w-full px-4 lg:w-1/2 lg:px-0 flex flex-col gap-4 items-center justify-center'>
        <h2>Your latest post</h2>
        <PostSmall postData={recentPost}/></div> : <></>
        // <div className="w-1/2 flex flex-col gap-4 items-center justify-center">
        
        // <div className="flex flex-col">
        //   <h1>It looks like you havent made any posts</h1>
        // </div> 
        
      // </div>
      }
      
    </div>
  )
}

export default WelcomeBanner
