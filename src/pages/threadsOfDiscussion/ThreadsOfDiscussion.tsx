import { THREADS_PER_PAGE, ThreadsContext } from "@/utils/providers/ThreadsProvider/config";
import { DiscussionType } from "@/utils/types/discussion.types";
import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { InView } from "react-intersection-observer";
import { DiscussionCard } from "../seeDiscussions/SeeDiscussions";
import { makeRequest } from "@/requests/request.handler";
import { getDiscussion } from "@/requests/discussion.requests";
import { CommentPageComponent } from "./components/CommentPageComponent";
import { DiscussionTitlePreview } from "./components/DiscussionTitlePreview";

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