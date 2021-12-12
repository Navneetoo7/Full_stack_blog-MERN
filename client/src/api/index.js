import axios from "axios";
export const url = "http://localhost:1000/posts";
export const fetchPosts = () => axios.get(url);
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
