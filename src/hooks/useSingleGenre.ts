import { useQuery } from "@tanstack/react-query"
import { getGenre } from "../services/TheMovieDB"

const useSingleGenre = (genreId: string | number, page: number) => {
    return useQuery(['single-genre', { id: genreId, page: page }], () => getGenre(genreId, page), {
        keepPreviousData: true
    })
}

export default useSingleGenre