import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import { useGetUserMutation,  } from '../slices/usersApiSlice';
import { useGetUserPostsMutation } from '../slices/postsApiSlice';

import PostsUserProfile from '../components/PostsUserProfile'

const UserProfileScreen = () => {
  const userId = useParams().id;

  const [name, setName] = useState('');

  const [getUserApiCall] = useGetUserMutation();
  const [getUserPostsApiCall] = useGetUserPostsMutation();

  const scrollTopRef = useRef();


  useEffect(() => {
    const getName = async () => {
      const res = await getUserApiCall(userId).unwrap();
      setName(res.name);
    }
    getName()
  }, [])

  const scrollTop = () => {
    scrollTopRef.current.scrollIntoView()
  }

  return (
    <div ref={scrollTopRef} className=' mb-2 min-h-140 flex flex-col items-center justify-center gap-4 mx-28 scroll-m-16 '>
      <h1 className='text-2xl self-start'>Posts by {name}:</h1>
      <PostsUserProfile userId={userId} scrollTop={scrollTop} className=''/>
    </div>
  )
}

export default UserProfileScreen
