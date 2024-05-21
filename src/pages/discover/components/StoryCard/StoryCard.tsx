import DialogDisplayStory from '@/components/custom/DialogDisplayStory/DialogDisplayStory';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card'
import { DotsHorizontalIcon } from '@/components/ui/icons'
import { getAndSetPictureURL } from '@/utils/helpers/helper.file';
import { extractSignatureFromString } from '@/utils/helpers/helper.string';
import { PictureContext } from '@/utils/providers/ProfilePicturesProvider';
import { UserContext } from '@/utils/providers/UserContextProvider';
import { StoryDisplayType } from '@/utils/types/story.types'
import dayjs from 'dayjs';
import React from 'react';

const StoryCard = ({ story }: { story: StoryDisplayType }) => {
  const { profileInfo, profilePicture } = React.useContext(UserContext)
  const { picturesDict } = React.useContext(PictureContext)
  const [profilePictureUrl, setProfilePictureUrl] = React.useState('')

  const signature = React.useMemo(() => extractSignatureFromString(profileInfo.penName), [profileInfo.penName])

  React.useEffect(() => {
    if (!profilePictureUrl && picturesDict) {
      getAndSetPictureURL({ picturesDict, category: 'profile', pictureKey: profileInfo.id, fileName: profilePicture.fileName, setPictureUrl: setProfilePictureUrl })
    }
  }, [picturesDict])

  return (
    <Card className='p-5 w-2/3'>
      <div className="flex items-center h-14">
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
      <div className='mt-4 text-2xl font-semibold'>
        {story.title}
      </div>
      <div className="mt-0.5 mb-2.5 text-xs font-semibold">
        <span className='bg-zinc-400 px-2 py-0.5 rounded-2xl text-center mx-0.5 my-0'>
          Unspecified
        </span>
      </div>
      <DialogDisplayStory story={story}>
        <span>{story.description}</span>
      </DialogDisplayStory>
      <div className='mt-4 opacity-60 text-sm'>{dayjs(story.lastUpdatedOn).format('YYYY-MM-DD HH:mm')}</div>
    </Card>
  )
}

export default StoryCard