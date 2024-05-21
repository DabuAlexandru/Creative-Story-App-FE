import DropdownMenuOwnStory from '@/components/custom/DropdownMenuOwnStory/DropdownMenuOwnStory';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'
import { DotsHorizontalIcon } from '@/components/ui/icons'
import { StoryDisplayType } from '@/utils/types/story.types'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const StoryCard = ({ story }: { story: StoryDisplayType }) => {
  const navigate = useNavigate()

  return (
    <Card className='p-5 w-[400px]'>
      <div className="flex items-center h-4">
        <div className='h-full ml-auto opacity-60'>
          <DropdownMenuOwnStory>
            <Button variant='ghost' className='w-[40px] h-[40px] rounded-full p-1'>
              <DotsHorizontalIcon className="h-10 w-10" />
            </Button>
          </DropdownMenuOwnStory>
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
      <span className='select-none cursor-pointer' onClick={
        () => navigate(`/add-edit-story/${story.id}`)
      }>{story.description}</span>
      <div className='mt-4 opacity-60 text-sm'>{dayjs(story.lastUpdatedOn).format('YYYY-MM-DD HH:mm')}</div>
    </Card>
  )
}

export default StoryCard