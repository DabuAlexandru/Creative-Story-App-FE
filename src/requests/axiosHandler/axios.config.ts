import axios from "axios";

const axiosInstance = axios.create({
  timeout: 10000,
})

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  const authToken = localStorage.getItem('jwt')
  if(authToken) {
    const formattedToken = JSON.parse(authToken)
    config.headers.Authorization = `Bearer ${formattedToken}`
  }
  return config;
}, (err) => Promise.reject(err));

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, (err) => Promise.reject(err));

axiosInstance.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axiosInstance.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

export default axiosInstance;