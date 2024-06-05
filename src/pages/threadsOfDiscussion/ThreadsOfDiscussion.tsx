import { getAllThreadsOfDiscussionPaginate } from "@/requests/discussion.thread.requests"
import { makeRequest } from "@/requests/request.handler"
import { DiscussionThreadType } from "@/utils/types/discussion.types"
import { Paginated, emptyPaginated } from "@/utils/types/general.types"
import { AvatarIcon } from "@radix-ui/react-icons"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

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
  const [threadsPaginated, setThreadsPaginated] = useState<Paginated<DiscussionThreadType>>(emptyPaginated)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    if (!discussionId) {
      return;
    }
    makeRequest({ request: () => getAllThreadsOfDiscussionPaginate({ discussionId, page: currentPage, size: 10 }), setIsLoading, setObject: setThreadsPaginated })
  }, [])

  if (isLoading || threadsPaginated.empty) {
    return null
  }

  return (
    <div>{(threadsPaginated.content || []).map(thread => <CommentComponent comment={thread} />)}</div>
  )
}

export default ThreadsOfDiscussion