import { NoteType } from "@/utils/types/section.types";
import { axiosRequest, RequestMethod } from "./axiosHandler/axios.handler";

const baseURL = '/section-note';

// Retrieve all notes of a section with pagination
export const retrieveAllSectionNotesPaginate = async ({ sectionId, page, size }: { sectionId: number, page: number, size: number }) => {
  const url = `${baseURL}/get-all/of-section/paginate/${sectionId}?page=${page}&size=${size}`;
  return await axiosRequest({ method: RequestMethod.GET, requestURL: url });
}

// Retrieve all sections of a section
export const retrieveAllSectionNotes = async (sectionId: number) => {
  const url = `${baseURL}/get-all/of-section/${sectionId}`;
  return await axiosRequest({ method: RequestMethod.GET, requestURL: url });
}

// Create a new note for a section
export const createNewSectionNote = async (sectionId: number, newSectionNote: NoteType) => {
  const url = `${baseURL}/create/for-section/${sectionId}`;
  return await axiosRequest({ method: RequestMethod.POST, requestURL: url, payload: newSectionNote });
}

// Update note by note ID
export const updateSectionNote = async (sectionNoteId: number, updatedSectionNote: NoteType) => {
  const url = `${baseURL}/update/${sectionNoteId}`;
  return await axiosRequest({ method: RequestMethod.PUT, requestURL: url, payload: updatedSectionNote });
}

// Delete note by note ID
export const deleteSectionNote = async (sectionNoteId: number) => {
  const url = `${baseURL}/delete/${sectionNoteId}`;
  return await axiosRequest({ method: RequestMethod.DELETE, requestURL: url });
}