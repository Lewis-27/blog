import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaPlus, FaX } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateNewPostMutation } from '../slices/postsApiSlice';

const CreatePostForm = () => {
  const {userInfo} = useSelector((state) => state.auth);

  const [createNewPostApiCall] = useCreateNewPostMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState([]);

  const addTag = () => {
    
    const newTags = tags;
    if(newTag){
      newTags.push(newTag);
      setTags(newTags);
      setNewTag('')
    } else {
      toast.error('Please type a tag')
    }
  }

  const removeTag = (tagIndex) => {
    const newTags = tags.filter((tag) => tags.indexOf(tag) !== tagIndex);
    setTags(newTags);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const post = {
      title,
      body,
      tags,
      userId: userInfo._id
    }
    

    try {
      const newPost = await createNewPostApiCall(post);
      toast.success('Post created!')
      navigate('/');
    } catch (error) {
      console.log(error)
      toast.error('Error creating post')
    }
  }
  return (
    <form action="" onSubmit={submitHandler} className='flex flex-col items-center justify-center gap-2 px-32 w-full text-lg'>
        <div className="flex items-center justify-center gap-1 w-full ">
          <input 
          type="text"
          name='title'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          required
          className='px-4 py-2 border border-gray-500 rounded-lg grow'
        />
        <h1>- by {userInfo.name}</h1>
        </div>
        <textarea 
          name="body" 
          id="body" 
          value={body} 
          onChange={(e) => setBody(e.target.value)}
          placeholder='Post body'
          required
          className='w-full border border-gray-500 rounded-lg min-h-80 p-4' />
        <div className="flex items-center gap-2 w-full px-1 py-2 rounded-lg border border-gray-500 relative">
          <h2>Tags:</h2>
          <input 
            type="text" 
            placeholder='tag' 
            value={newTag} 
            onChange={(e) => setNewTag(e.target.value)}
            className='border border-gray-500 px-4 py-2 rounded-lg'/> 
          <button type="button" className='cursor-pointer relative right-10' onClick={addTag}><FaPlus /></button>
          {tags ? 
            tags.map((tag) => {
              return <div key={tags.indexOf(tag)} className='relative flex gap-1 rounded-lg outline-dashed outline outline-gray-400 px-2 py-1'>
                <div  className=" ">{tag}</div>
                <button type="button" className='cursor-pointer relative text-sm text-red-500' onClick={(e) => {
                  removeTag(tags.indexOf(tag))
                }}><FaX /></button>
                </div>
            })
           : <></>}
          
          
        </div>
        <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-lg w-32 self-end cursor-pointer hover:bg-blue-700 transition duration-300'>Post</button>
      </form>
  )
}

export default CreatePostForm
