import { makeRequest } from "@/requests/request.handler"
import { retrieveAllReviewsOfStoryPaginate } from "@/requests/story.review.requests"
import { Paginated, emptyPaginated } from "@/utils/types/general.types"
import { ReviewType } from "@/utils/types/story.types"
import { useCallback, useEffect, useMemo, useState } from "react"
import ReviewCard from "../../ReviewCard/ReviewCard"
import PaginationControl from "../../PaginationControl/PaginationControl"
import { Separator } from "@/components/ui/separator"
import { debounce } from "lodash"

const REVIEWS_COUNT = 4

const DisplayStoryReviews = ({ storyId, reviewsCount = REVIEWS_COUNT, className = '' }: { storyId: string | number, reviewsCount?: number, className?: string }) => {
  console.log("storyId:", storyId)
  const [paginatedReviews, setPaginatedReviews] = useState<Paginated<ReviewType>>(emptyPaginated)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const paginationRequest = useCallback((currentPage: number) => {
    if (!storyId) {
      return;
    }
    const pagination = { size: reviewsCount, page: currentPage - 1 }
    makeRequest({ request: () => retrieveAllReviewsOfStoryPaginate(storyId, pagination), setObject: setPaginatedReviews, setIsLoading })
  }, [currentPage])

  const debouncedPaginationRequest = useMemo(() => debounce(paginationRequest, 300), [])

  useEffect(() => {
    return () => {
      debouncedPaginationRequest.cancel()
    }
  }, [debouncedPaginationRequest])

  useEffect(() => {
    debouncedPaginationRequest(currentPage)
  }, [currentPage])

  useEffect(() => {
    paginationRequest(currentPage)
  }, [storyId])

  return (<div className={isLoading ? 'opacity-80' : 'opacity-100'}>
    <Separator className="mt-4" />
    <PaginationControl className="my-2" pageCount={paginatedReviews?.totalPages || 1} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    <Separator className="mb-4" />
    <div className={`overflow-auto ${className || ''}`}>
      {paginatedReviews.content.map((review) => <ReviewCard key={`review-${review.id}`} review={review} />)}
    </div>
  </div>)
}

export default DisplayStoryReviews