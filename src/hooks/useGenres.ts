import { useQuery } from "@tanstack/react-query"
import { getAllGenres } from "../services/TheMovieDB"

const useGenres = () => {
    return useQuery(['all-genres'], getAllGenres)
}
export default useGenres