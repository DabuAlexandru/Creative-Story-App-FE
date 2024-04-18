import { Card } from '@/components/ui/card'
import { DotsHorizontalIcon } from '@/components/ui/icons'
import { StoryDisplayType } from '@/utils/types/story.types'
import dayjs from 'dayjs';

const StoryCard = ({ story }: { story: StoryDisplayType }) => {
  return (
    <Card className='p-5 w-[400px]'>
      <div className="flex items-center h-4">
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
      <div className='mt-4 opacity-60 text-sm'>{dayjs(story.lastUpdatedOn).format('YYYY-MM-DD HH:mm')}</div>
    </Card>
  )
}

export default StoryCard