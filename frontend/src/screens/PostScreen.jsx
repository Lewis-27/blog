import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useGetPostMutation} from '../slices/postsApiSlice'

import PostLarge from '../components/PostLarge'

const PostScreen = () => {
  const [getPostApiCall] = useGetPostMutation();
  const {postId} = useParams();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      const res = await getPostApiCall(postId).unwrap();
      setPost(res)
      setIsLoading(false);
    }
    getPost();
  }, [isLoading])

  

  return (
    <div className='w-full h-180 flex items-center justify-center py-16'>
      {(isLoading ? <></> : <PostLarge postData={post}/> )}
    </div>
  )
}

export default PostScreen
