import { UserProfileReferenceType } from "./user.types"

export type StoryBaseType = {
  id: number
  title: string
  createdOn: Date
  lastUpdatedOn: Date
  author: UserProfileReferenceType
  storyOverallScore: StoryScoreType
}
export type StoryDisplayType = StoryBaseType & { description: string; content: string }
export type StoryContentType = StoryBaseType & { content: string }

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
