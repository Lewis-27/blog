import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import { useGetUserMutation,  } from '../slices/usersApiSlice';
import { useGetUserPostsMutation } from '../slices/postsApiSlice';
import { useNavigate } from 'react-router-dom';

import PostsUserProfile from '../components/PostsUserProfile'

import UserBanner from '../components/UserBanner';

const UserProfileScreen = () => {
  const navigate = useNavigate();

  const userId = useParams().id;

  const [name, setName] = useState('');
  const [colour, setColour] = useState('');

  const [getUserApiCall] = useGetUserMutation();
  const [getUserPostsApiCall] = useGetUserPostsMutation();


  const scrollTopRef = useRef();


  useEffect(() => {
    const getName = async () => {
      const res = await getUserApiCall(userId).unwrap();
      setName(res.name);
      setColour(res.colour);
    }
    getName()
  }, [])

  const scrollTop = () => {
    scrollTopRef.current.scrollIntoView({behavior: 'smooth'})
  }

  useEffect(() => {
    scrollTop()
  }, [navigate])

  return (
    <div ref={scrollTopRef} className='mb-2 min-h-140 flex flex-col items-center justify-center gap-4 mx-28 scroll-m-16 '>
      <UserBanner userColour={colour}/>
      <h1 className='text-2xl self-start'>Posts by {name}:</h1>
      <PostsUserProfile userId={userId} scrollTop={scrollTop} className=''/>
    </div>
  )
}

export default UserProfileScreen
