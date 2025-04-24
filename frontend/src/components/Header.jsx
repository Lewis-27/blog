import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='w-full h-16 text-lg flex justify-between px-8 items-center'>
      <Link className='text-2xl' to={'/'}>Blog</Link>
      <div className="flex gap-6 items-center">
        <Link to={'/register'} className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200'>Sign Up</Link>
        <Link to={'/login'} className='px-4 py-2 rounded-lg shadow-md bg-blue-300 hover:bg-blue-600 hover:text-white transition duration-200'>Sign In</Link>
      </div>
    </div>
  )
}

export default Header
