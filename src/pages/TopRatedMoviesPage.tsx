import TopRatedMovies from "../components/TopRatedMovies"
import ErrorComponent from '../components/ErrorComponent'
import useTopRated from '../hooks/useTopRated'


const TopRatedMoviesPage = () => {
    const { data, isError } = useTopRated(1)

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