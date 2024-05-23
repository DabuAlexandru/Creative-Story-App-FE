import CoverImage from '@/components/custom/CoverImage/CoverImage';
import DisplayGenres from '@/components/custom/DisplayGenres/DisplayGenres';
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
    <Card className='p-5 w-[500px]'>
      <div className="flex items-center h-4">
        <div className='h-full ml-auto opacity-60'>
          <DropdownMenuOwnStory storyId={story.id}>
            <Button variant='ghost' className='w-[40px] h-[40px] rounded-full p-1'>
              <DotsHorizontalIcon className="h-10 w-10" />
            </Button>
          </DropdownMenuOwnStory>
        </div>
      </div>
      <div className='flex gap-2'>
        <CoverImage fileName={story.coverPicture?.fileName} />
        <div>
          <div className='mt-4 text-2xl font-semibold'>
            {story.title}
          </div>
          <DisplayGenres genres={story.genres} subGenres={story.subGenres} />
        </div>
      </div>
      <div
        className='select-none cursor-pointer p-1'
        onClick={() => navigate(`/add-edit-story-content/${story.id}`)}
      >
        <span>{story.description}</span>
      </div>
      <div className='mt-4 opacity-60 text-sm'>
        <span className='font-semibold'>Last Modified: </span>
        {dayjs(story.lastUpdatedOn).format('YYYY-MM-DD HH:mm')}
      </div>
    </Card>
  )
}

export default StoryCard