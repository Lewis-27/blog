import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='w-full flex flex-col gap-4 items-center justify-center h-128 text-xl'>
      <h1 className="text-3xl">Welcome to Blog</h1>
      <p className="">Share your ideas, connect with others</p>
      <Link to='' className='bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition duration-200'>Get started!</Link>
    </div>
  )
}

export default Hero
