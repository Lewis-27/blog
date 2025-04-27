import React from 'react'
import Hero from '../components/Hero'
import WelcomeBanner from '../components/WelcomeBanner'
import RecentPosts from '../components/RecentPosts'

import { useSelector } from 'react-redux'

const HomeScreen = () => {
  const {userInfo} = useSelector((state) => state.auth)

  return (
    <>
      {userInfo
        ? <WelcomeBanner />
        : <Hero />}
      <RecentPosts />
    </>
  )
}

export default HomeScreen
