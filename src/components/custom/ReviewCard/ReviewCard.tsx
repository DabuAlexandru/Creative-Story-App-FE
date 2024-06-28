import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getAndSetPicture } from '@/utils/helpers/helper.file'
import { extractSignatureFromString } from '@/utils/helpers/helper.string'
import { ReviewType } from '@/utils/types/story.types'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { ScoreWrapper } from '../ScoreWrapper/ScoreWrapper'
import VoteComponent from '@/pages/threadsOfDiscussion/components/VoteComponent'
import { voteForStoryReview } from '@/requests/vote.requests'

const ReviewCard = ({
  review
}: {
  review: ReviewType
}) => {
  const userProfile = review.userProfile
  const [profilePicture, setProfilePicture] = useState<string>('')
  const signature = useMemo(() => extractSignatureFromString(userProfile.penName), [userProfile.penName])
  const createdOn = dayjs(review.createdOn).format('YYYY-MM-DD HH:mm')

  useEffect(() => {
    getAndSetPicture(userProfile?.profilePicture?.fileName, setProfilePicture)
  }, [userProfile?.profilePicture?.fileName])

  return (
    <div className='mb-6'>
      <div className="flex items-center mb-2">
        <Avatar className='size-[30px]'>
          <AvatarImage src={profilePicture} alt="@shadcn" />
          <AvatarFallback>{signature}</AvatarFallback>
        </Avatar>
        <div className='pl-2'>
          <p className="text-gray-200 text-[15px] font-semibold">{review.title}</p>
          <div className="text-[12px]">
            <span className="text-gray-300">{userProfile.penName}</span>
            <span className="text-gray-400"> - {createdOn}</span></div>
        </div>
      </div>
      <ScoreWrapper scoreDetails={review} />
      <div className='px-2 border-solid border-l-2 border-gray-500 text-sm'>
        <p>{review.content}</p>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <VoteComponent
          initialVote={review.userVote}
          voteTally={review.voteValue}
          castUserVote={(voteValue) => voteForStoryReview({ voteValue, storyReviewId: review.id })}
          className='bg-slate-900'
        />
      </div>
    </div>
  )
}

export default ReviewCard