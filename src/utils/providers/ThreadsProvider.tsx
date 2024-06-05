import { createContext, useState, FC, useEffect } from "react";
import { Paginated, StateSetter } from "../types/general.types";
import { DiscussionThreadType } from "../types/discussion.types";
import { makeRequest } from "@/requests/request.handler";
import { getAllThreadsOfDiscussionPaginate } from "@/requests/discussion.thread.requests";

const THREADS_PER_PAGE = 5
// const W

type ThreadsContextProps = {
  discussionId: number | string, setDiscussionId: StateSetter<number | string>
}

type ThreadsPromiseType = Promise<Paginated<DiscussionThreadType> | undefined>

type ThreadsPromiseDictType = {
  [page: number]: ThreadsPromiseType
}

const ThreadsContext = createContext<ThreadsContextProps>({
  discussionId: 0, setDiscussionId: () => { }
});

const ThreadsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [discussionId, setDiscussionId] = useState<number | string>(0)
  const [threadsPromiseDict, setThreadsPromiseDict] = useState<ThreadsPromiseDictType>({})

  useEffect(() => {

  }, [discussionId])

  const getThreadsPromiseByPage = (page: number): ThreadsPromiseType => {
    if (!threadsPromiseDict[page]) {
      const futureThreadsPromiseDict: ThreadsPromiseDictType = { ...threadsPromiseDict }

      futureThreadsPromiseDict[page] = makeRequest<Paginated<DiscussionThreadType>>({ request: () => getAllThreadsOfDiscussionPaginate({ discussionId, page, size: THREADS_PER_PAGE }) })

      return futureThreadsPromiseDict[page]
    }

    return threadsPromiseDict[page];
  }

  const getThreadsWindowByPage = (page: number): ThreadsPromiseDictType => {
    const pagesDict: ThreadsPromiseDictType = {}

    return pagesDict
  }

  const storeForProvider: ThreadsContextProps = {
    discussionId, setDiscussionId
  }

  return (
    <ThreadsContext.Provider value={storeForProvider}>
      {children}
    </ThreadsContext.Provider>
  );
};

export { ThreadsContext };
export default ThreadsProvider;
