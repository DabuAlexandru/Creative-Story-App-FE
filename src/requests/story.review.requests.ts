import { RequestMethod, axiosRequest } from "./axiosHandler/axios.handler"

type StoryType = any
const baseURL = '/review'

export const retrieveAllReviewsOfStoryPaginate = async (storyId: string | number) => {
  return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/get-all/of-story/${storyId}` })
}

export const createNewStoryReviewRequest = async (storyId: string | number, payload: StoryType) => {
  return await axiosRequest({ method: RequestMethod.POST, requestURL: `${baseURL}/create/for-story/${storyId}`, payload })
}

export const removeReviewFromStory = async (storyId: string | number) => {
  return await axiosRequest({ method: RequestMethod.DELETE, requestURL: `${baseURL}/delete/from-story/${storyId}` })
}

