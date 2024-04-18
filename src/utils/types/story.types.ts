import { UserType } from "../providers/UserContextProvider"

export type StoryBaseType = {
  id: Number
  title: string
  createdOn: Date
  lastUpdatedOn: Date
  author: UserType
}
export type StoryDisplayType = StoryBaseType & { description: string }
export type StoryContentType = StoryBaseType & { content: string }