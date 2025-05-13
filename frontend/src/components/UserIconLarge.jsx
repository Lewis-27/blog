import React from 'react'
import {FaRegUser} from 'react-icons/fa6'
import { useState, useEffect } from 'react'

const UserIconLarge = ({userColour}) => {
  const iconColours = {
    'blue': 'bg-blue-300',
    'red': 'bg-red-400',
    'green': 'bg-green-300',
    'yellow': 'bg-yellow-400',
    'purple': 'bg-purple-300',
    'orange': 'bg-orange-400'
  }

  const [iconColour, setIconColour] = useState('bg-blue-200');

  useEffect(() => {
    const getIconColour = () => {
      try {
        setIconColour(iconColours[userColour]);
      } catch (error) {
        setIconColour(iconColours.blue);
      }
    }
    getIconColour();
  }, [userColour])

  

  return (
    <div className={`relative aspect-square h-32 rounded-full flex items-end justify-center overflow-clip ${iconColour}`}>
      <FaRegUser className='relative top-3 text-8xl text-white'/>
    </div>
  )
}

export default UserIconLarge
