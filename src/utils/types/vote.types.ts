
export type VoteStateType = ValidVoteStateType | 0
export type ValidVoteStateType = -1 | 1

type VotePayload = { voteValue: ValidVoteStateType }

export type VoteForDiscussionPayload = VotePayload & { discussionId: number }
export type VoteForDiscussionThreadPayload = VotePayload & { threadId: number }
export type VoteForStoryReviewPayload = VotePayload & { storyReviewId: number }