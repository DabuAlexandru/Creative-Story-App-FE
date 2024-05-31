import { axiosRequest, RequestMethod } from "./axiosHandler/axios.handler";

const baseURL = '/discussion-thread';

export const getAllThreadsOfMainThreadPaginate = async ({ mainThreadId, page, size }: { mainThreadId: string | number, page: number, size: number }) => {
    return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/get-all/of-thread/paginate/${mainThreadId}?page=${page}&size=${size}` })
}

export const getAllThreadsOfMainThread = async ( mainThreadId: string | number ) => {
    return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/get-all/of-thread/${mainThreadId}` })
}

export const getAlThreadslOfAuthorPaginate = async ({ authorId, page, size }: { authorId: string | number, page: number, size: number }) => {
    return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/get-all/of-author/paginate/${authorId}?page=${page}&size=${size}` })
}

export const getAllThreadsOfDiscussionPaginate = async ({ discussionId, page, size }: { discussionId: string | number, page: number, size: number }) => {
    return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/get-all/of-discussio/paginate/${discussionId}?page=${page}&size=${size}` })
}

export const getDiscussionThread = async (threadId: string | number) => {
    return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/${threadId}` })
}

export const createNewDiscussionThread = async (payload: { content: string }) => {
    return await axiosRequest({ method: RequestMethod.POST, requestURL: `${baseURL}/create`, payload })
}

export const updateDiscussionThread = async (threadId: string | number, payload: { content: string }) => {
    return await axiosRequest({ method: RequestMethod.PUT, requestURL: `${baseURL}/update/${threadId}`, payload })
}