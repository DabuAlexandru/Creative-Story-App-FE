import { BaseUserProfileType } from "@/utils/types/user.types"
import { RequestMethod, axiosRequest } from "./axiosHandler/axios.handler"

export const getUserProfile = async (reduced: boolean = false) => {
  return await axiosRequest({ method: RequestMethod.GET, requestURL: `/userProfile${reduced ? '/reduced' : ''}` })
}

export const updatePicture = async (payload: FormData) => {
  return await axiosRequest({ method: RequestMethod.POST, requestURL: `/userProfile/updatePicture`, payload })
}

export const deletePicture = async (payload: FormData) => {
  return await axiosRequest({ method: RequestMethod.POST, requestURL: `/userProfile/deletePicture`, payload })
}

export const addFavorite = async (storyId: number) => {
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: `/userProfile/favorite/add/${storyId}` })
}

export const removeFavorite = async (storyId: number) => {
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: `/userProfile/favorite/remove/${storyId}` })
}

export const addReadLater = async (storyId: number) => {
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: `/userProfile/readLater/add/${storyId}` })
}

export const removeReadLater = async (storyId: number) => {
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: `/userProfile/readLater/remove/${storyId}` })
}

export const updateUserProfile = async (payload: BaseUserProfileType) => {
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: `/userProfile/update`, payload })
}
