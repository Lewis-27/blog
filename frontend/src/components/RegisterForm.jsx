import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaEye, FaEyeSlash, FaCheck} from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

import { toast } from 'react-toastify'

const RegisterForm = () => {
  const {userInfo} = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [colour, setColour] = useState('blue')

  const [registerApiCall] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      if(userInfo) {
        navigate('/');
      }
    }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      toast.error('Passwords do not match')
      throw new Error('Passwords do not match')
    }
    const user = {
      name,
      email,
      password,
      colour
    }

    try {
      const res = await registerApiCall(user).unwrap();
      dispatch(setCredentials(res))
      toast.success('User created!')
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='h-180 w-1/2 m-auto flex flex-col items-center justify-center gap-6'>
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-4xl">Sign up!</h1>
        <p className="text-xl text-gray-500">Register now and start posting</p>
      </div>
      
      <form 
        action="submit"
        onSubmit={submitHandler}
        className='flex flex-col items-center  gap-2 w-80'
      >
        <input 
          type="text" 
          name="name" 
          id="name"
          placeholder='Name'
          required
          value={name}
          onChange={(e) => {setName(e.target.value)}}
          className=' w-80 rounded-full py-2 px-6 border border-gray-500 focus:outline-blue-500' 
          />
        <input 
          type="email" 
          name="email" 
          id="email"
          placeholder='Email'
          required
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
              required
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              className='relative w-80 rounded-full py-2 px-6 border border-gray-500 focus:outline-blue-500' 
            />
            <button 
              type="button"
              className='absolute text-2xl text-gray-700 mt-2 -ml-10 cursor-pointer'
              onClick={() => {setIsVisible(!isVisible)}}
            >{isVisible ? <FaEyeSlash /> : <FaEye />}</button>
          </div>

          <div className="">
            <input 
              type={isConfirmVisible ? 'text' : 'password'} 
              name="confirmPassword" 
              id="confirmPassword"
              placeholder='Confirm password'
              required
              value={confirmPassword}
              onChange={(e) => {setConfirmPassword(e.target.value)}}
              className='relative w-80 rounded-full py-2 px-6 border border-gray-500 focus:outline-blue-500' 
            />
            <button 
              type="button"
              className='absolute text-2xl text-gray-700 mt-2 -ml-10 cursor-pointer'
              onClick={() => {setIsConfirmVisible(!isConfirmVisible)}}
            >{isConfirmVisible ? <FaEyeSlash /> : <FaEye />}</button>
          </div>
          <div className="self-start px-4 flex flex-col gap-2 w-full ">
            <p className=''>Select colour:</p>
            <div className="flex flex-wrap gap-4 w-full items-center justify-between">
              <div className={`cursor-pointer aspect-square h-8 bg-blue-300 rounded-full flex items-center justify-center ${colour === 'blue' ? 'border border-gray-700' : ''}`}
                onClick={() => setColour('blue')}>
                {colour === 'blue' ? <FaCheck className='text-gray-700'/> : <></>}
              </div>
              <div className={`cursor-pointer aspect-square h-8 bg-red-400 rounded-full flex items-center justify-center ${colour === 'red' ? 'border border-gray-700' : ''}`}
              onClick={() => setColour('red')}>
                {colour === 'red' ? <FaCheck className='text-gray-700'/> : <></>}
              </div>
              <div className={`cursor-pointer aspect-square h-8 bg-green-300 rounded-full flex items-center justify-center ${colour === 'green' ? 'border border-gray-700' : ''}`}
              onClick={() => setColour('green')}>
                {colour === 'green' ? <FaCheck className='text-gray-700'/> : <></>}
              </div>
              <div className={`cursor-pointer aspect-square h-8 bg-yellow-400 rounded-full flex items-center justify-center ${colour === 'yellow' ? 'border border-gray-700' : ''}`}
              onClick={() => setColour('yellow')}>
                {colour === 'yellow' ? <FaCheck className='text-gray-700'/> : <></>}
              </div>
              <div className={`cursor-pointer aspect-square h-8 bg-purple-300 rounded-full flex items-center justify-center ${colour === 'purple' ? 'border border-gray-700' : ''}`}
              onClick={() => setColour('purple')}>
                {colour === 'purple' ? <FaCheck className='text-gray-700'/> : <></>}
              </div>
              <div className={`cursor-pointer aspect-square h-8 bg-orange-400 rounded-full flex items-center justify-center ${colour === 'orange' ? 'border border-gray-700' : ''}`}
              onClick={() => setColour('orange')}>
                {colour === 'orange' ? <FaCheck className='text-gray-700'/> : <></>}
              </div>
            </div>            
          </div>

          <button 
            type="submit"
            className='w-80 rounded-full py-2 px-6  bg-blue-500 text-white mt-6 cursor-pointer hover:bg-blue-700 transition duration-200'
          >Sign Up</button>
          
      </form>
      <div className="flex gap-1">  
        <h2 className="text-md text-gray-500">Already a member?</h2>
        <Link to='/login' className='text-blue-500 underline hover:text-blue-700 transition duration-200'>Sign in here</Link>
      </div>
    </div>
  )
}

export default RegisterForm
