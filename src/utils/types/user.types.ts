
export type FavoriteType = {
  storyId: number | string,
  createdOn: Date | string
}

export type ReadLaterType = {
  storyId: number | string,
  createdOn: Date | string
}

export type PictureDictType = {
  [key: number]: string
}

export type ProfilePictureType = {
  fileName: string,
  userId: number
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
  profilePicture: ProfilePictureType
}

export type UserProfileType = BaseUserProfileType & {
  favorites: FavoriteType[],
  readingLists: ReadLaterType[],
  profilePicture: ProfilePictureType
}

export type ReducedUserProfileType = BaseUserProfileType & {
  favorites: number[],
  readingLists: number[]
}