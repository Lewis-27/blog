import React from 'react'
import Hero from '../components/Hero'
import WelcomeBanner from '../components/WelcomeBanner'
import RecentPosts from '../components/RecentPosts'

import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

const HomeScreen = () => {
  const {userInfo} = useSelector((state) => state.auth)

  return (
    <>
      {userInfo
        ? <WelcomeBanner />
        : <Hero />}
      <RecentPosts />
      <div className="flex flex-wrap items-center justify-center gap-1 pb-8 text-xl px-8 w-full text-nowrap">
        <h2 className=''>Looking for people to connect with?</h2>
        <div className="flex items-center justify-center gap-1">
          <h2 className=''>Browse our users</h2>
          <Link to='/users' className='text-blue-500 underline hover:text-blue-700 transition duration-300'>here</Link>
        </div>
      </div>
    </>
  )
}

export default HomeScreen
