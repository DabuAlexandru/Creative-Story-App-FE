import { APIResponseType, FlexibleObject } from "@/utils/types/general.types";
import axios, { AxiosError, AxiosResponse } from "axios";

const getAxiosErrorPayload = (error: AxiosError): APIResponseType => {
  let errorMessage = ''
  let errorData = null
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage = (error.response as AxiosResponse<FlexibleObject>).data?.message || 'An error occurred during the request.';
    errorData = error.response.data
  } else if (error.request) {
    // The request was made but no response was received
    errorData = error.request;
    errorMessage = "The request failed to provide a message!"
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = error.message
  }
  return {
    data: errorData,
    message: errorMessage,
    error: true,
  };
}

const axiosInstance = axios.create({
  timeout: 10000,
})

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.url
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  const errorPayload = getAxiosErrorPayload(error)
  return Promise.reject(errorPayload);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const errorPayload = getAxiosErrorPayload(error)
  return Promise.reject(errorPayload);
});

axiosInstance.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axiosInstance.defaults.baseURL = import.meta.env.API_BASE_URL

export default axiosInstance;