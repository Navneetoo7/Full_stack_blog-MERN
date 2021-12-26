import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:1000" });
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
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
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const signIn = (FormData) => API.post("/user/signIn", FormData);
export const signUp = (FormData) => API.post("/user/signUp", FormData);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
