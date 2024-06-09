import { Skeleton } from "@/components/ui/skeleton"
import { THREADS_PER_PAGE, ThreadsContext } from "@/utils/providers/ThreadsProvider/config"
import { DiscussionThreadType } from "@/utils/types/discussion.types"
import { AvatarIcon } from "@radix-ui/react-icons"
import { Separator } from "@radix-ui/react-separator"
import dayjs from "dayjs"
import { useContext, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"

const CommentPageComponent = ({ comments, numOfElements = THREADS_PER_PAGE }: { comments: DiscussionThreadType[], numOfElements?: number }) => {

  if (!comments || comments.length === 0) {
    const elementIndexes = Array.from(Array(numOfElements).keys())
    return (
      <div>
        <Separator className="h-5 bg-red-500" />
        {elementIndexes.map(commentIndex => <SkeletonCommentComponent key={`comment-${commentIndex}`} />)}
      </div>
    )
  }

  return (
    <div>
      <Separator className="h-5 bg-red-500" />
      {(comments || []).map(thread => <CommentComponent key={thread.id} comment={thread} />)}
    </div>
  )
}

const SkeletonCommentComponent = () => {
  return (
    <div className="p-6 mb-4 bg-slate-800 rounded-lg shadow">
      <div className="mb-4">
        <div className="ml-4 text-slate-500 flex gap-2 items-center">
          <Skeleton className="size-[32px] rounded-full" />
          <Skeleton className="h-[20px] w-[100px]" />
        </div>
      </div>
      <div>
        <Skeleton className="h-[24px] w-full mb-4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-[20px] w-[200px]" />
        </div>
      </div>
    </div>
  );
}


const CommentComponent = ({ comment }: { comment: DiscussionThreadType }) => {
  return (
    <div key={comment.id} className="p-6 mb-4 bg-slate-800 rounded-lg shadow">
      <div className="mb-4">
        <div className="ml-4 text-slate-500 flex gap-2 items-center">
          <AvatarIcon className="size-8" />
          <span className="text-sm font-semibold">{comment.author.penName}</span>
        </div>
      </div>
      <div>
        <p className="mb-4 text-slate-300">{comment.content}</p>
        <div className="flex justify-between items-center text-slate-300">
          <span className="text-sm font-semibold text-slate-500">Creation Date: {dayjs(comment.createdOn).format('YYYY-MM-DD HH:mm')}</span>
        </div>
      </div>
    </div>
  );
};

const ThreadsOfDiscussion = () => {
  const { discussionId } = useParams()
  const { setDiscussionId, isLoading, threadsDict, paginationCount } = useContext(ThreadsContext)
  const pagesConfig = useMemo(() => {
    if (!paginationCount || paginationCount.totalPages === 0) {
      return;
    }
    const { totalPages, totalElements } = paginationCount
    const pages = Array.from(Array(totalPages).keys())
    const lastPageCount = totalElements - THREADS_PER_PAGE * (totalPages - 1)

    return { pages, lastPageCount }
  }, [paginationCount])
  
  useEffect(() => {
    setDiscussionId(discussionId || 0)
  }, [discussionId])

  if (isLoading) {
    return null
  }

  return (
    <div>{
      (pagesConfig?.pages || []).map((page) => {
        const comments = threadsDict[page]
        const lastPage = page === (paginationCount?.totalPages || 0) - 1
        if (lastPage) {
          return (<CommentPageComponent key={`threads-page-${page}`} comments={comments} numOfElements={pagesConfig?.lastPageCount || 0} />)
        }

        return (<CommentPageComponent key={`threads-page-${page}`} comments={comments} />)
      })
    }</div>
  )
}

export default ThreadsOfDiscussion