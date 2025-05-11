import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import EditPostForm from '../components/EditPostForm';



const EditPostScreen = () => {
  const {userInfo} = useSelector((state) => state.auth);
  //const postId = useParams().postId;
  
  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo])

  

  return (
    <div className='w-full min-h-180 flex flex-col items-center justify-center gap-4 pb-8'>
      <h1 className='text-4xl'>Create new post</h1>
      
      {userInfo ? <EditPostForm  /> : <></>}
        
    </div>
  )
}

export default EditPostScreen
