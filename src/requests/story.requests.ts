import { RequestMethod, axiosRequest } from "./axiosHandler/axios.handler"

type StoryType = any

export const retrieveStoriesForAuthorRequest = async (userId: string | number) => {
  return await axiosRequest({ method: RequestMethod.GET, requestURL: `/story/ofUser/${userId}` })
}

export const retrieveStoryRequest = async (storyId: string | number) => {
  return await axiosRequest({ method: RequestMethod.GET, requestURL: `/story/${storyId}` })
}

export const retrieveStoryContentRequest = async (storyId: string | number) => {
  return await axiosRequest({ method: RequestMethod.GET, requestURL: `/content/${storyId}` })
}

export const createNewStoryRequest = async (payload: StoryType) => {
  return await axiosRequest({ method: RequestMethod.POST, requestURL: `/create`, payload })
}

export const updateStoryRequest = async (storyId: string | number, payload: StoryType) => {
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: `/update/${storyId}`, payload })
}