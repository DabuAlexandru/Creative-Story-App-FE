import { makeRequest } from '@/requests/request.handler'
import { retrieveAllSectionsWithContent } from '@/requests/section.requests'
import { retrieveStoryRequest } from '@/requests/story.requests'
import { SectionWithContentType } from '@/utils/types/section.types'
import { StoryBaseType, StoryDisplayType, emptyDisplayStory } from '@/utils/types/story.types'
import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify';
import { Separator } from '@/components/ui/separator'
import CoverImage from '@/components/custom/CoverImage/CoverImage'
import { Button } from '@/components/ui/button'
import { ReaderIcon } from '@radix-ui/react-icons'
import ModalReviewDialog, { ReviewType } from './components/ReviewFormComponent'
import { createNewStoryReviewRequest, getReviewByStoryAndProfile, removeReviewFromStory } from '@/requests/story.review.requests'
import { UserContext } from '@/utils/providers/UserContextProvider'
import { ConfirmationDialog } from '@/components/custom/ConfirmationDialog/ConfirmationDialog'

const SectionContentDisplay = ({ section }: { section: SectionWithContentType }) => {
  const htmlString = section?.content || '<p></p>'
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  return (
    <div>
      <h1 className='text-center text-2xl font-semibold mt-16 sticky top-24 bg-slate-800 py-1 text-slate-300'>{section.title}</h1>
      <Separator className='mt-2 mb-8 bg-slate-500' />
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </div>
  );
}

const StoryCoverCard = ({ story }: { story: StoryBaseType }) => {
  const { profileInfo } = useContext(UserContext)
  const [userReview, setUserReview] = useState<ReviewType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onReceiveResponse = (reviewPayload: any) => {
    makeRequest({ request: () => createNewStoryReviewRequest(story.id, reviewPayload), setIsLoading, setObject: setUserReview })
  }

  const onConfirmRemoveResponse = () => {
    makeRequest({ request: () => removeReviewFromStory(story.id), setIsLoading, onSuccessEffect: () => setUserReview(null)})
  }

  useEffect(() => {
    if (story?.id && profileInfo?.id) {
      const storyId = story.id
      const profileId = profileInfo?.id
      makeRequest({ request: () => getReviewByStoryAndProfile({ storyId, profileId }), setIsLoading, setObject: setUserReview })
    }
  }, [story?.id, profileInfo?.id])

  return (
    <div className="flex flex-col gap-4 fixed mt-10">
      <CoverImage fileName={story.coverPicture?.fileName} initialWidth={200} />
      {userReview ? (
        <ConfirmationDialog
          question="Are you sure you want to remove your review?"
          onConfirm={onConfirmRemoveResponse}
        >
          <Button disabled={isLoading} className='rounded-full' variant='destructive'>
            <ReaderIcon />
            <span className='ml-1 pb-[1px]'>Remove review</span>
          </Button>
        </ConfirmationDialog>
      ) : (
        <ModalReviewDialog onReceiveResponse={onReceiveResponse}>
          <Button disabled={isLoading} className='rounded-full' variant='default'>
            <ReaderIcon />
            <span className='ml-1 pb-[1px]'>Leave a review</span>
          </Button>
        </ModalReviewDialog>
      )}
    </div>

  )
}

const StoryTitle = ({ title }: { title: string }) => {
  return (
    <div className='sticky top-14 bg-slate-800 z-10'>
      <h1 className='text-center text-3xl font-semibold mt-16'>{title}</h1>
      <Separator className='mt-2 mb-8 bg-slate-400' />
    </div>
  )
}

const ReadStoryPage = ({ story, sections }: { story: StoryDisplayType, sections: SectionWithContentType[] }) => {
  return (
    <div className='w-full h-full flex flex-row justify-center items-start content-center'>
      <div className="min-w-[250px]">
        <StoryCoverCard story={story} />
      </div>
      <div>
        <div className='bg-slate-800 p-4 rounded-sm'>
          <StoryTitle title={story?.title} />
          {(sections || []).map((section) => <SectionContentDisplay section={section} />)}
        </div>
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
