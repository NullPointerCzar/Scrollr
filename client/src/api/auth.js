import axios from "axios";

const API = "http://localhost:5001/api/auth";

export const signup = (formData) => axios.post(`${API}/signup`, formData);
export const login = (formData) => axios.post(`${API}/login`, formData);

