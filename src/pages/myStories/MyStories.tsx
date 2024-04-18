import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { StoryDisplayType } from '@/utils/types/story.types'
import { useContext, useEffect, useState } from 'react'
import StoryCard from './components/StoryCard/StoryCard'
import { retrieveStoriesForAuthorRequest } from '@/requests/story.requests'
import { UserContext } from '@/utils/providers/UserContextProvider'
import { useToast } from '@/components/ui/use-toast'
import { makeRequest } from '@/requests/request.handler'

const MyStories = () => {
  const [stories, setStories] = useState<StoryDisplayType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { user: { id: userId } } = useContext(UserContext)
  const { toast } = useToast()

  useEffect(() => {
    makeRequest({ request: () => retrieveStoriesForAuthorRequest(userId), setObject: setStories, setIsLoading, toast })
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
            {(stories).map(story => <StoryCard story={story} />)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MyStories