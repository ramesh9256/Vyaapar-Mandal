import Cookies from 'js-cookie';  // Add this line at the top of your axios.js file
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://vyaapar-mandal.onrender.com/api',
  withCredentials:true,
  headers: {
    'Content-Type': 'application/json',
  }
});

API.interceptors.request.use((config) => {
  const token = Cookies.get('token'); // Now it works with Cookies

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
