import React from 'react'
import { useState, useEffect } from 'react'
import { useGetAllUsersMutation } from '../slices/usersApiSlice'
import UserCard from '../components/UserCard'

const UsersScreen = () => {
  const [getAllUsersApiCall] = useGetAllUsersMutation();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await getAllUsersApiCall().unwrap();
        setUsers(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
      
    }
    getUsers();
  }, [])

  return (
    <div className='min-h-180 px-4 m-auto flex flex-col gap-8 max-w-140'>
      <h1 className='text-3xl'>All users</h1>
      {isLoading 
        ? <h1>Loading</h1> 
        : <div className='flex flex-col gap-4 '> 
            {users.map((user) => { return <UserCard key={user._id} user={user}/> })}
          </div>
      }
    </div>
  )
}

export default UsersScreen
