import { UserProfilePayloadType } from "@/utils/types/user.types"
import { RequestMethod, axiosRequest } from "./axiosHandler/axios.handler"

export const getUserProfile = async (reduced: boolean = false) => {
  return await axiosRequest({ method: RequestMethod.GET, requestURL: `/user-profile${reduced ? '/reduced' : ''}` })
}

export const updatePicture = async (payload: FormData) => {
  return await axiosRequest({ method: RequestMethod.POST, requestURL: `/user-profile/update-picture`, payload })
}

export const deletePicture = async (payload: FormData) => {
  return await axiosRequest({ method: RequestMethod.POST, requestURL: `/user-profile/delete-picture`, payload })
}

export const addFavorite = async (storyId: number | string) => {
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: `/user-profile/favorite/add/${storyId}` })
}

export const removeFavorite = async (storyId: number | string) => {
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: `/user-profile/favorite/remove/${storyId}` })
}

export const addReadLater = async (storyId: number | string) => {
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: `/user-profile/read-later/add/${storyId}` })
}

export const removeReadLater = async (storyId: number | string) => {
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: `/user-profile/read-later/remove/${storyId}` })
}

export const updateUserProfile = async (payload: UserProfilePayloadType) => {
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: `/user-profile/update`, payload })
}
