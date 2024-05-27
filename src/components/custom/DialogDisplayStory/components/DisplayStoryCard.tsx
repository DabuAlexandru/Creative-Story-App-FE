import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StoryDisplayType, StoryScoreType } from '@/utils/types/story.types'
import { UserProfileReferenceType } from '@/utils/types/user.types'
import dayjs from 'dayjs'
import DisplayStoryReviews from './DisplayStoryReviews'
import { ScoreWrapper } from '../../ScoreWrapper/ScoreWrapper'
import { Button } from '@/components/ui/button'
import { useContext } from 'react'
import { UserContext } from '@/utils/providers/UserContextProvider'
import { BookmarkFilledIcon, BookmarkIcon, MagnifyingGlassIcon, ReaderIcon } from '@radix-ui/react-icons'
import { updateReadLaterList } from '../utils'
import { extractSignatureFromString } from '@/utils/helpers/helper.string'
import { PictureContext } from '@/utils/providers/PicturesProvider'
import React from 'react'
import CoverImage from '../../CoverImage/CoverImage'
import DisplayGenres from '../../DisplayGenres/DisplayGenres'
import { useNavigate } from 'react-router-dom'

const DisplayStoryDetails = ({ story }: { story: StoryDisplayType }) => {
  const { title, createdOn, lastUpdatedOn, description, preview } = story
  const navigate = useNavigate()
  const { readLaterSet, setReadLater } = useContext(UserContext)
  const storyBookmarked = readLaterSet.has(story.id)

  return (
    <div className='w-2/3 p-1'>
      <div className='flex gap-4'>
        <CoverImage fileName={story.coverPicture?.fileName} initialHeight={200} />
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <DisplayGenres genres={story.genres} subGenres={story.subGenres} />
          <p className="text-gray-400 text-sm mb-2">
            Creation Date: {dayjs(createdOn).format('YYYY-MM-DD HH:mm')}
          </p>
          <p className="text-gray-400 text-sm mb-2">
            Last Modified Date: {dayjs(lastUpdatedOn).format('YYYY-MM-DD HH:mm')}
          </p>
          <div className='p-1 flex gap-2'>
            <Button
              className='rounded-full'
              onClick={() => navigate(`/view-story/${story.id}`)}
            >
              <MagnifyingGlassIcon />
              <span className='ml-1 pb-[1px]'>See More</span>
            </Button>
            <Button className='rounded-full' onClick={() => navigate(`/read-story/${story.id}`)}>
              <ReaderIcon />
              <span className='ml-1 pb-[1px]'>Read Now</span>
            </Button> {/* redirect to read story page */}
            <Button
              className='rounded-full'
              variant={storyBookmarked ? 'destructive' : 'secondary'}
              onClick={() => updateReadLaterList({ storyId: story.id, setReadLater, setIsLoading: () => { }, isBookmarked: storyBookmarked })}
            >
              {storyBookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
              <span className='ml-1 pb-[1px]'>{storyBookmarked ? 'Remove From' : 'Add To'} Read Later</span>
            </Button>
          </div>
        </div>
      </div>
      <div className='p-2'>
        <p className="text-gray-2100 my-2 text-lg">{description}</p>
        <div className="text-gray-300 text-justify overflow-ellipsis">{preview}</div>
      </div>
    </div>
  )
}

const SocialDetails = ({
  author,
  storyScore,
  storyId
}: {
  author: UserProfileReferenceType
  storyScore: StoryScoreType
  storyId: string | number
}) => {
  const { profileInfo, profilePicture } = React.useContext(UserContext)
  const { getAndSetPictureURL } = React.useContext(PictureContext)
  const [profilePictureUrl, setProfilePictureUrl] = React.useState('')

  const signature = React.useMemo(() => extractSignatureFromString(profileInfo.penName), [profileInfo.penName])

  React.useEffect(() => {
    if (!profilePictureUrl && getAndSetPictureURL) {
      getAndSetPictureURL({ category: 'profile', fileName: profilePicture?.fileName, setPictureUrl: setProfilePictureUrl })
    }
  }, [])

  return (
    <div className='w-1/3 p-1'>
      <div className="flex items-center mb-2">
        <Avatar>
          <AvatarImage src={profilePictureUrl} alt="@shadcn" />
          <AvatarFallback>{signature}</AvatarFallback>
        </Avatar>
        <div className='pl-2'>
          <p className="text-gray-200 font-semibold">{author.penName}</p>
          <p className="text-gray-300 text-sm">{author.headline}</p>
        </div>
      </div>
      {storyScore
        ? <>
          <div><span>{storyScore.numOfReviews} reviews</span></div>
          <ScoreWrapper scoreDetails={storyScore} isOverallScore={true} />
        </>
        : null
      }
      <DisplayStoryReviews storyId={storyId} className='max-h-[50vh]' />
    </div>
  )
}

const DisplayStoryCard = ({ story }: { story: StoryDisplayType }) => {

  return (
    <div className="shadow-md rounded-lg overflow-hidden w-full h-full">
      <div className='flex flex-row gap-4 h-full'>
        <DisplayStoryDetails story={story} />
        <SocialDetails author={story.author} storyScore={story.storyOverallScore} storyId={story.id} />
      </div>
    </div>
  )
}

export default DisplayStoryCard