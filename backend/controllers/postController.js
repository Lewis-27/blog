import asyncHandler from 'express-async-handler'

import Post from '../models/postModel.js'

// @desc    create post
// route    POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const {title, body, tags} = req.body;

  const userId = req.user._id

  const post = await Post.create({
    title,
    body,
    tags,
    userId
  })

  if(post) {
    res.status(200).json({
    post
  })}  else {
    res.status(400)
    throw new Error('Error creating post')
  }

  
})

// @desc    get all posts
// route    GET /api/posts
// @access  Public
const getAllPosts = asyncHandler(async (req, res) => {
  const limit = req.query.limit
  let posts;
  if(limit){
    posts = await Post.find().limit(limit)
  } else {
    posts = await Post.find();
  }
  res.status(200).json({
    posts
  })
})

// @desc    get recent posts
// route    GET /api/posts/recent
// @access  Public
const getRecentPosts = asyncHandler(async (req, res) => {
  const limit = req.query.limit
  let posts;
  if(limit){
    posts = await Post.find().sort({'updatedAt': -1}).limit(limit);
  } else {
    posts = await Post.find().sort({'updatedAt': -1});
  }
  res.status(200).json({
    posts
  })
})


// @desc    get post
// route    GET /api/posts/:id
// @access  Public
const getPost = asyncHandler(async (req, res) => {
  const postId = req.params.id
  const post = await Post.findById(postId)

  console.log(post)
  
  if(post) {
    res.status(200).json(post);
  //   res.status(200).json({
  //     _id: post._id,
  //     title: post.title,
  //     body: post.body,
  //     tags: post.tags,
  //     userId: post.userId
  // })
  } else {
    res.status(404);
    throw new Error('Post not found')
  }
})

// @desc    delete post
// route    DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId)
  if(post) {
    if(toString(post.userId) === toString(req.user._id)) {
      const deletedPost = await Post.deleteOne(post);
      if(deletedPost.acknowledged) {
        console.log(deletedPost);
        res.status(200).json({
        message: `Deleted post id: ${req.params.id}`
        })
      } else {
        res.status(400);
        throw new Error('Error deleting post')
    }} else {
      res.status(400);
      throw new Error('Invalid user')
    }
  } else {
    res.status(404);
    throw new Error('Post not found')
  }
})

// @desc    Update post
// route    PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  
  if(post){
    if(toString(post.userId) === toString(req.user._id)) {
      post.title = req.body.title || post.title;
      post.body = req.body.body || post.body;
      post.tags = req.body.tags || post.tags;

      const updatedPost = await post.save()

      res.status(200).json({
        title: updatedPost.title,
        body: updatedPost.body,
        tags: updatedPost.tags
      })
    } else {
      res.status(400);
      throw new Error('Invalid user')
    }
  } else {
    res.status(404);
    throw new Error('Post not found')
  }
})

export {
  createPost,
  getAllPosts,
  getRecentPosts,
  getPost,
  deletePost,
  updatePost
};