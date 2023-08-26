import CarouselComponent from "../components/CarouselComponent"
import { useQuery } from '@tanstack/react-query';
import { getNowPlaying } from '../services/TheMovieDB';
import ErrorComponent from "../components/ErrorComponent";

const NowPlayingMoviesPage = () => {
    const { data, isError } = useQuery(['now_playing'], getNowPlaying);

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