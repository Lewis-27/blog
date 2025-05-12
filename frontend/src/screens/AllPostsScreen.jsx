import React from 'react'
import { useGetAllPostsMutation } from '../slices/postsApiSlice'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6'
import PostSmall from '../components/PostSmall'
import { useRef } from 'react'


const AllPostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [numPerPage, setNumPerPage] = useState(3);
  const [sort, setSort] = useState('asc');
  const [totalPage, setTotalPage] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();

  const [getAllPostsApiCall] = useGetAllPostsMutation();

  const scrollTopRef = useRef();

  useEffect(() => {
    const getPosts = async () => {
      const res = await getAllPostsApiCall(`sort=${sort}`);
      setPosts(res.data.posts);
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

  useEffect(() => {
    scrollTopRef.current.scrollIntoView()
  }, [])


  return (
    <div ref={scrollTopRef} className='flex flex-col items-center justify-center gap-8 mx-32 py-8 min-h-180 scroll-m-16'>
      <h1  className="text-3xl">All Posts</h1>
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
      <div className="flex flex-col items-center justify-start gap-8 grow w-full">
        {isLoading ? <></> : displayedPosts.map((post) => <PostSmall postData={post}/> )}
      </div>
      
      <div className="flex items-center justify-center gap-4 w-full">
        <FaArrowLeft onClick={() => {
          if(page !== 1){
            setPage(page - 1)
          }
          scrollTopRef.current.scrollIntoView()
        }} className={page === 1 ? 'text-gray-300' : 'cursor-pointer'}/>
        <div className="">{page}</div>
        <FaArrowRight onClick={() => {
          if(page !== totalPage){
            setPage(page + 1)
          }
          scrollTopRef.current.scrollIntoView()
        }} className={page === totalPage ? 'text-gray-300' : 'cursor-pointer'}/>
      </div>
    </div>
  )
}

export default AllPostsScreen
