import { THREADS_PER_PAGE, ThreadsContext } from "@/utils/providers/ThreadsProvider/config";
import { useContext, useMemo } from "react";
import { InView } from "react-intersection-observer";
import { SkeletonCommentComponent } from "./SkeletonCommentComponent";
import { CommentComponent } from "./CommentComponent";

export const CommentPageComponent = ({
  pageNo,
  discussionId,
  numOfElements = THREADS_PER_PAGE
}: {
  pageNo: number;
  discussionId: number | string
  numOfElements?: number;
}) => {
  const { threadsDict, handleViewPage } = useContext(ThreadsContext);
  const comments = useMemo(() => threadsDict[pageNo], [threadsDict[pageNo]])

  const stillUnloaded = !comments || comments.length === 0
  const elementIndexes = Array.from(Array(numOfElements).keys());

  return (
    <InView as="div" onChange={(inView, _entry) => handleViewPage(inView, pageNo)}>
      {stillUnloaded
        ? elementIndexes.map(commentIndex => <SkeletonCommentComponent key={`comment-${commentIndex}`} />)
        : (comments || []).map(thread => <CommentComponent key={thread.id} comment={thread} discussionId={discussionId} />)
      }
    </InView>
  );
};