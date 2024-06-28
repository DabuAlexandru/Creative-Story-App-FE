import { Button } from "@/components/ui/button"
import { StateSetter } from "@/utils/types/general.types"
import { ValidVoteStateType, VoteStateType } from "@/utils/types/vote.types"
import { ThickArrowUpIcon, ThickArrowDownIcon } from "@radix-ui/react-icons"
import { useState } from "react"

export const PartialVoteComponent = ({
  userVote,
  setUserVote,
  initialVote,
  voteTally,
  castUserVote,
  className
}: {
  userVote: VoteStateType;
  setUserVote: StateSetter<VoteStateType>;
  initialVote: VoteStateType;
  voteTally: number;
  castUserVote: (voteValue: ValidVoteStateType) => void;
  className?: string;
}) => {
  const commentVoteValue = voteTally + (userVote - initialVote)

  return (
    <>
      <div className={`flex items-cente rounded-full bg-slate-700 ${className || ''}`}>
        <Button
          className="p-0 h-6 w-8 rounded-l-full"
          variant={userVote === 1 ? 'default' : 'ghost'}
          onClick={() => {
            setUserVote(userVote === 1 ? 0 : 1)
            castUserVote(1)
          }}
        >
          <ThickArrowUpIcon />
        </Button>
        <Button
          className="p-0 h-6 w-8 rounded-r-full"
          variant={userVote === -1 ? 'default' : 'ghost'}
          onClick={() => {
            setUserVote(userVote === -1 ? 0 : -1)
            castUserVote(-1)
          }}
        >
          <ThickArrowDownIcon />
        </Button>
      </div>
      <div className={`flex items-center rounded-full px-2 bg-slate-700 ${className || ''}`}>
        <span>{commentVoteValue}</span>
      </div>
    </>
  )
}

const VoteComponent = (props: {
  initialVote: VoteStateType;
  voteTally: number;
  castUserVote: (voteValue: ValidVoteStateType) => void;
  className?: string;
}) => {
  const [userVote, setUserVote] = useState<VoteStateType>(props.initialVote || 0)

  return <PartialVoteComponent userVote={userVote} setUserVote={setUserVote} {...props} />
}

export default VoteComponent