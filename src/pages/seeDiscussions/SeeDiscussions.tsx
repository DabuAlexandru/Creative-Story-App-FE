import PaginationControl from "@/components/custom/PaginationControl/PaginationControl"
import { getAllDiscussionsPaginate } from "@/requests/discussion.requests"
import { makeRequest } from "@/requests/request.handler"
import { DiscussionType } from "@/utils/types/discussion.types"
import { Paginated, emptyPaginated } from "@/utils/types/general.types"
import { debounce } from "lodash"
import { useCallback, useEffect, useMemo, useState } from "react"
import { DISCUSSIONS_PER_PAGE } from "./utils"
import { AvatarIcon } from "@radix-ui/react-icons"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

const DiscussionCard = ({ discussion }: { discussion: DiscussionType }) => {
  const navigate = useNavigate()
  if (!discussion) {
    return null
  }

  return (
    <div key={discussion.id} className="p-6 mb-4 bg-slate-800 rounded-lg shadow">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{discussion.title}</h2>
        <div className="ml-4 text-slate-500 flex gap-2 items-center">
          <AvatarIcon className="size-8" />
          <span className="text-sm font-semibold">{discussion.author.penName}</span>
        </div>
      </div>
      <div onClick={() => navigate(`/see-threads/of-discussion/${discussion.id}`)}>
        <p className="mb-4 text-slate-300">{discussion.content}</p>
        <div className="flex justify-between items-center text-slate-300">
          <span className="text-sm font-semibold text-slate-500 ">Creation Date: {dayjs(discussion.createdOn).format('YYYY-MM-DD HH:mm')}</span>
          <span className="cursor-pointer text-blue-500">{discussion.commentsCount} comments</span>
        </div>
      </div>
    </div>
  )
}

const SeeDiscussions = () => {
  const [paginatedDiscussions, setPaginatedDiscussions] = useState<Paginated<DiscussionType>>(emptyPaginated)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const paginationRequest = useCallback((currentPage: number) => {
    const pagination = { size: DISCUSSIONS_PER_PAGE, page: currentPage - 1 }
    makeRequest({ request: () => getAllDiscussionsPaginate(pagination), setObject: setPaginatedDiscussions, setIsLoading })
  }, [currentPage])

  const debouncedPaginationRequest = useMemo(() => debounce(paginationRequest, 300), [])

  useEffect(() => {
    return () => {
      debouncedPaginationRequest.cancel()
    }
  }, [debouncedPaginationRequest])

  useEffect(() => {
    paginationRequest(currentPage)
  }, [])

  useEffect(() => {
    debouncedPaginationRequest(currentPage)
  }, [currentPage])

  const loadingStyle = isLoading ? 'opacity-80' : 'opacity-100'

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <PaginationControl className="my-2" pageCount={paginatedDiscussions.totalPages || 1} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className={`w-4/5 p-10 max-h-[80vh] overflow-auto ${loadingStyle}`}>
        <div>{paginatedDiscussions.content.map((discussion) => <DiscussionCard discussion={discussion} />)}</div>
      </div>
    </div>
  )
}

export default SeeDiscussions