import CarouselComponent from "../components/CarouselComponent"
import ErrorComponent from "../components/ErrorComponent"
import useNowPlaying from "../hooks/useNowPlaying"

const NowPlayingMoviesPage = () => {
    const { data, isError } = useNowPlaying(1)

    return (
        <>
            {isError && (
                <ErrorComponent />
            )}

            {data && (
                <CarouselComponent result={data} />
            )}
        </>
    )
}

export default NowPlayingMoviesPage