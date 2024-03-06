import axiosInstance from "./axiosHandler/axios.config"

type StoryType = any

export const retrieveStoriesForAuthorRequest = async (userId: string | number) => {
  return await axiosInstance.get(`/story/ofUser/${userId}`)
}

export const retrieveStoryRequest = async (storyId: string | number) => {
  return await axiosInstance.get(`/story/${storyId}`)
}

export const retrieveStoryContentRequest = async (storyId: string | number) => {
  return await axiosInstance.get(`/content/${storyId}`)
}

export const createNewStoryRequest = async (newStory: StoryType) => {
  return await axiosInstance.post(`/create`, newStory)
}

export const updateStoryRequest = async (storyId: string | number, updatedStory: StoryType) => {
  return await axiosInstance.put(`/update/${storyId}`, updatedStory)
}