import { makeRequest } from '@/requests/request.handler'
import { retrieveAllSectionsWithContent } from '@/requests/section.requests'
import { retrieveStoryRequest } from '@/requests/story.requests'
import { SectionWithContentType } from '@/utils/types/section.types'
import { StoryDisplayType, emptyDisplayStory } from '@/utils/types/story.types'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify';
import { Separator } from '@/components/ui/separator'

const SectionContentDisplay = ({ section }: { section: SectionWithContentType }) => {
  const htmlString = section?.content || '<p></p>'
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  return (
    <div>
      <h1 className='text-center text-3xl font-semibold mt-16'>{section.title}</h1>
      <Separator className='mt-2 mb-8 bg-slate-400' />
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </div>
  );
}

const ReadStoryPage = ({ story, sections }: { story: StoryDisplayType, sections: SectionWithContentType[] }) => {
  return (
    <div className='w-full h-full flex justify-center items-center content-center'>
      <div className='h-[85vh] w-[80%] overflow-auto bg-slate-800 p-4 rounded-sm'>
        <h1 className='text-center text-3xl font-semibold mt-16'>{story.title}</h1>
        <Separator className='mt-2 mb-8 bg-slate-400' />
        {(sections || []).map((section) => <SectionContentDisplay section={section} />)}
      </div>
    </div>
  )
}

const ReadStory = () => {
  const { storyId } = useParams()
  const [story, setStory] = useState<StoryDisplayType>(emptyDisplayStory)
  const [sections, setSections] = useState<SectionWithContentType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getAndSetData = async () => {
      if (!storyId) {
        return;
      }

      setIsLoading(true)
      const futureStory = await makeRequest({ request: () => retrieveStoryRequest(storyId), setObject: setStory })
      if (!futureStory) {
        navigate(-1)
        return
      }
      const futureSections = await makeRequest({ request: () => retrieveAllSectionsWithContent(storyId), setObject: setSections })
      console.log(futureStory, futureSections)
      setStory(futureStory)
      setSections(futureSections || [])
      setIsLoading(false)
    }

    getAndSetData()
  }, [storyId])

  if (isLoading) {
    return null;
  }

  return (
    <ReadStoryPage story={story} sections={sections} />
  )
}

export default ReadStory