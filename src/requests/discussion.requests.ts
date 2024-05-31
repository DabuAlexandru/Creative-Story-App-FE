import { axiosRequest, RequestMethod } from "./axiosHandler/axios.handler";

const baseURL = '/discussion';

export const getAllDiscussionsPaginate = async ({ page, size }: { page: number, size: number }) => {
    return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/get-all/paginate?page=${page}&size=${size}` })
}

export const getAllDiscussionsOfAuthorPaginate = async ({ authorId, page, size }: { authorId: string | number, page: number, size: number }) => {
    return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/get-all/of-author/paginate/${authorId}?page=${page}&size=${size}` })
}

export const getAllDiscussionsOfStoryPaginate = async ({ storyId, page, size }: { storyId: string | number, page: number, size: number }) => {
    return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/get-all/of-story/paginate/${storyId}?page=${page}&size=${size}` })
}

export const getDiscussionn = async (discussionId: string | number) => {
    return await axiosRequest({ method: RequestMethod.GET, requestURL: `${baseURL}/${discussionId}` })
}

export const createNewDiscussio = async (payload: { title: string, content: string }) => {
    return await axiosRequest({ method: RequestMethod.POST, requestURL: `${baseURL}/create`, payload })
}

export const updateDiscussio = async (discussionId: string | number, payload: { title: string, content: string }) => {
    return await axiosRequest({ method: RequestMethod.PUT, requestURL: `${baseURL}/update/${discussionId}`, payload })
}