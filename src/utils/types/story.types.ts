import { PictureType } from "./general.types"
import { GenreType } from "./genre.types"
import { UserProfileReferenceType } from "./user.types"

export type StoryBaseType = {
  id: number
  title: string
  createdOn: Date
  lastUpdatedOn: Date
  author: UserProfileReferenceType
  storyOverallScore: StoryScoreType
  coverPicture: PictureType
  genres: GenreType[]
  subGenres: GenreType[]
}
export type StoryDisplayType = StoryBaseType & { description: string; preview: string }

export type ReviewType = {
  id: number
  title: string
  content: string
  characterScore: number
  conflictScore: number
  plotScore: number
  settingScore: number
  themeScore: number
  createdOn: Date
  userProfile: UserProfileReferenceType
}

export type StoryScoreType = {
  numOfReviews: number
  characterScore: number
  conflictScore: number
  plotScore: number
  settingScore: number
  themeScore: number
}
