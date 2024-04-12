
export type FavoriteType = {
  storyId: number,
  createdOn: Date | string
}

export type ReadLaterType = {
  storyId: number,
  createdOn: Date | string
}

export type ProfilePictureType = {
  fileName: string,
  userId: number
}

export type BaseUserProfileType = {
  fullName: string,
  bio: string,
  location: string,
  website: string,
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