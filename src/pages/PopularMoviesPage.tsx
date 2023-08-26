
import { useQuery } from '@tanstack/react-query'
import { getPopular } from '../services/TheMovieDB'
import PopularMovies from "../components/PopularMovies"
import ErrorComponent from '../components/ErrorComponent'


const PopularMoviesPage = () => {
    const { data, isError } = useQuery(['popular'], getPopular)

    return (
        <>
            {isError && (
                <ErrorComponent />
            )}

            {data && (
                <PopularMovies result={data} />
            )}
        </>
    )
}

export default PopularMoviesPage