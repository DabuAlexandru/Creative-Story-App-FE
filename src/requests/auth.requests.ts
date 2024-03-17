import { RequestMethod, axiosRequest } from "./axiosHandler/axios.handler"

type LoginPropsType = { email: string, password: string }

export const loginRequest = async (payload: LoginPropsType) => {
  return await axiosRequest({ method: RequestMethod.POST, requestURL: `/auth/login`, payload })
}

type RegisterPropsType = { email: string, username: string, password: string }

export const registerRequest = async (payload: RegisterPropsType) => {
  return await axiosRequest({ method: RequestMethod.POST, requestURL: `/auth/register`, payload })
}