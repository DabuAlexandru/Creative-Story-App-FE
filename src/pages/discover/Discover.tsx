import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { StoryDisplayType } from '@/utils/types/story.types'
import { useEffect, useState } from 'react'
import StoryCard from './components/StoryCard/StoryCard'
import { useToast } from '@/components/ui/use-toast'
import { makeRequest } from '@/requests/request.handler'
import { retrieveAllStoriesPaginate } from '@/requests/story.requests'
import { Paginated, emptyPaginated } from '@/utils/types/general.types'

const Discover = () => {
  const [stories, setStories] = useState<Paginated<StoryDisplayType>>(emptyPaginated)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  useEffect(() => {
    makeRequest({ request: retrieveAllStoriesPaginate, setObject: setStories, setIsLoading, toast })
  }, [])

  if (isLoading) {
    return <h1>Is Loading!</h1>
  }

  return (
    <Card>
      <CardHeader>Discover<Separator className='my-3' /></CardHeader>
      <CardContent className='mb-4'>
        <div className='w-100 align-items-start'>
          <span>Stories</span>
          <div className='flex flex-wrap justify-center gap-10'>
            {(stories.content).map(story => <StoryCard story={story} />)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Discover