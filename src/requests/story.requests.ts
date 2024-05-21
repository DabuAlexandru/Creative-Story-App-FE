import { RequestMethod, axiosRequest } from "./axiosHandler/axios.handler"

type StoryType = any
const baseURL = '/story'

export const retrieveAllStoriesPaginate = async () => {
  return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/get-all` })
}

export const retrieveStoriesForAuthorRequest = async (profileId: string | number) => {
  return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/of-author/${profileId}` })
}

export const retrieveStoryRequest = async (storyId: string | number) => {
  return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/${storyId}` })
}

export const retrieveStoryContentRequest = async (storyId: string | number) => {
  return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/content/${storyId}` })
}

export const createNewStoryRequest = async (payload: StoryType) => {
  return await axiosRequest({ method: RequestMethod.POST, requestURL: `${baseURL}/create`, payload })
}

export const updateStoryRequest = async (storyId: string | number, payload: StoryType) => {
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: `${baseURL}/update/${storyId}`, payload })
}

export const updateStoryCoverRequest = async (storyId: string | number, payload: FormData) => {
  return await axiosRequest({ method: RequestMethod.POST, requestURL: `${baseURL}/update-picture/${storyId}`, payload })
}