import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaEye, FaEyeSlash} from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

import { toast } from 'react-toastify'

const SignInForm = () => {
  const {userInfo} = useSelector((state) => state.auth);

  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const [loginApiCall] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      if(userInfo) {
        navigate('/');
      }
    }, [navigate, userInfo])

  const toggleVisible = () => {
    setIsVisible(!isVisible)
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    }

    try {
      const res = await loginApiCall(user).unwrap();
      dispatch(setCredentials(res))
      toast.success('Logged in!')
      navigate('/')
    } catch (err) {
      toast.error('Invalid email or password, please try again')
      console.log(err)
    }
  }

  return (
    <div className='h-180 w-1/2 m-auto flex flex-col items-center justify-center gap-6'>
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-4xl">Welcome back!</h1>
        <p className="text-xl text-gray-500">Sign in and get back to posting!</p>
      </div>
      
      <form 
        action="submit"
        onSubmit={submitHandler}
        className='flex flex-col items-center w-1/2 gap-2 min-w-64'
      >
        <input 
          type="email" 
          name="email" 
          id="email"
          placeholder='Email'
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          className=' w-80 rounded-full py-2 px-6 border border-gray-500 focus:outline-blue-500' 
          />
          <div className="">
            <input 
              type={isVisible ? 'text' : 'password'} 
              name="password" 
              id="password"
              placeholder='Password'
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              className='relative w-80 rounded-full py-2 px-6 border border-gray-500 focus:outline-blue-500' 
            />
            <button 
              type="button"
              className='absolute text-2xl text-gray-700 mt-2 -ml-10 cursor-pointer'
              onClick={toggleVisible}
            >{isVisible ? <FaEyeSlash /> : <FaEye />}</button>
          </div>
          
          <button 
            type="submit"
            className='w-80 rounded-full py-2 px-6  bg-blue-500 text-white mt-6 cursor-pointer hover:bg-blue-700 transition duration-200'
          >Sign In</button>
      </form>
      <div className="flex gap-1">  
        <h2 className="text-md text-gray-500">Not a member?</h2>
        <Link to='/register' className='text-blue-500 underline hover:text-blue-700 transition duration-200'>Sign up here</Link>
      </div>
    </div>
  )
}

export default SignInForm
