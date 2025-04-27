import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {FaPlus} from 'react-icons/fa'

const WelcomeBanner = () => {
  const {userInfo} = useSelector((state) => state.auth)

  return (
    <div className='w-full flex items-center justify-evenly h-128 text-xl'>
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-3xl">Welcome {userInfo.name}</h1>
        <p className="">Ready to share your ideas?</p>
        <Link to='/newPost' className='bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition duration-200'>
          <div className="flex gap-1 items-center">
            <FaPlus className='text-sm'/>
            <div className="">Create new post</div>
          </div>
          
        </Link>
      </div>
      <div className="w-1/4 flex flex-col gap-4 items-center justify-center">
        <h2>Latest post</h2>
        <div className="bg-gray-200 w-full h-64">Post</div>
      </div>
      
    </div>
  )
}

export default WelcomeBanner
