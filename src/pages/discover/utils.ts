import { StoryFilterType } from "@/utils/types/story.types";

export const STORIES_PER_PAGE = 4;

const hasValue = (value: string | undefined | (string | number)[]) => (value && value.length > 0)

export const filtersHaveValue = (filters: StoryFilterType) => Object.values(filters).some(hasValue)