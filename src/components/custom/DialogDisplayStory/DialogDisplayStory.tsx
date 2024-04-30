import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { StoryDisplayType } from '@/utils/types/story.types'
import DisplayStoryCard from './components/DisplayStoryCard'

const DialogDisplayStory = ({ story, children }: { story: StoryDisplayType, children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[75%] max-h-[80%] h-4/5">
        <DisplayStoryCard story={story} />
      </DialogContent>
    </Dialog>
  )
}

export default DialogDisplayStory