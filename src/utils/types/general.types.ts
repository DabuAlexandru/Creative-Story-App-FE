
export type FlexibleObject = { [key: string]: any }

export type APIResponseType = {
  error: boolean
  message: string
} & FlexibleObject

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>

export interface Paginated<T> {
  content: T[]; // Array of items in the current page
  empty: boolean; // Whether the content is empty
  first: boolean; // Whether this is the first page
  last: boolean; // Whether this is the last page
  number: number; // The current page number (0-based)
  numberOfElements: number; // The number of elements in the current page
  pageable: Pageable;
  size: number; // The maximum number of items per page
  sort: Sort;
  totalElements: number; // The total number of elements across all pages
  totalPages: number; // The total number of pages
}

interface Pageable {
  pageNumber: number; // The current page number (0-based)
  pageSize: number; // The maximum number of items per page
  sort: Sort;
  offset: number; // The offset of the current page
  paged: boolean; // Whether pagination is enabled
  unpaged: boolean; // Whether pagination is disabled
}

interface Sort {
  empty: boolean; // Whether the sorting criteria is empty
  sorted: boolean; // Whether sorting is enabled
  unsorted: boolean; // Whether sorting is disabled
}

export const emptyPaginated: Paginated<any> = {
  content: [],
  empty: true,
  first: true,
  last: true,
  number: 0,
  numberOfElements: 0,
  pageable: {
    pageNumber: 0,
    pageSize: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true
    },
    offset: 0,
    paged: false,
    unpaged: true
  },
  size: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true
  },
  totalElements: 0,
  totalPages: 0
};

export type PictureType = {
  fileName: string,
  userId: number
}

export type PagesCountType = {
  totalElements: number;
  totalPages: number;
}