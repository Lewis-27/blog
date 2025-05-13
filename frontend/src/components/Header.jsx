import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {FaChevronDown} from 'react-icons/fa'
import { useState } from 'react'


import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'

import UserIconSmall from './UserIconSmall'

const Header = () => {
  const {userInfo} = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);

  const dispath = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispath(logout());
      setDropdown(false);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='w-full h-16 text-lg flex justify-between px-8 items-center sticky top-0 bg-white'>
      <Link className='text-2xl' to={'/'}>Blog</Link>
      {userInfo
        ? <div className='relative'>
          <button type="button" onClick={() => {setDropdown(!dropdown)}} className='cursor-pointer flex items-center gap-1 text-sm'>
            <UserIconSmall userColour={userInfo.colour}/>
            <h1 className='text-xl'>{userInfo.name}</h1>
            <FaChevronDown className='' />
          </button>
          {dropdown 
            ? <div className='absolute bg-gray-200 px-2 py-2 w-28 top-8 right-0 rounded-lg shadow-lg flex flex-col gap-1 border border-gray-300 z-50'>
              <Link to='/profile' onClick={() => setDropdown(false)}>Profile</Link>
              <hr className='text-gray-400'/>
              <Link to='/newPost' onClick={() => setDropdown(false)}>New post</Link>
              <hr className='text-gray-400'/>
              <button 
                type="button" 
                onClick={() => {logoutHandler()}}
                className='text-start cursor-pointer'
              >Logout</button>
            </div>
            : <></>}
        </div>
        : <div className="flex gap-6 items-center">
        <Link to={'/register'} className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200'>Sign Up</Link>
        <Link to={'/login'} className='px-4 py-2 rounded-lg   hover:bg-blue-500 hover:text-white transition duration-200'>Sign In</Link>
      </div>}
      
    </div>
  )
}

export default Header
