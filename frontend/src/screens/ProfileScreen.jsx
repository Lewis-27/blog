import React from 'react'

import UpdateForm from '../components/UpdateForm'
import UserInformation from '../components/UserInformation'
import PostsProfile from '../components/PostsProfile'
import UserIconLarge from '../components/UserIconLarge'
import {FaPenToSquare} from 'react-icons/fa6'
import { useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfileScreen = () => {
  const {userInfo} = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const [editing, setEditing] = useState(false);
  const scrollToTopRef = useRef();

  const toggleEdit = () => {
    setEditing(!editing)
  }

  useEffect(() => {
    setEditing(false);
    scrollToTopRef.current.scrollIntoView()
  }, [navigate])

  

  return (
    <div>
      <div ref={scrollToTopRef} className="flex flex-col lg:flex-row items-center justify-center gap-16 px-16 min-h-180">
        <div className='flex flex-col items-center justify-center min-h-128 gap-8'>
          <div className="flex flex-col items-center justify-center gap-1  w-full ">
            <UserIconLarge userColour={userInfo.colour}/>  
            <div className="flex gap-2 w-full items-center justify-center ">
              <h1 className="text-4xl">Your info</h1>
              {!editing ? <button className=' cursor-pointer text-2xl' onClick={toggleEdit}> <FaPenToSquare /> </button> : <></>}
              
            </div>
            
            <p className="text-xl text-gray-500 ">Update your details</p>
            
          </div>
          {editing ? <UpdateForm setEditing={setEditing}/> : <UserInformation />}
        </div>
        <div className="min-h-180 w-full lg:w-1/2 flex flex-col items-center justify-center gap-6 pb-4">
          <PostsProfile editing={editing} />
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
