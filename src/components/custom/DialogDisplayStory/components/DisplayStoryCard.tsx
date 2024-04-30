import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StoryDisplayType, StoryScoreType } from '@/utils/types/story.types'
import { UserProfileReferenceType } from '@/utils/types/user.types'
import dayjs from 'dayjs'
import DisplayStoryReviews from './DisplayStoryReviews'
import { ScoreWrapper } from './ScoreWrapper'
import { Button } from '@/components/ui/button'

const DisplayStoryDetails = ({ story }: { story: StoryDisplayType }) => {
  const { title, createdOn, lastUpdatedOn, description, content } = story

  return (
    <div className='w-2/3 p-1'>
      <div className='flex gap-4'>
        <div>
          <Avatar className='w-[125px] h-[175px] rounded-none'>
            <AvatarImage className='object-cover' src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className='rounded-none'>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="mt-0.5 mb-2.5 text-xs font-semibold">
            <span className='bg-zinc-400 px-2 py-0.5 rounded-2xl text-center mx-0.5 my-0'>
              Unspecified
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-2">
            Creation Date: {dayjs(createdOn).format('YYYY-MM-DD HH:mm')}
          </p>
          <p className="text-gray-400 text-sm mb-2">
            Last Modified Date: {dayjs(lastUpdatedOn).format('YYYY-MM-DD HH:mm')}
          </p>
          <div className='p-1 flex gap-2'>
            <Button className='rounded-full'>Read Now</Button>
            <Button className='rounded-full' variant='secondary'>Read Later</Button>
          </div>
        </div>
      </div>
      <div className='p-2'>
        <p className="text-gray-2100 my-2 text-lg">{description}</p>
        <div className="text-gray-300 text-justify overflow-ellipsis">{content}</div>
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
  return (
    <div className='w-1/3 p-1'>
      <div className="flex items-center mb-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
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
      <DisplayStoryReviews storyId={storyId} />
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