import CoverImage from '@/components/custom/CoverImage/CoverImage';
import DialogDisplayStory from '@/components/custom/DialogDisplayStory/DialogDisplayStory';
import DisplayGenres from '@/components/custom/DisplayGenres/DisplayGenres';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card'
import { DotsHorizontalIcon } from '@/components/ui/icons'
import { extractSignatureFromString } from '@/utils/helpers/helper.string';
import { PictureContext } from '@/utils/providers/PicturesProvider';
import { StoryDisplayType } from '@/utils/types/story.types'
import dayjs from 'dayjs';
import React from 'react';

const StoryCard = ({ story }: { story: StoryDisplayType }) => {
  const { getAndSetPictureURL } = React.useContext(PictureContext)
  const [profilePictureUrl, setProfilePictureUrl] = React.useState('')
  const author = story.author
  const profilePicture = author.profilePicture

  const signature = React.useMemo(() => extractSignatureFromString(author.penName), [author.penName])

  React.useEffect(() => {
    if (!profilePictureUrl && getAndSetPictureURL) {
      getAndSetPictureURL({ category: 'profile', fileName: profilePicture?.fileName, setPictureUrl: setProfilePictureUrl })
    }
  }, [])

  return (
    <Card className='p-5 w-2/3'>
      <div className="flex items-center h-14 mb-3">
        <Avatar className='size-16'>
          <AvatarImage src={profilePictureUrl} alt="@shadcn" />
          <AvatarFallback>{signature}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col ml-[10px]'>
          <span className="leading-5 font-semibold">
            {story.author.penName}
          </span>
          <span className='text-sm opacity-60 mt-[-5px]'>
            Junior Writer
          </span>
        </div>
        <div className='h-full ml-auto opacity-60'>
          <DotsHorizontalIcon />
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
      <DialogDisplayStory story={story}>
        <div className='p-2 mt-2 cursor-pointer'>
          <span>{story.description}</span>
        </div>
      </DialogDisplayStory>
      <div className='mt-4 opacity-60 text-sm'>{dayjs(story.lastUpdatedOn).format('YYYY-MM-DD HH:mm')}</div>
    </Card>
  )
}

export default StoryCard