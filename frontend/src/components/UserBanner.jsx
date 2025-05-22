import React from 'react'
import { useState, useEffect } from 'react'

import UserIconLarge from '../components/UserIconLarge'

const UserBanner = ({userColour}) => {
  const bannerColours = {
      'blue': 'bg-blue-300',
      'red': 'bg-red-400',
      'green': 'bg-green-300',
      'yellow': 'bg-yellow-400',
      'purple': 'bg-purple-300',
      'orange': 'bg-orange-400'
    }
  
    const [bannerColour, setBannerColour] = useState('bg-blue-200');
  
    useEffect(() => {
      const getIconColour = () => {
        console.log(userColour)
        try {
          setBannerColour(bannerColours[userColour]);
        } catch (error) {
          setBannerColour(bannerColours.blue);
        }
      }
      getIconColour();
    }, [userColour])

  return (
    <div className=" w-screen h-50 ">
      <div className={`relative w-screen h-30 ${bannerColour} -z-30`}>
        <div className="relative p-1 inline-block rounded-full bg-white top-12 left-8 lg:left-24"><UserIconLarge userColour={userColour}/></div>
      </div>
    </div>
  )
}

export default UserBanner
