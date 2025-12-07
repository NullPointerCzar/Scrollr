import API from "./axiosInstance.js"; // Use configured axios instance with token

export const signup = (formData) => API.post("/auth/signup", formData);
export const login = (formData) => API.post("/auth/login", formData);

