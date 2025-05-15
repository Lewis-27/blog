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

  const [editingError, setEditingError] = useState('');

  const addTag = () => {
      let newTags = tags;
      if(newTag && !editingError){
        if(tags.includes(newTag)){
          toast.error('Cannot repeat tag')
        } else {
          newTags = [...newTags, newTag];
          setTags(newTags.sort((a,b) => a.localeCompare(b, 'en', {'sensitivity': 'base'})));
          setNewTag('')
        }
        
      } else if (editingError){
        toast.error(`${editingError}`)
      }else{
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
    <form action="" onSubmit={submitHandler} className='flex flex-col items-center justify-center gap-2 px-4 lg:px-32 w-full text-lg'>
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
        
        <div className="flex flex-col md:flex-row  items-center md;gap-2 w-full px-1 py-2 rounded-lg border border-gray-500 relative">
                  <h2 className='self-start pt-2 md:py-4 pl-2'>Tags:</h2>
                  <div className="flex items-center gap-2 flex-wrap p-2 min-h-14">
                  <div className={`relative rounded-lg border flex items-center gap-1 ${editingError !== '' ? 'border-red-500 focus:outline-red-500  ' : ' border-gray-500 '}`}>
                    
                    <input 
                      type="text" 
                      placeholder='tag' 
                      id='newTag'
                      value={newTag} 
                      onChange={(e) => {
                        if(e.target.value.length >= 30) {
                          setEditingError('Tag too long')
                        } else {
                          setEditingError('')
                          setNewTag(e.target.value)
                        }
                      }}
                      onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                          e.preventDefault()
                          e.preventDefault()
                          addTag()
                        }
                      }}
                      className={` px-2 py-2 pr-10 ${editingError !== '' ? 'border-red-500 focus:outline-red-500  ' : ' border-gray-500 '}`}/> 
                      
                    <button type="button" id='addTagBtn' className={`cursor-pointer px-3 right-0 absolute ${editingError? 'text-gray-300' : ''}`} onClick={addTag}><FaPlus /></button>
                  </div>
                  
                    {tags 
                      ? tags.map((tag) => {
                        return <div key={tag} className='relative flex gap-1 rounded-lg outline-dashed outline outline-gray-400 px-2 py-1 '>
                          <div  className="max-h-10 text-nowrap">{tag}</div>
                          <button type="button" className='cursor-pointer relative text-sm text-red-500' onClick={(e) => {
                            removeTag(tags.indexOf(tag))
                          }}><FaX /></button>
                          </div>
                      })
                      
                      : <></>
                    }
                  </div>
                  
                   {editingError !== '' ? <div className='absolute top-16 left-14 text-red-500'>Tag too long!</div> : <></>}
                  
                  
                </div>
                  
                  
              
        <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-lg w-32 self-end cursor-pointer hover:bg-blue-700 transition duration-300'>Post</button>
      </form>
  )
}

export default CreatePostForm
