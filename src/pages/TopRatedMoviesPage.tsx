import { useQuery } from '@tanstack/react-query'
import { getTopRated } from '../services/TheMovieDB'
import TopRatedMovies from "../components/TopRatedMovies"
import ErrorComponent from '../components/ErrorComponent'


const TopRatedMoviesPage = () => {
    const { data, isError } = useQuery(['top-rated'], getTopRated)

    return (
        <>
            {isError && (
                <ErrorComponent />
            )}

            {data && (
                <TopRatedMovies result={data} />
            )}
        </>
    )

}

export default TopRatedMoviesPage