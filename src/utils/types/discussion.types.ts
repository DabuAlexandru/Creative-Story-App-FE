import { UserProfileReferenceType } from "./user.types"
import { VoteStateType } from "./vote.types"

export type DiscussionType = {
    id: number
    title: string
    content: string
    commentsCount: number
    voteValue: number
    userVote: VoteStateType
    author: UserProfileReferenceType
    createdOn: Date | string
    lastUpdatedOn: Date | string
}

export type DiscussionThreadType = Omit<DiscussionType, 'title'>