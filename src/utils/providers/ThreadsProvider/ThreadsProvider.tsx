import { useState, useEffect, useCallback, ReactNode } from "react";
import { PagesCountType } from "../../types/general.types";
import { makeRequest } from "@/requests/request.handler";
import { getThreadsOfDiscussionPagesCount } from "@/requests/discussion.thread.requests";
import { ThreadsPromiseDictType, ThreadsDictType, THREADS_PER_PAGE, getThreadsWindowByPage, ThreadsContextProps, ThreadsContext } from "./config";

const DELAY_TIME = 500;

const ThreadsProvider = ({ children }: { children: ReactNode }) => {
  const [discussionId, setDiscussionId] = useState<number | string>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [threadsPromiseDict, setThreadsPromiseDict] = useState<ThreadsPromiseDictType>({})
  const [threadsDict, setThreadsDict] = useState<ThreadsDictType>({})
  const [paginationCount, setPaginationCount] = useState<PagesCountType | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [timeoutIds, setTimeoutIds] = useState<{ [key: number]: NodeJS.Timeout | null }>({});

  const handleViewPage = useCallback((inView: boolean, page: number) => {
    if (!inView) {
      if (timeoutIds[page]) {
        clearTimeout(timeoutIds[page]!);
        setTimeoutIds(prevTimeoutIds => ({ ...prevTimeoutIds, [page]: null }));
      }
      return;
    }

    const id = setTimeout(() => {
      setCurrentPage(page);
    }, DELAY_TIME);

    setTimeoutIds(prevTimeoutIds => ({ ...prevTimeoutIds, [page]: id }));
  }, [timeoutIds, setCurrentPage]);

  const pageStateInfo = { discussionId, currentPage, paginationCount }
  const dictInfo = { threadsPromiseDict, setThreadsPromiseDict, threadsDict, setThreadsDict }

  const prepareNewDiscussion = useCallback(async (discussionId: number | string) => {
    if (!discussionId) {
      return;
    }
    setCurrentPage(0)
    setThreadsPromiseDict({})

    setIsLoading(true)

    const pageCount = await makeRequest<PagesCountType>({ request: () => getThreadsOfDiscussionPagesCount({ discussionId, size: THREADS_PER_PAGE }) })
    setPaginationCount(pageCount)
    const newPageStateInfo = { discussionId, currentPage, paginationCount: pageCount }
    await getThreadsWindowByPage(newPageStateInfo, dictInfo, setIsLoading)
    setIsLoading(false)
  }, [])

  const refreshDiscussion = useCallback(() => {
    prepareNewDiscussion(discussionId)
  }, [discussionId])

  useEffect(() => {
    if (!discussionId) {
      return;
    }
    prepareNewDiscussion(discussionId)
  }, [discussionId])

  useEffect(() => {
    getThreadsWindowByPage(pageStateInfo, dictInfo, setIsLoading)
  }, [currentPage])

  const storeForProvider: ThreadsContextProps = {
    discussionId, setDiscussionId, isLoading, paginationCount, currentPage, handleViewPage, threadsDict, refreshDiscussion
  }

  return (
    <ThreadsContext.Provider value={storeForProvider}>
      {children}
    </ThreadsContext.Provider>
  );
};

export default ThreadsProvider
