import { axiosRequest, RequestMethod } from "./axiosHandler/axios.handler";

const baseURL = '/genre';

export const getGenreDictList = async () => {
  return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/get-dict` })
}