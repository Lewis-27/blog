import React from 'react'

import UpdateForm from '../components/UpdateForm'

const ProfileScreen = () => {
  return (
    <div>
      <div className="flex items-center justify-center gap-8">
        <UpdateForm />
        <div className="h-180 w-1/2 flex flex-col items-center justify-center gap-6 ">Posts</div>
      </div>
    </div>
  )
}

export default ProfileScreen
