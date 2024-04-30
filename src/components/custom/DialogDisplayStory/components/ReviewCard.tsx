import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getProfilePictureURL } from '@/utils/helpers/helper.file'
import { extractSignatureFromString } from '@/utils/helpers/helper.string'
import { StateSetter } from '@/utils/types/general.types'
import { ReviewType } from '@/utils/types/story.types'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { ScoreWrapper } from './ScoreWrapper'

const getAndSetProfilePicture = async (filename: string, setProfilePicture: StateSetter<string>) => {
  if (!filename) {
    return;
  }
  const imageURL = await getProfilePictureURL(filename)
  setProfilePicture(imageURL)
}

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
    getAndSetProfilePicture(userProfile?.profilePicture?.fileName, setProfilePicture)
  }, [userProfile?.profilePicture?.fileName])

  return (
    <div className='mb-6'>
      <div className="flex items-center mb-2">
        <Avatar className='size-[30px]'>
          <AvatarImage src={profilePicture} alt="@shadcn" />
          <AvatarFallback>{signature}</AvatarFallback>
        </Avatar>
        <div className='pl-2'>
          <p className="text-gray-200 text-[13px] font-
          semibold">{review.title}</p>
          <div className="text-[12px]">
            <span className="text-gray-300">{userProfile.penName}</span>
            <span className="text-gray-400"> - {createdOn}</span></div>
        </div>
      </div>
      <ScoreWrapper scoreDetails={review} />
      <div className='mt-1 p-2 border-solid border-l-2 border-gray-500 text-sm'>
        <p>{review.content}</p>
      </div>
    </div>
  )
}

export default ReviewCard