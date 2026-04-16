import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
});

// INTERCEPTOR for HTTP Requests: we use axios to automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// INTERCEPTOR for HTTP Responses: we use axios to automatically save new tokens from the backend responses
api.interceptors.response.use((response) => {
  // if the backend sent a new token in the body, save it
  if (response.data && response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response;
}, (error) => {
  // If we get a 401 (Unauthorized), redirect to login
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    
    window.location.href = "/login"; 
  }
  return Promise.reject(error);
});

export default api;