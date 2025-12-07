import API from "./axiosInstance.js"; // Use configured axios instance with token

export const createPost = (text) => API.post("/posts", { text });
export const getPosts = () => API.get("/posts");
export const deletePost = (postId) => API.delete(`/posts/${postId}`);