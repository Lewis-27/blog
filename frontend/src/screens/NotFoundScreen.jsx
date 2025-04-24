import React from 'react'
import {FaExclamationTriangle} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFoundScreen = () => {
  return (
    <div className='w-full h-180 flex flex-col gap-8 items-center justify-center'>
      <div className="flex items-center gap-8 justify-center">
        <FaExclamationTriangle className='text-8xl text-orange-500'/>
        <h1 className='text-4xl w-128'>Oops, it looks like this page can't be found</h1>
      </div>
      <p className='text-2xl flex justify-center w-176 text-center'>The page you are looking for does not exist, either go back or return to the home page</p>
      <Link to='/' className='bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition duration-200'>Return home</Link>
    </div>
  )
}

export default NotFoundScreen
