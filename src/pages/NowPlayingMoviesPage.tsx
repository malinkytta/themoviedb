import CarouselComponent from "../components/CarouselComponent"
import { useQuery } from '@tanstack/react-query';
import { getNowPlaying } from '../services/TheMovieDB';

const NowPlayingMoviesPage = () => {
    const { data: now_playing } = useQuery(['now_playing'], getNowPlaying);

    return (
        <>
            {now_playing && (
                <CarouselComponent result={now_playing} />
            )}
        </>
    )
}

export default NowPlayingMoviesPage