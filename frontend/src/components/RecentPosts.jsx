import React from 'react'

import Post from './Post'

const RecentPosts = () => {
  return (
    <div className='w-full text-xl px-32 py-8 '>
      <h1 className='px-16 pb-8'>Recent posts</h1>
      <div className="flex flex-col w-full h-full justify-evenly items-center gap-8">
        <Post postData={{
          title: 'frontend post test',
          body: 'This is a test to design the look of posts on the blog site',
          tags: ['testing', 'frontend'],
          userId: '6802238e7a57b07caf5d7b94'
        }}/>
        <div className="bg-gray-200 w-full h-32">Post 2</div>
        <div className="bg-gray-200 w-full h-32">Post 3</div>
      </div>
    </div>
  )
}

export default RecentPosts
