import API from "./axiosInstance.js"; // Use configured axios instance with token

export const createPost = (text) => API.post("/api/posts", { text });
export const getPosts = () => API.get("/api/posts");