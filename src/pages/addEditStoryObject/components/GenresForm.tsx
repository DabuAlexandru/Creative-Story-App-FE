import BadgesContainer from '@/components/custom/BadgesContainer/BadgesContainer';
import SelectObject from '@/components/custom/SelectObject/SelectObject';
import { Label } from '@/components/ui/label';
import { getGenreDictList } from '@/requests/genre.requests';
import { makeRequest } from '@/requests/request.handler';
import { StateSetter } from '@/utils/types/general.types';
import { GenreDictList, GenreType } from '@/utils/types/genre.types';
import { toNumber } from 'lodash';
import { useEffect, useState } from 'react';

const GenresForm = ({
  genres,
  setGenres,
  subGenres,
  setSubGenres
}: {
  genres: GenreType[];
  setGenres: StateSetter<GenreType[]>;
  subGenres: GenreType[];
  setSubGenres: StateSetter<GenreType[]>;
}) => {
  const [genreDicts, setGenreDicts] = useState<GenreDictList>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    makeRequest<GenreDictList>({ request: getGenreDictList, setObject: setGenreDicts, setIsLoading });
  }, []);

  const updateAvailableGenres = () => {
    const selectedGenreIds = new Set(genres.map(g => g.id));
    return genreDicts.filter(g => !selectedGenreIds.has(g.id));
  };

  const updateAvailableSubgenres = () => {
    const selectedSubgenreIds = new Set(subGenres.map(sg => sg.id));
    const availableSubGenres = genreDicts
      .flatMap(g => g.subGenres)
      .filter(sg => genres.some(g => g.id === sg.mainGenreId) && !selectedSubgenreIds.has(sg.id));
    return availableSubGenres;
  };

  const handleGenreChange = (value: string) => {
    const genreId = Number(value);
    const selectedGenre = genres.find(g => g.id === genreId);
    if (selectedGenre) {
      removeGenre(genreId);
    } else {
      addGenre(genreId);
    }
  };

  const handleSubgenreChange = (value: string) => {
    const subgenreId = Number(value);
    const selectedSubgenre = subGenres.find(sg => sg.id === subgenreId);
    if (selectedSubgenre) {
      removeSubgenre(subgenreId);
    } else {
      addSubgenre(subgenreId);
    }
  };

  const addGenre = (id: number) => {
    const genre = genreDicts.find(g => g.id === id);
    if (genre) {
      const newGenre: GenreType = { id: genre.id, name: genre.name, mainGenreId: null };
      setGenres(prevGenres => [...prevGenres, newGenre]);
    }
  };

  const removeGenre = (id: number) => {
    setGenres(prevGenres => prevGenres.filter(g => g.id !== id));
    setSubGenres(prevSubGenres => prevSubGenres.filter(sg => sg.mainGenreId !== id));
  };

  const addSubgenre = (id: number) => {
    const subgenre = genreDicts.flatMap(g => g.subGenres).find(sg => sg.id === id);
    if (subgenre) {
      setSubGenres(prevSubGenres => [...prevSubGenres, subgenre]);
    }
  };

  const removeSubgenre = (id: number) => {
    setSubGenres(prevSubGenres => prevSubGenres.filter(sg => sg.id !== id));
  };

  return (
    <div className="">
      <div className="">
        <div className="">
          <Label htmlFor="available-genres">Available Genres</Label>
          <SelectObject
            options={updateAvailableGenres()}
            valueKey="id"
            labelKey="name"
            placeholder="Select a Genre"
            onValueChange={handleGenreChange}
          />
        </div>
        <div className="">
          <Label htmlFor="selected-genres">Selected Genres</Label>
          <BadgesContainer 
            elements={genres}
            IdKey='id'
            labelKey='name'
            onRemoveItem={(id) => removeGenre(toNumber(id))}
          />
        </div>
      </div>

      <div className="">
        <div className="">
          <Label htmlFor="available-subgenres">Available Subgenres</Label>
          <SelectObject
            options={updateAvailableSubgenres()}
            valueKey="id"
            labelKey="name"
            placeholder="Select a Subgenre"
            onValueChange={handleSubgenreChange}
          />
        </div>
        <div className="select-container">
          <Label htmlFor="selected-subgenres">Selected Subgenres</Label>
          <BadgesContainer 
            elements={subGenres}
            IdKey='id'
            labelKey='name'
            onRemoveItem={(id) => removeSubgenre(toNumber(id))}
          />
        </div>
      </div>
    </div>
  );
};

export default GenresForm;
