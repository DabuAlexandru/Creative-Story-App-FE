import { PictureType } from "./general.types"
import { GenreType } from "./genre.types"
import { UserProfileReferenceType, emptyBaseUserProfileType } from "./user.types"

export type StoryFilterType = {
  title?: string,
  authorIds?: (number | string)[],
  genreIds?: (number | string)[]
}

export const emptyStoryFilterObject: StoryFilterType = {
  title: '',
  authorIds: [],
  genreIds: []
}

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

const emptyStoryScore: StoryScoreType = {
  numOfReviews: 0,
  characterScore: 0,
  conflictScore: 0,
  plotScore: 0,
  settingScore: 0,
  themeScore: 0,
}

export const emptyDisplayStory: StoryDisplayType = {
  ...emptyStory,
  createdOn: new Date(),
  lastUpdatedOn: new Date(),
  author: { ...emptyBaseUserProfileType, profilePicture: { fileName: '', userId: 0 } },
  storyOverallScore: emptyStoryScore,
}