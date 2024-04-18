import { RequestMethod, axiosRequest } from "./axiosHandler/axios.handler"

type StoryType = any
const baseURL = '/story'

export const retrieveAllStoriesPaginate = async () => {
  return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/getAll` })
}

export const retrieveStoriesForAuthorRequest = async (userId: string | number) => {
  return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/ofAuthor/${userId}` })
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