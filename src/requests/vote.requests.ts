import { VoteForDiscussionPayload, VoteForDiscussionThreadPayload, VoteForStoryReviewPayload } from "@/utils/types/vote.types"
import { axiosRequest, RequestMethod } from "./axiosHandler/axios.handler"

export const voteForDiscussion = async (payload: VoteForDiscussionPayload) => {
  return await axiosRequest({ method: RequestMethod.POST, requestURL: `/discussion-vote/vote`, payload })
}

export const voteForDiscussionThread = async (payload: VoteForDiscussionThreadPayload) => {
  return await axiosRequest({ method: RequestMethod.POST, requestURL: `/discussion-thread-vote/vote`, payload })
}

export const voteForStoryReview = async (payload: VoteForStoryReviewPayload) => {
  return await axiosRequest({ method: RequestMethod.POST, requestURL: `/story-review-vote/vote`, payload })
}