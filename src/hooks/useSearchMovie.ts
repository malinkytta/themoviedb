import { useQuery } from "@tanstack/react-query"
import { getSearchMovie } from "../services/TheMovieDB"

const useSearchMovie = (query: string, page: number) => {
    return useQuery(['search-movie', { query: query, page: page }],
        () => getSearchMovie(query, page), {
        enabled: !!query,
        keepPreviousData: true,
    })
}
export default useSearchMovie