import { PictureType } from "./general.types"
import { GenreType } from "./genre.types"
import { UserProfileReferenceType } from "./user.types"

export type StoryBaseType = {
  id: number
  title: string
  genres: GenreType[]
  subGenres: GenreType[]
  description: string
  preview: string
  coverPicture: PictureType
}
export type StoryDisplayType = StoryBaseType & {
  createdOn: Date
  lastUpdatedOn: Date
  author: UserProfileReferenceType
  storyOverallScore: StoryScoreType
}

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

export const emptyStory: StoryBaseType = {
  id: 0,
  title: "",
  genres: [],
  subGenres: [],
  description: "",
  preview: "",
  coverPicture: {
    fileName: '',
    userId: 0
  }
};

export type StoryScoreType = {
  numOfReviews: number
  characterScore: number
  conflictScore: number
  plotScore: number
  settingScore: number
  themeScore: number
}
