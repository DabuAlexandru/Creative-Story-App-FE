import { SectionType } from "@/utils/types/section.types";
import { RequestMethod, axiosRequest } from "./axiosHandler/axios.handler";

const baseURL = '/section';

// Retrieve all sections of a story with pagination
export const retrieveAllSectionsPaginate = async ({ storyId, page, size }: { storyId: number, page: number, size: number }) => {
  const url = `${baseURL}/get-all/of-story/paginate/${storyId}?page=${page}&size=${size}`;
  return await axiosRequest({ method: RequestMethod.GET, requestURL: url });
}

// Retrieve all sections of a story
export const retrieveAllSections = async (storyId: number) => {
  const url = `${baseURL}/get-all/of-story/${storyId}`;
  return await axiosRequest({ method: RequestMethod.GET, requestURL: url });
}

// Retrieve all sections of a story with content
export const retrieveAllSectionsWithContent = async (storyId: number | string) => {
  const url = `${baseURL}/get-all/of-story/with-content/${storyId}`;
  return await axiosRequest({ method: RequestMethod.GET, requestURL: url });
}

// Retrieve section content by section ID
export const retrieveSectionContent = async (sectionId: number) => {
  const url = `${baseURL}/get/content/${sectionId}`;
  return await axiosRequest({ method: RequestMethod.GET, requestURL: url });
}

export const retrieveLastModifiedSectionOfStory = async (storyId: number) => {
  const url = `${baseURL}/get/last-modified/of-story/${storyId}`;
  return await axiosRequest({ method: RequestMethod.GET, requestURL: url });
}

// Create a new section for a story
export const createNewSection = async (storyId: number, newSection: SectionType) => {
  const url = `${baseURL}/create/for-story/${storyId}`;
  return await axiosRequest({ method: RequestMethod.POST, requestURL: url, payload: newSection });
}

// Update section by section ID
export const updateSection = async (sectionId: number, updatedSection: SectionType) => {
  const url = `${baseURL}/update/${sectionId}`;
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: url, payload: updatedSection });
}

// Update section list
export const updateSectionList = async (updatedSections: SectionType[]) => {
  const url = `${baseURL}/update-list`;
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: url, payload: updatedSections });
}

// Update section content by section ID
export const updateSectionContent = async (sectionId: number, content: string) => {
  const url = `${baseURL}/update/content/${sectionId}`;
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: url, payload: { content } });
}

// Delete section by section ID
export const deleteSection = async (sectionId: number) => {
  const url = `${baseURL}/delete/${sectionId}`;
  return await axiosRequest({ method: RequestMethod.DELETE, requestURL: url });
}