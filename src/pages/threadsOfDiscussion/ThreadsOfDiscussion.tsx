import { Skeleton } from "@/components/ui/skeleton";
import { THREADS_PER_PAGE, ThreadsContext } from "@/utils/providers/ThreadsProvider/config";
import { DiscussionThreadType } from "@/utils/types/discussion.types";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import dayjs from "dayjs";
import { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { InView } from "react-intersection-observer";

const CommentPageComponent = ({ pageNo, numOfElements = THREADS_PER_PAGE }: { pageNo: number, numOfElements?: number }) => {
  const { threadsDict, handleViewPage } = useContext(ThreadsContext);
  const comments = useMemo(() => threadsDict[pageNo], [threadsDict[pageNo]])

  const stillUnloaded = !comments || comments.length === 0
  const elementIndexes = Array.from(Array(numOfElements).keys());

  return (
    <InView as="div" onChange={(inView, _entry) => handleViewPage(inView, pageNo)}>
      <Separator className="h-5 bg-red-500" />
      {stillUnloaded
        ? elementIndexes.map(commentIndex => <SkeletonCommentComponent key={`comment-${commentIndex}`} />)
        : (comments || []).map(thread => <CommentComponent key={thread.id} comment={thread} />)
      }
    </InView>
  );
};

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
};

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
  const { discussionId } = useParams();
  const { setDiscussionId, paginationCount } = useContext(ThreadsContext);

  const pagesConfig = useMemo(() => {
    if (!paginationCount || paginationCount.totalPages === 0) {
      return;
    }
    const { totalPages, totalElements } = paginationCount;
    const pages = Array.from(Array(totalPages).keys());
    const lastPageCount = totalElements - THREADS_PER_PAGE * (totalPages - 1);

    return { pages, lastPageCount };
  }, [paginationCount]);

  useEffect(() => {
    setDiscussionId(discussionId || 0);
  }, [discussionId]);

  return (
    <div>{
      (pagesConfig?.pages || []).map((page) => {
        const lastPage = page === (paginationCount?.totalPages || 0) - 1;
        let lastPageCount: number | undefined;
        if (lastPage) {
          lastPageCount = pagesConfig?.lastPageCount || 0
        }
        return (<CommentPageComponent pageNo={page} key={`threads-page-${page}`} numOfElements={lastPageCount} />);
      })
    }</div>
  );
};

export default ThreadsOfDiscussion;