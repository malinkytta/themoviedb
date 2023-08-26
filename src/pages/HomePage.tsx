import TopRatedMoviesPage from "./TopratedMoviesPage"
import NowPlayingMoviesPage from "./NowPlayingMoviesPage"
import PopularMoviesPage from "./PopularMoviesPage"

const HomePage = () => {

    return (
        <div>

            <NowPlayingMoviesPage />
            <TopRatedMoviesPage />
            <PopularMoviesPage />

        </div>
    )
}

export default HomePage