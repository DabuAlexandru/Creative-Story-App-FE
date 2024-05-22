import { APIResponseType, FlexibleObject } from "@/utils/types/general.types"
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import axiosInstance from "./axios.config"

type ApiResponseObjectType = {
  success: (response: AxiosResponse) => APIResponseType,
  error: (error: AxiosError<any>) => APIResponseType;
}

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
    errorMessage = error.message || "The request failed to provide a message!"
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

export enum RequestMethod {
  GET,
  HEAD,
  OPTIONS,
  DELETE,
  POST,
  PUT,
  PATCH,
}

type AxiosRequestHandlerType = {
  requestURL: string
  method: RequestMethod
  payload?: FlexibleObject
  config?: AxiosRequestConfig
}

const getRequestConfigByMethod = ({
  requestURL,
  method,
  payload = {},
  config
}: AxiosRequestHandlerType): Promise<AxiosResponse<any>> => {
  let request = null
  switch (method) {
    // GET/HEAD/OPTIONS
    case RequestMethod.GET: {
      request = axiosInstance.get(requestURL, config)
      break;
    }
    case RequestMethod.HEAD: {
      request = axiosInstance.head(requestURL, config)
      break;
    }
    case RequestMethod.OPTIONS: {
      request = axiosInstance.options(requestURL, config)
      break;
    }
    // POST/PUT/PATCH
    case RequestMethod.POST: {
      request = axiosInstance.post(requestURL, payload, config)
      break;
    }
    case RequestMethod.PUT: {
      request = axiosInstance.put(requestURL, payload, config)
      break;
    }
    case RequestMethod.PATCH: {
      request = axiosInstance.patch(requestURL, payload, config)
      break;
    }
    // DELETE
    case RequestMethod.DELETE: {
      request = axiosInstance.delete(requestURL, { data: payload })
      break;
    }
  }
  return request
}

export const ApiResponseObject: ApiResponseObjectType = {
  success: (response: FlexibleObject): APIResponseType => {
    return ({
      data: response,
      message: 'Success',
      error: false,
    })
  },
  error: getAxiosErrorPayload
}

export const axiosRequest = async (axiosPayload: AxiosRequestHandlerType): Promise<APIResponseType> => {
  try {
    const request = getRequestConfigByMethod(axiosPayload)
    const response = await request
    return ApiResponseObject.success(response.data)
  } catch (err) {
    return ApiResponseObject.error(err as AxiosError)
  }
}

export const clearStorageData = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
  // localStorage.removeItem('pictureURLs');
}