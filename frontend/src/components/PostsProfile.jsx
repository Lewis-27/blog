import React from 'react'
import { useGetUserPostsMutation } from '../slices/postsApiSlice'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostExtraSmall from '../components/PostExtraSmall';
import { Link } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa'


const PostsProfile = () => {
  const {userInfo} = useSelector((state) => state.auth);

  const userId = userInfo._id

  const [posts, setPosts] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [getUserPostsApiCall] = useGetUserPostsMutation();

  useEffect(() => {
    const getPosts = async () => {
      const res = await getUserPostsApiCall({
        userId,
        query: 'sort=desc'
      }).unwrap();
      setPosts(res);
      setIsLoading(false);
    }
    getPosts();
  }, [])


  return (
    <>
      <h1 className='text-3xl mb-4'>Your posts:</h1>
      <div className='w-full flex flex-col gap-4 h-128 justify-center items-center' >
        {isLoading ? <h1>Loading</h1> : posts.map((post) => <PostExtraSmall key={post._id} postData={post}/>)}
        {(!isLoading && posts.length === 0) ? <h1>No posts found</h1> : <></>}
        <Link to='/newPost' className='bg-blue-500 text-white py-2 px-8 rounded-full hover:bg-blue-700 transition duration-200'>
          <div className="flex gap-1 items-center">
            <FaPlus className='text-sm'/>
            <div className="">Create new post</div>
          </div>      
        </Link>
      </div>    
    </>

  )
}

export default PostsProfile
