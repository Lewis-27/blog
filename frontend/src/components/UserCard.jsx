import React from 'react'
import { useGetUserPostsMutation } from '../slices/postsApiSlice'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserIconSmall from './UserIconSmall'


const UserCard = ({user}) => {
  const {_id, name, email, colour} = user

  const [getUserPostsApiCall] = useGetUserPostsMutation();
  const [totalPosts, setTotalPosts] = useState(0);


  useEffect(() => {
    const getTotalPosts = async () => {
      const res = await getUserPostsApiCall({userId: _id}).unwrap();
      setTotalPosts(res.length);
    };
    getTotalPosts();
  }, [])

  return (
    <div className='w-full flex items-center justify-between gap-4 rounded-lg border px-2 py-2 '>
      <div className="flex items-center gap-2">
        <UserIconSmall userColour={colour}/>
        <h1 className='font-semibold text-lg'>{name}</h1>
      </div>
      <div className="flex gap-4 items-center">
        <h2 className='text-gray-500'>posts: {totalPosts}</h2>
        <Link to={`/users/${_id}`} className='px-2 py-2 bg-blue-500 text-white rounded-lg'>View posts</Link>
      </div>
      
    </div>
  )
}

export default UserCard
