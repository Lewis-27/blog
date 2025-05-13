import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaPlus, FaX } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetPostMutation, useEditPostMutation } from '../slices/postsApiSlice';
import { useParams } from 'react-router-dom';

const EditPostForm = () => {
  const {userInfo} = useSelector((state) => state.auth);
  const postId = useParams().postId;


  const [getPostApiCall] = useGetPostMutation();
  const [editPostApiCall] = useEditPostMutation();

  const navigate = useNavigate();

  const [post, setPost] = useState({});

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState([]);
  const [editingError, setEditingError] = useState('');

  const [textAreaHeight, setTextAreaHeight] = useState('')

  useEffect(() => {
    const getPost = async () => {
      const res = await getPostApiCall(postId).unwrap();
      setPost(res);
    }
    getPost();
  }, [navigate])

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
    setTags(post.tags)
  }, [post])

  useEffect(() => {
    const getTextAreaHeight = () => {
      const textArea = document.getElementById('body');
      setTextAreaHeight(textArea.scrollHeight+10);
    }
    getTextAreaHeight();
  }, [body])

  



  const addTag = () => {
    let newTags = tags;
    if(newTag && !editingError){
      if(tags.includes(newTag)){
        toast.error('Cannot repeat tag')
      } else {
        newTags = [...newTags, newTag];
        setTags(newTags.sort());
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
    const editedPost = {
      title,
      body,
      tags,
    }
    

    try {
      const payload = {postId: postId, body: editedPost}
      const res = await editPostApiCall(payload);
      console.log(res)
      toast.success('Post edited!')
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.log(error)
      toast.error('Error editing post')
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
          className={`w-full border border-gray-500 rounded-lg min-h-80 p-4 h-[${textAreaHeight}px] `} />
        <div className="flex items-center gap-2 w-full px-1 py-2 rounded-lg border border-gray-500 relative">
          <h2 className='self-start py-4 pl-2'>Tags:</h2>
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
        <div className="flex items-center gap-4">
          <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-lg w-40 self-end cursor-pointer hover:bg-blue-700 transition duration-300'>Save Changes</button>
          <button type="button" className='bg-red-500 text-white px-4 py-2 rounded-lg w-40 self-end cursor-pointer hover:bg-red-700 transition duration-300'>Delete Post</button>
        </div>
      </form>
  )
}

export default EditPostForm
