import PaginationControl from "@/components/custom/PaginationControl/PaginationControl"
import { getAllDiscussionsPaginate } from "@/requests/discussion.requests"
import { makeRequest } from "@/requests/request.handler"
import { DiscussionType } from "@/utils/types/discussion.types"
import { Paginated, StateSetter, emptyPaginated } from "@/utils/types/general.types"
import { debounce } from "lodash"
import { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { DISCUSSIONS_PER_PAGE } from "./utils"
import dayjs from "dayjs"
import { useLocation, useNavigate } from "react-router-dom"
import AuthorAvatar from "@/components/custom/AuthorAvatar/AuthorAvatar"
import { PartialVoteComponent } from "../threadsOfDiscussion/components/VoteComponent"
import { voteForDiscussion } from "@/requests/vote.requests"
import { VoteStateType } from "@/utils/types/vote.types"
import ReplyDialogWrapper from "../threadsOfDiscussion/components/ReplyDialogWrapper"
import { ThreadsContext } from "@/utils/providers/ThreadsProvider/config"

const PartialDiscussionCard = ({
  discussion,
  children
}: {
  discussion: DiscussionType;
  children: ReactNode
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const targetPath = `/see-threads/of-discussion/${discussion.id}`;

  const handleNavigation = () => {
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  };

  return (
    <div key={discussion.id} className="p-6 mb-4 bg-slate-800 rounded-lg shadow">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{discussion.title}</h2>
        <div className="ml-4 text-slate-500 flex gap-2 items-center">
          <AuthorAvatar author={discussion.author} className="size-8" />
          <span className="text-sm font-semibold">{discussion.author.penName}</span>
        </div>
      </div>
      <div>
        <p className="mb-4 text-slate-300">{discussion.content}</p>
        <div className="flex justify-between items-center text-slate-300">
          <span className="text-sm font-semibold text-slate-500 ">Creation Date: {dayjs(discussion.createdOn).format('YYYY-MM-DD HH:mm')}</span>
          <div className="flex items-center gap-4">
            {children}
            <span className="cursor-pointer text-blue-500" onClick={handleNavigation}>{discussion.commentsCount} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const DiscussionCard = ({ discussion }: { discussion: DiscussionType }) => {
  return (
    <PartialDiscussionCard discussion={discussion} children={null} />
  )
}

export const DiscussionCardVoteState = ({
  discussion,
  userVote,
  setUserVote
}: {
  discussion: DiscussionType
  userVote: VoteStateType
  setUserVote: StateSetter<VoteStateType>
}) => {
  const { refreshDiscussion } = useContext(ThreadsContext)

  return (
    <PartialDiscussionCard discussion={discussion}>
      <PartialVoteComponent
        userVote={userVote}
        setUserVote={setUserVote}
        initialVote={discussion.userVote}
        voteTally={discussion.voteValue}
        castUserVote={(voteValue) => voteForDiscussion({ voteValue, discussionId: discussion.id })}
      />
      <ReplyDialogWrapper discussionId={discussion.id} onCreateNewComment={refreshDiscussion} >
        <button className="select-none flex items-center gap-1 text-slate-500 hover:text-slate-300">
          <span>Reply</span>
        </button>
      </ReplyDialogWrapper>
    </PartialDiscussionCard>
  )
}

const SeeDiscussions = () => {
  const [paginatedDiscussions, setPaginatedDiscussions] = useState<Paginated<DiscussionType>>(emptyPaginated)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(0)

  const paginationRequest = useCallback((currentPage: number) => {
    const pagination = { size: DISCUSSIONS_PER_PAGE, page: currentPage }
    makeRequest({
      request: () => getAllDiscussionsPaginate(pagination),
      setObject: setPaginatedDiscussions,
      setIsLoading
    })
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