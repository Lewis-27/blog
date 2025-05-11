import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetUserMutation } from '../slices/usersApiSlice'
import { useDeletePostMutation } from '../slices/postsApiSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const PostLarge = ({postData}) => {
  const currentUserId = useSelector((state) => state.auth.userInfo._id);
  const navigate = useNavigate();
  const {_id, title, body, tags, userId} = postData

  const [author, setAuthor] = useState('')
  const [postOwner, setPostOwner] = useState(false);


  const [getUserApiCall] = useGetUserMutation();
  const [deletePostApiCall] = useDeletePostMutation();
  
  useEffect(() => {
      const getAuthor = async () => {
        try {
          const res = await getUserApiCall(userId).unwrap();
          setAuthor(res.name);
        } catch (error) {
          console.log(error)
        }
        if(currentUserId === userId){
          setPostOwner(true);
        }
      }
      getAuthor()
    }, [])

    const deleteHandler = async() => {
      
      //const res = await deletePostApiCall(_id)
      if(confirm('Are you sure you want to delete this post?')){
        try {
          const res = await deletePostApiCall(_id);
          toast.success('Post deleted')
          navigate('/');
        } catch (error) {
          toast.error('Error deleting post')
        }
        
      }
    }
      
    //   try {
    //     if(confirm('Are you sure you want to delete this post?')){
    //       const res = await deletePostApiCall(_id)
    //       toast.success('Post deleted')
    //     }
    //   } catch (error) {
    //     console.log(error)
    //     toast.error('Error deleting post')
    //   }
      
    // }

  return (
    <div className='border border-gray-400 shadow-lg w-2/3 h-full flex flex-col items-start justify-around py-4 px-4 rounded-lg text-lg'>
      <div className="flex gap-2 items-center">
        <h1 className=' '>{title}</h1>
        <div className="flex gap-1 items-center">
          <h2 className="">- by</h2>
          <Link to={`/users/${userId}`} className="hover:text-blue-500">{author}</Link>
        </div>
      </div>
      <hr className='w-full text-gray-400 my-2'/>
      <p className="min-h-20 flex-grow whitespace-pre-wrap">{body}</p>
      <hr className='w-full text-gray-400 my-4'/>
      <div className="flex w-full items-center gap-2">
        
          <h3>Tags: </h3>
          <div className='flex items-center gap-4 overflow-x-scroll p-1'>
            {tags.map((tag) => {
              return <div className="text-lg rounded-lg outline-dashed outline outline-gray-400 px-2 py-1 text-nowrap">{tag}</div>
            })}
          </div>
          
        {postOwner ? <div className="flex items-center gap-4 text-nowrap">
          <Link to={`/posts/${_id}/edit`} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300'>Edit Post</Link>
          <button type="button" onClick={deleteHandler} className='bg-red-500 text-white px-4 py-2 rounded-lg  cursor-pointer hover:bg-red-700 transition duration-300'>Delete Post</button>
        </div> : <></>}
        
      </div>
      

    </div>
  )
}

export default PostLarge
