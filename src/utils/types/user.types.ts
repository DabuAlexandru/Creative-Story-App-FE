import { PictureType } from "./general.types"

export type FavoriteType = {
  storyId: number | string,
  createdOn: Date | string
}

export type ReadLaterType = {
  storyId: number | string,
  createdOn: Date | string
}

export type PictureDictType = {
  [key: string]: string
}

export type BaseUserProfileType = {
  id: number | string,
  penName: string,
  headline: string,
  fullName: string,
  bio: string,
  location: string,
  website: string,
}

export const emptyBaseUserProfileType: BaseUserProfileType = {
  id: '',
  penName: '',
  headline: '',
  fullName: '',
  bio: '',
  location: '',
  website: '',
}

export type UserProfilePayloadType = Omit<BaseUserProfileType, 'id'> 

export type UserProfileReferenceType = BaseUserProfileType & {
  profilePicture: PictureType
}

export type UserProfileType = BaseUserProfileType & {
  favorites: FavoriteType[],
  readingLists: ReadLaterType[],
  profilePicture: PictureType
}

export type ReducedUserProfileType = BaseUserProfileType & {
  favorites: number[],
  readingLists: number[]
}