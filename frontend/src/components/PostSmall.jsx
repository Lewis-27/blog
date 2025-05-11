import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useGetUserMutation } from '../slices/usersApiSlice'

const PostSmall = ({postData}) => {
  const {_id, title, body, tags, userId} = {...postData}
  const [author, setAuthor] = useState('');

  const [scrollHeight, setScrollHeight] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [overflow, setOverflow] = useState(false);

  const [getUserApiCall] = useGetUserMutation(userId);

  useEffect(() => {
    const getScrollHeight = () => {
      setScrollHeight(document.getElementById(`postBody_${_id}`).scrollHeight);
    }
    
    const getOffsetHeight = () => {
      setOffsetHeight(document.getElementById(`postBody_${_id}`).offsetHeight);
    }
    getScrollHeight();
    getOffsetHeight();
  })

  useEffect(() => {
    const getOverflow = () => {
      if(scrollHeight > offsetHeight) {
        setOverflow(true);
      } else {
        setOverflow(false);
      }
    }
    getOverflow();

  })

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
        <h1 className=' '>{title}</h1>
        <div className="flex gap-1 items-center">
          <h2 className="">- by</h2>
          <Link to={`/users/${userId}`} className="hover:text-blue-500">{author}</Link>
        </div>
      </div>
      <hr className='w-full text-gray-400 my-2'/>
      <div id={`postBody_${_id}`} className="items-center min-h-20 max-h-44 overflow-clip w-full">
        <p  className=" whitespace-pre-wrap w-full ">{body}</p>
      </div>
      {overflow ? <Link to={`/posts/${_id}`} className='text-blue-500 hover:text-blue-700'>View full post</Link> : <></>}
      <hr className='w-full text-gray-400 my-4'/>

      <div className="flex w-full items-center gap-2">
          <h3>Tags: </h3>
          <div className="flex items-center gap-2 overflow-x-scroll p-2 min-h-14 grow">
            {tags.map((tag) => {
                return <div key={tags.indexOf(tag)} className="text-lg rounded-lg outline-dashed outline outline-gray-400 px-2 py-1 max-h-10 text-nowrap">{tag}</div>
              })}  
          </div>
          
          <Link to={`/posts/${_id}`} className='px-4 py-2 bg-blue-500 text-white rounded-md text-nowrap '>View Post</Link>

      </div>
      

    </div>
  )
}

export default PostSmall
