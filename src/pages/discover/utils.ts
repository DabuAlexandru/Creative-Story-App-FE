// import { retrieveStoriesForAuthorRequest } from "@/requests/story.requests"
import { StateSetter } from "@/utils/types/general.types"
import { StoryDisplayType, stories } from "@/utils/types/story.types"

export const getAndSetStories = async ({
  setStories,
  setIsLoading
}: {
  setStories: StateSetter<StoryDisplayType[]>
  setIsLoading: StateSetter<boolean>
}) => {
  setIsLoading(true)
  // const authorId = 101
  const storiesResponse = stories //await retrieveStoriesForAuthorRequest(authorId)
  
  if(storiesResponse) {
    setStories(storiesResponse)
  } else {
    // display fail toast
  }
  setIsLoading(false)
}