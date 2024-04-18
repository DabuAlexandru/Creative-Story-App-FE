import { StoryDisplayType } from '@/utils/types/story.types'
import dayjs from 'dayjs'

const DisplayStoryCard = ({ story }: { story: StoryDisplayType }) => {
  const { title, createdOn, lastUpdatedOn, author, description } = story
  return (
    <div className="shadow-md rounded-lg overflow-hidden w-full">
      <div className='flex flex-row'>
        <div className='w-2/3'>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-2">
            Creation Date: {dayjs(createdOn).format('YYYY-MM-DD HH:mm')}
          </p>
          <p className="text-gray-400 text-sm mb-2">
            Last Modified Date: {dayjs(lastUpdatedOn).format('YYYY-MM-DD HH:mm')}
          </p>
          <p className="text-gray-300">{description}</p>
        </div>
        <div className='w-1/3'>
          <div className="flex items-center mb-2">
            <img
              className="w-8 h-8 rounded-full mr-2"
              src="https://via.placeholder.com/50"
              alt="Author Avatar"
            />
            <div>
              <p className="text-gray-200 font-semibold">{author.penName}</p>
              <p className="text-gray-300 text-sm">{author.email}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DisplayStoryCard