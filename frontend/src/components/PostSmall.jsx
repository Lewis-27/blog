import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useGetUserMutation } from '../slices/usersApiSlice'

const PostSmall = ({postData}) => {
  const {_id, title, body, tags, userId} = {...postData}
  const [author, setAuthor] = useState('');

  const [getUserApiCall] = useGetUserMutation(userId);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const res = await getUserApiCall(userId).unwrap();
        setAuthor(res.name);
      } catch (error) {
        console.log(error)
      }
    }
    getAuthor()
  }, [])

  

  return (
    <div className='border border-gray-400 shadow-lg w-full flex flex-col items-start justify-around py-4 px-4 rounded-lg'>
      <div className="flex gap-2 items-center">
        <h1 className='capitalize '>{title}</h1>
        <div className="flex gap-1 items-center">
          <h2 className="">- by</h2>
          <Link to={`/users/${userId}`} className="hover:text-blue-500">{author}</Link>
        </div>
      </div>
      <hr className='w-full text-gray-400 my-2'/>
      <p className="min-h-20">{body}</p>
      <hr className='w-full text-gray-400 my-4'/>
      <div className="flex w-full items-center justify-between">
        <div className='flex items-center gap-4'>
          <h3>Tags: </h3>
          {tags.map((tag) => {
              return <div className="text-lg rounded-lg outline-dashed outline outline-gray-400 px-2 py-1">{tag}</div>
            })}
        </div>
        <Link to={`/posts/${_id}`} className='px-4 py-2 bg-blue-500 text-white rounded-md'>View Post</Link>
      </div>
      

    </div>
  )
}

export default PostSmall
