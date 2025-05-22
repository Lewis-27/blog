import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegCopyright } from 'react-icons/fa6'

const Footer = () => {
  return (
    <div className='w-full h-64 bg-blue-200 flex items-center justify-center absolute'>
      <div className="flex justify-evenly items-start w-full lg:w-2/3 ">
        <div className="flex flex-col items-center justify-evenly ">
        <Link className='text-3xl w-full text-center' to={'/'}>Blog</Link>
        <div className="flex gap-1 items-center text-gray-600">
          <FaRegCopyright className='text-sm'/>
          <h3 className='font-light'>Lewis Miller 2025</h3>  
        </div>
        
      </div>
      <div className="flex flex-col">
        <h2 className='text-2xl font-semibold'>Navigation</h2>
        <div className="flex flex-col md:flex-row gap-0 md:gap-4">
          <div className="flex flex-col">
            <Link to={'/'}>Homepage</Link>
            <Link to={'/posts'}>Posts</Link>
            <Link to={'/users'}>Users</Link>
          </div>
          <div className="flex flex-col">
            <Link to={'/register'}>Sign Up</Link>
            <Link to={'/login'}>Sign In</Link>  
          </div>  
        </div>
        
        
      
      </div>

      <div className="flex flex-col">
        <h2 className='text-2xl font-semibold'>About</h2>
        <Link to={'https://github.com/Lewis-27/blog'}>About this site</Link>
        <Link to={'https://www.lewis-miller.dev/'}>About me</Link>
        <Link to={'https://www.lewis-miller.dev/contact'}>Contact</Link>
      </div>
      </div>
      


    </div>
  )
}

export default Footer
