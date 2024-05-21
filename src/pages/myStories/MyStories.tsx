import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { StoryDisplayType } from '@/utils/types/story.types'
import { useContext, useEffect, useState } from 'react'
import StoryCard from './components/StoryCard/StoryCard'
import { retrieveStoriesForAuthorRequest } from '@/requests/story.requests'
import { UserContext } from '@/utils/providers/UserContextProvider'
import { makeRequest } from '@/requests/request.handler'

const MyStories = () => {
  const [stories, setStories] = useState<StoryDisplayType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { profileInfo: { id: profileId } } = useContext(UserContext)

  useEffect(() => {
    makeRequest({ request: () => retrieveStoriesForAuthorRequest(profileId), setObject: setStories, setIsLoading })
  }, [])

  if (isLoading) {
    return <h1>Is Loading!</h1>
  }

  return (
    <Card>
      <CardHeader className='text-2xl font-bold'>Your creations<Separator className='my-3' /></CardHeader>
      <CardContent className='mb-4'>
        <div className='w-100 align-items-start'>
          <span>Journal</span>
          <div>Journal Entries</div>
        </div>
        <div className='w-100 align-items-start'>
          <span>Stories</span>
          <div>Story Entries</div>
          <div className='flex flex-wrap justify-center gap-10'>
            {(stories).map(story => <StoryCard key={`my-story-${story.id}`} story={story} />)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MyStories