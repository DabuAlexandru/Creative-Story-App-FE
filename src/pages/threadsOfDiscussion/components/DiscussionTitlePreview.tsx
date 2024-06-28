import AuthorAvatar from "@/components/custom/AuthorAvatar/AuthorAvatar"
import { DiscussionType } from "@/utils/types/discussion.types"
import dayjs from "dayjs"
import { PartialVoteComponent } from "./VoteComponent"
import { voteForDiscussion } from "@/requests/vote.requests"
import { StateSetter } from "@/utils/types/general.types"
import { VoteStateType } from "@/utils/types/vote.types"

export const DiscussionTitlePreview = ({
  discussion,
  userVote,
  setUserVote
}: {
  discussion: DiscussionType
  userVote: VoteStateType
  setUserVote: StateSetter<VoteStateType>
}) => {
  return (
    <div key={`preview-${discussion.id}`} className="p-6 mb-4 bg-slate-800 rounded-lg shadow fixed left-0 right-0 top-14 z-10 border-slate-950 border-s-2 fixed-position">
      <div className="flex justify-between items-center">
        <div className="flex">
          <h2 className="text-xl font-bold">{discussion.title}</h2>
          <div className="ml-4 text-slate-500 flex gap-2 items-center">
            <AuthorAvatar author={discussion.author} className="size-8" />
            <span className="text-sm font-semibold">{discussion.author.penName}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <PartialVoteComponent
            userVote={userVote}
            setUserVote={setUserVote}
            initialVote={discussion.userVote}
            voteTally={discussion.voteValue}
            castUserVote={(voteValue) => voteForDiscussion({ voteValue, discussionId: discussion.id })}
          />
          <span className="text-sm font-semibold text-slate-500 ">Creation Date: {dayjs(discussion.createdOn).format('YYYY-MM-DD HH:mm')}</span>
          <span className="ml-4 cursor-pointer text-blue-500">{discussion.commentsCount} comments</span>
        </div>
      </div>
    </div>
  )
}