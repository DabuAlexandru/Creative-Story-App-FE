import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { StoryDisplayType } from '@/utils/types/story.types'
import { useEffect, useState } from 'react'
import { getAndSetStories } from './utils'
import StoryCard from './components/StoryCard'

const MyStories = () => {
  const [stories, setStories] = useState<StoryDisplayType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getAndSetStories({ setStories, setIsLoading })
  }, [])

  if (isLoading) {
    return <h1>Is Loading!</h1>
  }

  return (
    <Card>
      <CardHeader>MyStories<Separator className='my-3' /></CardHeader>
      <CardContent className='mb-4'>
        <div className='w-100 align-items-start'>
          <span>Journal</span>
          <div>Journal Entries</div>
        </div>
        <div className='w-100 align-items-start'>
          <span>Stories</span>
          <div>Story Entries</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {stories.map(story => <StoryCard story={story} />)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MyStories