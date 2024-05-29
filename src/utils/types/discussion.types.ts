import { UserProfileReferenceType } from "./user.types"

export type DiscussionType = {
    id: number
    title: string
    content: string
    author: UserProfileReferenceType
    createdOn: Date | string
    lastUpdatedOn: Date | string
}

export type DiscussionThreadType = Omit<DiscussionType, 'title'>