import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import UserIconSmall from './UserIconSmall'

import { useGetUserMutation } from '../slices/usersApiSlice'

const PostExtraSmall = ({postData, edited}) => {
  const {_id, title, body, tags, userId} = {...postData}
  const [author, setAuthor] = useState('');
  const [userColour, setUserColour] = useState('');

  const [getUserApiCall] = useGetUserMutation(userId);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const res = await getUserApiCall(userId).unwrap();
        setAuthor(res.name);
        setUserColour(res.colour);
      } catch (error) {
        console.log(error)
      }
    }
    getAuthor()
  }, [])

  useEffect(() => {
    const getUserColour = async () => {
      try {
        const res = await getUserApiCall(userId).unwrap();
        setUserColour(res.colour)
      } catch (error) {
        console.log(error)
      }
    }
    getUserColour()
    const getAuthor = async () => {
      try {
        const res = await getUserApiCall(userId).unwrap();
        setAuthor(res.name);
        setUserColour(res.colour);
      } catch (error) {
        console.log(error)
      }
    }
    getAuthor()
  }, [edited])

  

  return (
    <div className='border border-gray-400 shadow-lg w-full flex flex-col items-start justify-around pt-4 pb-2 px-4 rounded-lg'>
      <div className="flex gap-1 items-center flex-wrap">
      <Link to={`/posts/${_id}`} className='hover:text-blue-500 transition duration-300'>{title}</Link>
        <div className="flex gap-1 items-center ">
          <h2 className="">- by</h2>
          <Link to={`/users/${userId}`} className="hover:text-blue-500 flex items-center gap-1">
            <UserIconSmall userColour={userColour} /> 
            {author}
          </Link>
        </div>
      </div>
      <hr className='w-full text-gray-400 my-2'/>
      <div className="flex w-full items-center gap-2">
          <div className="flex items-center gap-2 flex-wrap p-2 min-h-14 grow">
          <h3>Tags: </h3>
            {tags.map((tag) => {
              return <div key={tags.indexOf(tag)} className="text-lg rounded-lg outline-dashed outline outline-gray-400 px-2 py-1 max-h-10 text-nowrap">{tag}</div>
            })}

          </div>
      </div>
      <hr className='w-full text-gray-400 my-2'/>
      <Link to={`/posts/${_id}`} className='px-4 py-2 bg-blue-500 text-white rounded-md text-nowrap self-end'>View Post</Link>
      {/* <Link to={`/posts/${_id}`} className='text-blue-500 text-nowrap self-end hover:text-blue-700 transition duration-300'>View Post</Link> */}
      

    </div>
  )
}

export default PostExtraSmall
