import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { StoryDisplayType } from '@/utils/types/story.types'
import { useContext, useEffect, useState } from 'react'
import StoryCard from './components/StoryCard/StoryCard'
import { retrieveStoriesForAuthorRequest } from '@/requests/story.requests'
import { UserContext } from '@/utils/providers/UserContextProvider'
import { makeRequest } from '@/requests/request.handler'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const MyStories = () => {
  const [stories, setStories] = useState<StoryDisplayType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { profileInfo: { id: profileId } } = useContext(UserContext)

  useEffect(() => {
    makeRequest({ request: () => retrieveStoriesForAuthorRequest(profileId), setObject: setStories, setIsLoading })
  }, [])

  if (isLoading) {
    return <h1>Is Loading!</h1>
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex flex-row w-full justify-between items-center content-center'>
          <span className='text-2xl font-bold'>Your creations</span>
          <Button className='w-[100px]' onClick={() => navigate(`/add-edit-story`)}>New Story</Button>
        </div>
        <Separator className='my-3' />
      </CardHeader>
      <CardContent className='mb-4'>
        <div className='w-100 align-items-start'>
          <div className='flex flex-wrap justify-center gap-10'>
            {(stories).map(story => <StoryCard key={`my-story-${story.id}`} story={story} />)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MyStories