import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import CreatePostForm from '../components/CreatePostForm';

const CreatePostScreen = () => {
  const {userInfo} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo])

  

  return (
    <div className='w-full h-180 flex flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl'>Create new post</h1>
      
      {userInfo ? <CreatePostForm /> : <></>}
        
    </div>
  )
}

export default CreatePostScreen
