import React from 'react'
import { useState, useEffect } from 'react'

import { useGetUserMutation } from '../slices/usersApiSlice'

const Post = ({postData}) => {
  const {title, body, tags, userId} = {...postData}
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
    <div>
      <h1 className=''>{title}</h1>
      <h2 className="">By {author}</h2>
      <p className="">{body}</p>
      <ul>
        <li>{tags[0]}</li>
        <li>{tags[1]}</li>
      </ul>
    </div>
  )
}

export default Post
