import { getAllThreadsOfDiscussionPaginate } from "@/requests/discussion.thread.requests"
import { makeRequest } from "@/requests/request.handler"
import { getUniqueList } from "@/utils/helpers/helper.list"
import { DiscussionThreadType } from "@/utils/types/discussion.types"
import { Paginated, StateSetter, PagesCountType } from "@/utils/types/general.types"
import { createContext } from "react"

export const THREADS_PER_PAGE = 5

export type PaginationResultType = Paginated<DiscussionThreadType> | undefined
export type ThreadsPromiseType = Promise<PaginationResultType>

export type ThreadsDictType = {
  [page: number]: DiscussionThreadType[]
}

export type ThreadsPromiseDictType = {
  [page: number]: ThreadsPromiseType
}

export type ThreadsContextProps = {
  discussionId: number | string;
  setDiscussionId: StateSetter<number | string>;
  isLoading: boolean;
  paginationCount: PagesCountType | undefined;
  currentPage: number;
  handleViewPage: (inView: boolean, page: number) => void;
  threadsDict: ThreadsDictType;
}

export type PageStateInfoType = {
  discussionId: number | string;
  currentPage: number
  paginationCount: PagesCountType | undefined
}

export type DictInfoType = {
  threadsPromiseDict: ThreadsPromiseDictType
  setThreadsPromiseDict: StateSetter<ThreadsPromiseDictType>
  threadsDict: ThreadsDictType
  setThreadsDict: StateSetter<ThreadsDictType>
}

export const ThreadsContext = createContext<ThreadsContextProps>({
  discussionId: 0,
  setDiscussionId: () => { },
  isLoading: false,
  paginationCount: undefined,
  currentPage: 0,
  handleViewPage: () => { },
  threadsDict: {}
});


export const getThreadsPromiseByPage = ({
  discussionId,
  page,
  threadsPromiseDict,
  setThreadsPromiseDict
}: {
  discussionId: number | string,
  page: number,
  threadsPromiseDict: ThreadsPromiseDictType
  setThreadsPromiseDict: StateSetter<ThreadsPromiseDictType>
}): ThreadsPromiseType => {
  if (!threadsPromiseDict[page]) {
    const newPage = makeRequest<Paginated<DiscussionThreadType>>({ request: () => getAllThreadsOfDiscussionPaginate({ discussionId, page, size: THREADS_PER_PAGE }) })
    setThreadsPromiseDict(oldDict => ({ ...oldDict, [page]: newPage }))

    return newPage
  }

  return threadsPromiseDict[page];
}

export const getThreadsWindowByPage = async (pageStateInfo: PageStateInfoType, dictInfo: DictInfoType, setIsLoading: StateSetter<boolean>): Promise<ThreadsDictType> => {
  const { paginationCount, discussionId, currentPage } = pageStateInfo
  const { setThreadsDict, threadsPromiseDict, setThreadsPromiseDict } = dictInfo
  const numOfPages = paginationCount?.totalPages || 0

  const pagesDict: ThreadsDictType = {}
  if (!numOfPages || !discussionId) {
    return pagesDict
  }
  const pages = getUniqueList([Math.max(currentPage - 1, 0), currentPage, Math.min(currentPage + 1, numOfPages - 1)])

  setIsLoading(true)
  const resolvedPromises = await Promise.allSettled(pages.map(page => getThreadsPromiseByPage({ page, discussionId, threadsPromiseDict, setThreadsPromiseDict })))
  pages.forEach((page, index) => {
    const resolvedPromise = resolvedPromises[index]
    if (resolvedPromise.status === "fulfilled") {
      pagesDict[page] = (resolvedPromises[index] as PromiseFulfilledResult<PaginationResultType>).value?.content || []
    }
  })
  setThreadsDict(oldDict => ({ ...oldDict, ...pagesDict }))
  setIsLoading(false)
  return pagesDict
}