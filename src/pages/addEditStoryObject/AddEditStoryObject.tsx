import { makeRequest } from '@/requests/request.handler'
import { retrieveStoryRequest } from '@/requests/story.requests'
import { StoryBaseType, emptyStory } from '@/utils/types/story.types'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddEditStoryForm from './components/AddEditStoryForm'
import { getAndSetPicture } from '@/utils/helpers/helper.file'

const AddEditStoryObject = () => {
  const { storyId } = useParams()
  const [story, setStory] = useState<StoryBaseType>(emptyStory)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [imageSrc, setImageSrc] = useState<string>('')
  const isEditMode = useMemo(() => Boolean(storyId), [storyId])

  const getAndSetData = async () => {
    if (!storyId) {
      return;
    }
    setIsLoading(true)
    const futureStory = await makeRequest({ request: () => retrieveStoryRequest(storyId), setObject: setStory })
    const pictureFileName = futureStory?.coverPicture?.fileName || ''
    if (pictureFileName) {
      await getAndSetPicture(pictureFileName, setImageSrc)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (isEditMode) {
      getAndSetData()
    }
  }, [storyId])

  if (isLoading) {
    return null
  }

  return (
    <div className='mt-4'>
      <AddEditStoryForm story={story} imageSrc={imageSrc} />
    </div>
  )
}

export default AddEditStoryObject