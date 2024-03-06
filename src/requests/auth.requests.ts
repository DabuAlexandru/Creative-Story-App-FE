import axiosInstance from "./axiosHandler/axios.config"

type LoginPropsType = { email: string, password: string }

export const loginRequest = async (payload: LoginPropsType) => {
  return await axiosInstance.post(`/auth/login`, payload)
}

type RegisterPropsType = { email: string, username: string, password: string }

export const registerRequest = async (payload: RegisterPropsType) => {
  return await axiosInstance.post(`/auth/register`, payload)
}