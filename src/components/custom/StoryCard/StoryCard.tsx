import { Card } from '@/components/ui/card'
import { AvatarIcon, DotsHorizontalIcon } from '@/components/ui/icons'
import { StoryDisplayType } from '@/utils/types/story.types'
import dayjs from 'dayjs';

const StoryCard = ({ story }: { story: StoryDisplayType }) => {
  return (
    <Card className='p-5 w-2/3'>
      <div className="flex items-center h-16">
        <div><AvatarIcon /></div>
        <div className='flex flex-col ml-[10px]'>
          <span className="leading-5 font-semibold">
            {story.user.penName}
          </span>
          <span className='text-sm opacity-60 mt-[-5px]'>
            Junior Writer
          </span>
        </div>
        <div className='h-full ml-auto opacity-60'>
          <DotsHorizontalIcon />
        </div>
      </div>
      <div className='mt-4 text-2xl font-semibold'>
        {story.title}
      </div>
      <div className="mt-0.5 mb-2.5 text-xs font-semibold">
        <span className='bg-zinc-400 px-2 py-0.5 rounded-2xl text-center mx-0.5 my-0'>
          Unspecified
        </span>
      </div>
      <span>{story.description}</span>
      <div className='mt-4 opacity-60 text-sm'>{dayjs(story.lastModifiedDate).format('YYYY-MM-DD HH:mm')}</div>
    </Card>
  )
}

export default StoryCard