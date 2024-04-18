import { retrieveAllStoriesPaginate } from "@/requests/story.requests"
import { StateSetter } from "@/utils/types/general.types"
import { StoryDisplayType } from "@/utils/types/story.types"

export const getAndSetStoriesPaginate = async ({
  setStories,
  setIsLoading
}: {
  setStories: StateSetter<StoryDisplayType[]>
  setIsLoading: StateSetter<boolean>
}) => {
  setIsLoading(true)
  const storiesResponse = await retrieveAllStoriesPaginate()
  
  if(storiesResponse.error) {
    // display toast
  } else {
    setStories(storiesResponse.data || [])
    // success toast
  }

  setIsLoading(false)
}