import { Skeleton } from "@/components/ui/skeleton";
import { THREADS_PER_PAGE, ThreadsContext } from "@/utils/providers/ThreadsProvider/config";
import { DiscussionThreadType, DiscussionType } from "@/utils/types/discussion.types";
import { AvatarIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { InView } from "react-intersection-observer";
import { DiscussionCard } from "../seeDiscussions/SeeDiscussions";
import { makeRequest } from "@/requests/request.handler";
import { getDiscussion } from "@/requests/discussion.requests";
import AuthorAvatar from "@/components/custom/AuthorAvatar/AuthorAvatar";

const CommentPageComponent = ({ pageNo, numOfElements = THREADS_PER_PAGE }: { pageNo: number, numOfElements?: number }) => {
  const { threadsDict, handleViewPage } = useContext(ThreadsContext);
  const comments = useMemo(() => threadsDict[pageNo], [threadsDict[pageNo]])

  const stillUnloaded = !comments || comments.length === 0
  const elementIndexes = Array.from(Array(numOfElements).keys());

  return (
    <InView as="div" onChange={(inView, _entry) => handleViewPage(inView, pageNo)}>
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
        <AuthorAvatar author={comment.author} className="size-8" />
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

const DiscussionTitlePreview = ({ discussion }: { discussion: DiscussionType }) => {
  return (
    <div key={`preview-${discussion.id}`} className="p-6 mb-4 bg-slate-800 rounded-lg shadow fixed left-0 right-0 top-14 z-10 border-slate-950 border-s-2 fixed-position">
      <div className="flex justify-between items-center">
        <div className="flex">
          <h2 className="text-xl font-bold">{discussion.title}</h2>
          <div className="ml-4 text-slate-500 flex gap-2 items-center">
            <AuthorAvatar author={discussion.author} className="size-8" />
            <span className="text-sm font-semibold">{discussion.author.penName}</span>
          </div>
        </div>
        <div>
          <span className="text-sm font-semibold text-slate-500 ">Creation Date: {dayjs(discussion.createdOn).format('YYYY-MM-DD HH:mm')}</span>
          <span className="ml-4 cursor-pointer text-blue-500">{discussion.commentsCount} comments</span>
        </div>
      </div>
    </div>
  )
}

const DisplayDiscussionConditional = ({ discussion }: { discussion: DiscussionType | undefined }) => {
  const [isInView, setIsInView] = useState(true);

  if (!discussion) {
    return null;
  }

  return (
    <div>
      <InView
        as="div"
        onChange={(inView) => setIsInView(inView)}
        threshold={0}
      >
        <div>
          <DiscussionCard discussion={discussion} />
        </div>
      </InView>
      <div className={`discussion-title-preview-wrapper ${isInView ? 'discussion-card-hidden' : 'discussion-card-visible'}`}>
        <DiscussionTitlePreview discussion={discussion} />
      </div>
    </div>
  );
}


const ThreadsOfDiscussion = () => {
  const { discussionId } = useParams();
  const { setDiscussionId, paginationCount } = useContext(ThreadsContext);
  const [discussion, setDiscussion] = useState<DiscussionType>()

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
    makeRequest({ request: () => getDiscussion(discussionId || 0), setObject: setDiscussion })
  }, [discussionId]);

  return (
    <div>
      <DisplayDiscussionConditional discussion={discussion} />
      <div className="flex flex-col items-center">
        <div className="w-4/5">
          {
            (pagesConfig?.pages || []).map((page) => {
              const lastPage = page === (paginationCount?.totalPages || 0) - 1;
              let lastPageCount: number | undefined;
              if (lastPage) {
                lastPageCount = pagesConfig?.lastPageCount || 0
              }
              return (<CommentPageComponent pageNo={page} key={`threads-page-${page}`} numOfElements={lastPageCount} />);
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ThreadsOfDiscussion;