import { makeRequest } from "@/requests/request.handler"
import { retrieveAllReviewsOfStoryPaginate } from "@/requests/story.review.requests"
import { Paginated, emptyPaginated } from "@/utils/types/general.types"
import { ReviewType } from "@/utils/types/story.types"
import { useEffect, useState } from "react"
import ReviewCard from "./ReviewCard"
import PaginationControl from "../../PaginationControl/PaginationControl"
import { Separator } from "@/components/ui/separator"

const DisplayStoryReviews = ({ storyId }: { storyId: string | number }) => {
  const [paginatedReviews, setPaginatedReviews] = useState<Paginated<ReviewType>>(emptyPaginated)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!storyId) {
      return;
    }
    makeRequest({ request: () => retrieveAllReviewsOfStoryPaginate(storyId), setObject: setPaginatedReviews, setIsLoading })
  }, [storyId])

  useEffect(() => {
    console.log(paginatedReviews)
  }, [paginatedReviews])

  if (isLoading) {
    return <div>Reviews are loading...</div>
  }

  return (<div>
    <Separator className="mt-4" />
    <PaginationControl className="my-2" pageCount={5} currentPage={1} setCurrentPage={() => { }} />
    <Separator className="mb-4" />
    <div className="overflow-auto h-[50vh]">
      {paginatedReviews.content.map((review) => <ReviewCard review={review} />)}
    </div>
  </div>)
}

export default DisplayStoryReviews