
import { useQuery } from '@tanstack/react-query'
import { getPopular } from '../services/TheMovieDB'
import PopularMovies from "../components/PopularMovies"


const PopularMoviesPage = () => {
    const { data } = useQuery(['popular'], getPopular)

    return (
        <>
            {data && (
                <PopularMovies result={data} />
            )}
        </>
    )
}

export default PopularMoviesPage