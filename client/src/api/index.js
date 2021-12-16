import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:1000" });
export const fetchPosts = () => API.get("/posts");
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (FormData) => API.post("/users/signIn", FormData);
export const signUp = (FormData) => API.post("/users/signUp", FormData);
