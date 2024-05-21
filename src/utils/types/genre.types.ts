export type GenreDictList = {
    id: number,
    name: string,
    subGenres: GenreType[]
}[]

export type GenreType = {
    id: number,
    name: string,
    mainGenreId: number | null
}