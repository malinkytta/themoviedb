import { useQuery } from '@tanstack/react-query'
import { getTopRated } from '../services/TheMovieDB'
import TopRatedMovies from "../components/TopRatedMovies"


const TopRatedMoviesPage = () => {
    const { data } = useQuery(['top-rated'], getTopRated)

    return (
        <>{data && (
            <TopRatedMovies result={data} />
        )}
        </>
    )

}

export default TopRatedMoviesPage