import React from 'react'

const RecentPosts = () => {
  return (
    <div className='w-full text-xl px-32 py-8 '>
      <h1 className='px-16 pb-8'>Recent posts</h1>
      <div className="flex flex-col w-full h-full justify-evenly items-center gap-8">
        <div className="bg-gray-200 w-full h-32">Post 1</div>
        <div className="bg-gray-200 w-full h-32">Post 2</div>
        <div className="bg-gray-200 w-full h-32">Post 3</div>
      </div>
    </div>
  )
}

export default RecentPosts
