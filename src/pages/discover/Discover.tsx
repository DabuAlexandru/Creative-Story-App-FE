import { useState, useEffect, useCallback, useMemo } from 'react';
import { makeRequest } from '@/requests/request.handler';
import { Paginated, emptyPaginated } from '@/utils/types/general.types';
import { StoryDisplayType, StoryFilterType } from '@/utils/types/story.types';
import { debounce } from 'lodash';
import StoryCard from './components/StoryCard/StoryCard';
import { retrieveAllStoriesFilteredPaginate } from '@/requests/story.requests';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import PaginationControl from '@/components/custom/PaginationControl/PaginationControl';
import { STORIES_PER_PAGE } from './utils';
import { GenreType } from '@/utils/types/genre.types';
import { getAllAuthors } from '@/requests/user.profile.requests';
import { getAllGenres } from '@/requests/genre.requests';
import { DataFiltersToolbar } from './components/Filters/DataFiltersToolbar';

const Discover = () => {
  const [stories, setStories] = useState<Paginated<StoryDisplayType>>(emptyPaginated);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [authorList, setAuthorList] = useState<{ id: number, penName: string }[]>([]);
  const [genreList, setGenreList] = useState<GenreType[]>([]);
  const [filters, setFilters] = useState<StoryFilterType>({});

  const authorOptions = useMemo(() => authorList.map(author => ({ label: author.penName, value: author.id })), [authorList])
  const genreOptions = useMemo(() => genreList.map(genre => ({ label: genre.name, value: genre.id })), [genreList])

  const paginationRequest = useCallback((currentPage: number, filters: StoryFilterType) => {
    const pagination = { size: STORIES_PER_PAGE, page: currentPage, filters: { ...filters, title: filters.title?.trim() } };
    makeRequest({ request: () => retrieveAllStoriesFilteredPaginate(pagination), setObject: setStories, setIsLoading });
  }, []);

  const debouncedPaginationRequest = useMemo(() => debounce(paginationRequest, 300), []);

  useEffect(() => {
    makeRequest({ request: getAllAuthors, setObject: setAuthorList })
    makeRequest({ request: getAllGenres, setObject: setGenreList })
  }, [])

  useEffect(() => {
    return () => {
      debouncedPaginationRequest.cancel();
    };
  }, [debouncedPaginationRequest]);

  useEffect(() => {
    setCurrentPage(0)
    debouncedPaginationRequest(0, filters);
  }, [filters])

  useEffect(() => {
    debouncedPaginationRequest(currentPage, filters);
  }, [currentPage, filters]);

  return (
    <Card>
      <CardHeader>Discover<Separator className='my-3' /></CardHeader>
      <CardContent className='mb-4'>
        <DataFiltersToolbar
          filters={filters}
          setFilters={setFilters}
          genreOptions={genreOptions}
          authorOptions={authorOptions}
        />
        <div className='w-100 align-items-start'>
          <div className='flex flex-wrap justify-center gap-10 pb-8'>
            {(stories.content).map(story => <StoryCard key={`discover-story-${story.id}`} story={story} />)}
          </div>
          <PaginationControl
            currentPage={currentPage}
            pageCount={stories.totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default Discover;
