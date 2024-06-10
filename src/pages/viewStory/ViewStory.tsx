import CoverImage from "@/components/custom/CoverImage/CoverImage"
import DisplayStoryReviews from "@/components/custom/DialogDisplayStory/components/DisplayStoryReviews"
import { updateReadLaterList } from "@/components/custom/DialogDisplayStory/utils"
import DisplayGenres from "@/components/custom/DisplayGenres/DisplayGenres"
import { ScoreWrapper } from "@/components/custom/ScoreWrapper/ScoreWrapper"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { makeRequest } from "@/requests/request.handler"
import { retrieveStoryRequest } from "@/requests/story.requests"
import { extractSignatureFromString } from "@/utils/helpers/helper.string"
import { PictureContext } from "@/utils/providers/PicturesProvider"
import { UserContext } from "@/utils/providers/UserContextProvider"
import { StoryBaseType, StoryDisplayType, StoryScoreType, emptyDisplayStory } from "@/utils/types/story.types"
import { UserProfileReferenceType } from "@/utils/types/user.types"
import { ReaderIcon, BookmarkFilledIcon, BookmarkIcon, CardStackPlusIcon } from "@radix-ui/react-icons"
import dayjs from "dayjs"
import { ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const SectionTitle = ({ className, children }: { className: string, children: ReactNode }) => {
  return (<h6 className={`text-gray-400 text-2xl font-semiold ${className || ''}`}>{children}</h6>)
}

const DisplayStoryDetails = ({ story }: { story: StoryDisplayType }) => {
  const { title, createdOn, lastUpdatedOn, description, preview } = story
  return (
    <div>
      <h3 className="text-3xl font-semibold mb-2">{title}</h3>
      <DisplayGenres genres={story.genres} subGenres={story.subGenres} />
      <p className="text-gray-400 text-sm mb-2">
        Publish date: {dayjs(createdOn).format('YYYY-MM-DD HH:mm')}
      </p>
      {/* <p className="text-gray-400 text-sm mb-2">
        Last Modified Date: {dayjs(lastUpdatedOn).format('YYYY-MM-DD HH:mm')}
      </p> */}
      <div className='p-2'>
        <SectionTitle className="mt-4">A short glimpse</SectionTitle>
        <p className="text-gray-200 my-2 text-lg">{description}</p>
        <SectionTitle className="mt-6 mb-2">What's the story about?</SectionTitle>
        <div className="text-gray-300 text-justify overflow-ellipsis">{preview}</div>
      </div>
    </div>
  )
}

const SocialDetails = ({
  author,
  storyScore,
  storyId
}: {
  author: UserProfileReferenceType
  storyScore: StoryScoreType
  storyId: string | number
}) => {
  const { profileInfo, profilePicture } = useContext(UserContext)
  const { getAndSetPictureURL } = useContext(PictureContext)
  const [profilePictureUrl, setProfilePictureUrl] = useState('')

  const signature = useMemo(() => extractSignatureFromString(profileInfo.penName), [profileInfo.penName])

  useEffect(() => {
    if (!profilePictureUrl && getAndSetPictureURL) {
      getAndSetPictureURL({ category: 'profile', fileName: profilePicture?.fileName, setPictureUrl: setProfilePictureUrl })
    }
  }, [])

  return (
    <div>
      <SectionTitle className="mt-6 mb-2">Meet the author</SectionTitle>
      <div className="flex items-center mb-2">
        <Avatar>
          <AvatarImage src={profilePictureUrl} alt="@shadcn" />
          <AvatarFallback>{signature}</AvatarFallback>
        </Avatar>
        <div className='pl-2'>
          <p className="text-gray-200 font-semibold">{author.penName}</p>
          <p className="text-gray-300 text-sm">{author.headline}</p>
        </div>
        <Button className='ml-8 rounded-full'>
          <CardStackPlusIcon /> {/* if not following <CardStackMinusIcon /> */}
          <span className='ml-1 pb-[1px]'>Follow</span>
        </Button>
      </div>
      <SectionTitle className="mt-6 mb-2">What did others think of it?</SectionTitle>
      {storyScore
        ? <>
          <div><span>{storyScore.numOfReviews} reviews</span></div>
          <ScoreWrapper scoreDetails={storyScore} isOverallScore={true} />
        </>
        : null
      }
      <DisplayStoryReviews storyId={storyId} reviewsCount={6} className="max-h-[65vh]" />
    </div>
  )
}

const StoryCoverCard = ({ story }: { story: StoryBaseType }) => {
  const { readLaterSet, setReadLater } = useContext(UserContext)
  const navigate = useNavigate();
  const storyBookmarked = readLaterSet.has(story.id)

  return (
    <div className="flex flex-col gap-4 fixed mt-10">
      <CoverImage fileName={story.coverPicture?.fileName} initialWidth={200} />
      <Button className='rounded-full' onClick={() => navigate(`/read-story/${story.id}`)}>
        <ReaderIcon />
        <span className='ml-1 pb-[1px]'>Read Now</span>
      </Button> {/* redirect to read story page */}
      <Button
        className='rounded-full'
        variant={storyBookmarked ? 'destructive' : 'secondary'}
        onClick={() => updateReadLaterList({ storyId: story.id, setReadLater, setIsLoading: () => { }, isBookmarked: storyBookmarked })}
      >
        {storyBookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
        <span className='ml-1 pb-[1px]'>{storyBookmarked ? 'Remove From' : 'Add To'} Read Later</span>
      </Button>
    </div>
  )
}

const ViewStoryPage = ({ story }: { story: StoryDisplayType }) => {
  if (!story.id) {
    return null
  }

  return (
    <div className="flex flex-row mt-20" >
      <div className="min-w-[250px]">
        <StoryCoverCard story={story} />
      </div>
      <div>
        <DisplayStoryDetails story={story} />
        <SocialDetails author={story.author} storyScore={story.storyOverallScore} storyId={story.id} />
      </div>
    </div>
  )
}

const ViewStory = () => {
  const { storyId } = useParams()
  const [story, setStory] = useState<StoryDisplayType>(emptyDisplayStory)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getAndSetData = async () => {
      if (!storyId) {
        return;
      }
      const futureStory = await makeRequest({ request: () => retrieveStoryRequest(storyId), setObject: setStory, setIsLoading })
      if (!futureStory) {
        navigate(-1)
        return
      }
      setStory(futureStory)
    }

    getAndSetData()
  }, [storyId])

  if (isLoading) {
    return null;
  }

  return (
    <ViewStoryPage story={story} />
  )
}

export default ViewStory