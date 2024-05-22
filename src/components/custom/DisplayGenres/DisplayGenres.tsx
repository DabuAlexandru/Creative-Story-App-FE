import { Badge } from "@/components/ui/badge"
import { GenreType } from "@/utils/types/genre.types"

const DisplayGenres = ({
  genres,
  subGenres
}: {
  genres: GenreType[]
  subGenres: GenreType[]
}) => {
  return (
    <div>
      <div className="mt-0.5 mb-2.5 text-xs font-semibold">
        {(genres || []).map(genre => (
          <Badge key={`${genre.name}`} className='rounded-full mx-[2px]'>
            {genre.name}
          </Badge>
        ))}
      </div>
      <div className="mt-0.5 mb-2.5 text-xs font-semibold">
        {(subGenres || []).map(subGenre => (
          <Badge key={`$sub-${subGenre.name}`} className='rounded-full mx-[2px]' variant='secondary'>
            {subGenre.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default DisplayGenres