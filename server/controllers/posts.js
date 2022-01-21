import mongoose from 'mongoose';
import express from 'express';
import PostMessage from '../models/postMessage.js';
import e from 'express';
//QUERY -> /posts?page=1 ->  page=1
//PARAMS -> /posts/:id  -> id=123 -> /posts/123
const router = express.Router();

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const postMessages = await PostMessage.findById(id);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    // get starting index of page every page
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});
    //new one first with setting limit for pagination,skip(startIndex) this use for fetch data by skip base on start index
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  console.log('createdAtcreatedAtcreatedAtcreatedAt backkkkkkkkkkkkkkkk');
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
//update
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  console.log('updateupdateupdateupdateupdate backkkkkkkkkkkkkkkk');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }
  const updatedPost = { creator, title, tags, selectedFile, message, _id: id };
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id ${id}`);
  }
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: 'Post delete successfully' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  //from auth to verify user authenticated or no and if not then it work(auth return)
  if (!req.userId) return res.json({ message: 'Unathenticated' });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id ${id}`);
  }
  const post = await PostMessage.findById(id);
  //checking user alredy liked or not

  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    //like logic
    post.likes.push(req.userId);
  } else {
    //dislike logic
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatePost);
};

//QUERY -> /posts?page=1 ->  page=10
//PARAMS -> /posts/:id  -> id=123 -> /posts/123
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, 'i');
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);

  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
export default router;
