import TopRatedMoviesPage from "./TopRatedMoviesPage"
import NowPlayingMoviesPage from "./NowPlayingMoviesPage"
import PopularMoviesPage from "./PopularMoviesPage"

const HomePage = () => {

    return (
        <>
            <NowPlayingMoviesPage />
            <TopRatedMoviesPage />
            <PopularMoviesPage />
        </>
    )
}

export default HomePage