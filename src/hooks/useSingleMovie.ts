import { useQuery } from "@tanstack/react-query"
import { getMovie } from "../services/TheMovieDB"

const useSingleMovie = (movieId: number) => {
    return useQuery(['single-movie', { id: movieId }], () => getMovie(movieId))
}

export default useSingleMovie