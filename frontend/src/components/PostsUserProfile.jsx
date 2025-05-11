import React from 'react'
import { useGetUserPostsMutation } from '../slices/postsApiSlice'
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostExtraSmall from '../components/PostExtraSmall';
import { Link } from 'react-router-dom';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa6'


const PostsProfile = ({userId, scrollTop}) => {
  const {userInfo} = useSelector((state) => state.auth);


  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [numPerPage, setNumPerPage] = useState(3);
  const [sort, setSort] = useState('asc');
  const [totalPage, setTotalPage] = useState();

  const [getUserPostsApiCall] = useGetUserPostsMutation();

    useEffect(() => {
      const getPosts = async () => {
        const res = await getUserPostsApiCall({
          userId,
          query: `sort=${sort}`}).unwrap();
        setPosts(res);
        setIsLoading(false);
      }
  
      getPosts();
  
      
    }, [sort])

    useEffect(() => {
      const displayPosts = () => {
        const startIndex = ((numPerPage * page) - numPerPage)
        const endIndex = (startIndex + numPerPage)
  
        setDisplayedPosts(posts.slice(startIndex, endIndex))
        setTotalPage(Math.ceil(posts.length/numPerPage));
      } 
      displayPosts();
    }, [posts, page, numPerPage, sort])

  console.log(posts)

  return (
    <>
      <div className="flex w-full items-center gap-8">
        <div className="flex items-center gap-2">
          <label htmlFor='itemsPerPage' className="text-md">Posts per page</label>
          <select name="itemsPerPage" id="itemsPerPage" value={numPerPage} onChange={(e) => {
            console.log(e.target.value)
            setPage(1)
            setNumPerPage(e.target.value)
          }} className='cursor-pointer'>
            <option value={3} >3</option>
            <option value={5} >5</option>
            <option value={10} >10</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <label htmlFor='sort' className="text-md">Sort</label>
          <select name="sort" id="sort" value={sort} onChange={(e) => {
            setSort(e.target.value)
          }} className='cursor-pointer'>
            <option value='asc' >oldest</option>
            <option value='desc' >newest</option>
          </select>
        </div>
        
      </div>
      <div  className='w-full flex flex-col gap-4 justify-start items-center grow ' >
        <div className="w-full flex flex-col gap-4 justify-start items-center grow">
          {isLoading ? <h1>Loading</h1> : displayedPosts.map((post) => <PostExtraSmall key={post._id} postData={post}/>)}
          {(!isLoading && posts.length === 0) ? <h1>No posts found</h1> : <></>}
        </div>
        
        <div className="flex items-center justify-center gap-4 w-full ">
                <FaArrowLeft onClick={() => {
                  if(page !== 1){
                    setPage(page - 1)
                  }
                  scrollTop()
                }} className={page === 1 ? 'text-gray-300' : 'cursor-pointer'}/>
                <div className="">{page}</div>
                <FaArrowRight onClick={() => {
                  if(page !== totalPage){
                    setPage(page + 1)
                  }
                  scrollTop()
                }} className={page === totalPage ? 'text-gray-300' : 'cursor-pointer'}/>
              </div>
      </div>    
    </>

  )
}

export default PostsProfile
