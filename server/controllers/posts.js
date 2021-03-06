import mongoose from "mongoose";
import express from "express";
import PostMessage from "../models/postMessage.js";
import e from "express";

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
  try {
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  console.log("createdAtcreatedAtcreatedAtcreatedAt backkkkkkkkkkkkkkkk");

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
  console.log("updateupdateupdateupdateupdate backkkkkkkkkkkkkkkk");
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
  res.json({ message: "Post delete successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  //from auth to verify user authenticated or no and if not then it work(auth return)
  if (!req.userId) return res.json({ message: "Unathenticated" });

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
  // like last logic
  // const updatedPost = await PostMessage.findByIdAndUpdate(
  //   id,
  //   { likeCount: post.likeCount + 1 },
  //   { new: true }
  // );
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatePost);
};

export default router;
