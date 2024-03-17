import { Card } from '@/components/ui/card'
import { StoryDisplayType } from '@/utils/types/story.types'

const StoryCard = ({ story }: { story: StoryDisplayType }) => {
  return (
    <Card>
      <span>{story.title}</span>
      <span>{story.description}</span>
      <span>{story.lastModifiedDate.toString()}</span>
      <span>{story.userId}</span>
    </Card>
  )
}

export default StoryCard