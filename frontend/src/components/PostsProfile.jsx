
import { useGetUserPostsMutation } from '../slices/postsApiSlice'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostExtraSmall from '../components/PostExtraSmall';
import { Link } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa'


const PostsProfile = (editing) => {
  const {userInfo} = useSelector((state) => state.auth);

  const userId = userInfo._id

  const [posts, setPosts] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [reload, setReload] = useState(false)

  const [getUserPostsApiCall] = useGetUserPostsMutation();

  useEffect(() => {
    const getPosts = async () => {
      const res = await getUserPostsApiCall({
        userId,
        query: 'sort=desc&limit=3'
      }).unwrap();
      setPosts(res);
      setIsLoading(false);
    }
    getPosts();
  }, [])

  useEffect(() => {
    const tempPosts = posts.slice();
    setPosts(tempPosts)
  }, [editing])

  console.log(posts)


  return (
    <>
      <div className='w-full flex flex-col gap-8 h-128 justify-center items-center' >
        {posts.length === 0 ? <></> : <h1 className='text-3xl mb-4'>Your posts:</h1>}
        {isLoading ? <h1>Loading</h1> : posts.map((post) => <PostExtraSmall key={post._id} postData={post} edited={editing} />)}
        {(!isLoading && posts.length === 0) ? <div className="text-center">
          <h1 className="text-2xl">It looks like you haven't made any posts yet</h1>
          <h2 className="text-xl text-gray-500">Get started by making a post now!</h2>
        </div> : <></>}
        <Link to='/newPost' className='bg-blue-500 text-white py-2 px-8 rounded-full hover:bg-blue-700 transition duration-200'>
          <div className="flex gap-1 items-center">
            <FaPlus className='text-sm'/>
            <div className="">Create new post</div>
          </div>      
        </Link>
      </div>    
    </>

  )
}

export default PostsProfile
