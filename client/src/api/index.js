import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:1000" });

//for auth/ it is function used every request
//it will send token to backend for verify //and getting BE middleware req.headers.Authorization
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
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

export const signIn = (FormData) => API.post("/user/signIn", FormData);
export const signUp = (FormData) => API.post("/user/signUp", FormData);
