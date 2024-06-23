import { getAllThreadsOfMainThreadPaginate } from "@/requests/discussion.thread.requests"
import { makeRequest } from "@/requests/request.handler"
import { DiscussionThreadType } from "@/utils/types/discussion.types"
import { Paginated } from "@/utils/types/general.types"
import { ReactNode, useEffect, useMemo, useState } from "react"
import { CommentComponent } from "./CommentComponent"
import { Button } from "@/components/ui/button"
import { StyledSpinner } from "@/components/custom/Spinner/Spinner"

const COMMENTS_PAGE_SIZE = 3
const MARGIN_OFFSET = 1.5

const SubcommentsWrapper = ({ children, levelOffset }: { children: ReactNode | ReactNode[], levelOffset: number }) => {
  return (<div
    className="border-solid border-l-2 border-slate-800 text-sm"
    style={{
      marginLeft: `${MARGIN_OFFSET}%`,
      paddingLeft: `${levelOffset - MARGIN_OFFSET}%`
    }}
  >
    {children}
  </div>)
}

const CommentThreadComponent = ({ commentId, commentsCount, level }: { commentId: number, commentsCount: number, level: number }) => {
  const [lastPage, setLastPage] = useState<number>(0)
  const [isLoadingNewPage, setIsLoadingNewPage] = useState<boolean>(false)
  const [comments, setComments] = useState<DiscussionThreadType[]>([])
  const levelOffset = useMemo(() => 2.5 * ((level || 0) + 1), [level])

  const pageCount = Math.ceil(commentsCount / COMMENTS_PAGE_SIZE)
  const hasMorePages = lastPage < pageCount - 1

  useEffect(() => {
    makeRequest({
      request: () => getAllThreadsOfMainThreadPaginate({ mainThreadId: commentId, page: lastPage, size: COMMENTS_PAGE_SIZE }),
      setIsLoading: setIsLoadingNewPage,
      onReceiveResponse: (paginationResponse: Paginated<DiscussionThreadType>) =>
        setComments([...comments, ...paginationResponse.content])
    })
  }, [lastPage])

  return (
    <SubcommentsWrapper levelOffset={levelOffset}>
      {comments.map(comment => <CommentComponent key={comment.id} comment={comment} level={level + 1} />)}
      <div className="w-full flex items-center mt-4 mb-5 flex-col">
        {(!isLoadingNewPage && hasMorePages)
          ? <Button
            className="w-4/5"
            variant={"ghost"}
            onClick={() => setLastPage(lastPage + 1)}
          >
            Show More
          </Button>
          : null
        }
        {isLoadingNewPage ? <StyledSpinner /> : null}
      </div>
    </SubcommentsWrapper>
  )
}

export default CommentThreadComponent