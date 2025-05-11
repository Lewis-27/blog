import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useGetPostMutation} from '../slices/postsApiSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import PostLarge from '../components/PostLarge'

const PostScreen = () => {
  const [getPostApiCall] = useGetPostMutation();
  const {postId} = useParams();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await getPostApiCall(postId).unwrap();
      setPost(res)
      setIsLoading(false);
      } catch (error) {
        toast.error('Post not found')
        navigate('/')
      }
      
    }
    getPost();
  }, [isLoading])

  

  return (
    <div className='w-full min-h-180 flex items-center justify-center py-16'>
      {(isLoading ? <></> : <PostLarge postData={post}/> )}
    </div>
  )
}

export default PostScreen
