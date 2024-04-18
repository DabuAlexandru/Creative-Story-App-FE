import { RequestMethod, axiosRequest } from "./axiosHandler/axios.handler"

export const retrieveFile = async (filename: string) => {
    return await axiosRequest({ method: RequestMethod.GET, requestURL: `/files/fetch/${filename}`, config: { responseType: 'blob' } })
}