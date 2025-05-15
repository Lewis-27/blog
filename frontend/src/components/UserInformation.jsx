import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaEye, FaEyeSlash} from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'
import { useUpdateUserMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

import { toast } from 'react-toastify'

const UserInformation = () => {
  const {userInfo} = useSelector((state) => state.auth);

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');

  const [updateUserApiCall] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      if(!userInfo) {
        navigate('/');
      }
    }, [navigate, userInfo])

  return (
      <div className=' w-full flex flex-col items-center justify-start gap-6'>
        <div className="flex gap-4 w-80 rounded-full py-2 px-6 border">
          <h1>Name: </h1>
          <h1>{name}</h1>
        </div>
        <div className="flex gap-4 w-80 rounded-full py-2 px-6 border">
          <h1>Email: </h1>
          <h1>{email}</h1>
        </div>
      </div>
      
  )
}

export default UserInformation
