import TopRatedMoviesPage from "./TopRatedMoviesPage"
import NowPlayingMoviesPage from "./NowPlayingMoviesPage"
import PopularMoviesPage from "./PopularMoviesPage"
import ClickedMoviesComponent from "../components/ClickedMoviesComponent"
// import ClickedMoviesPage from "./ClickedMoviesPage"
// import ClickedMoviesPage from "./ClickedMoviesPage"

const HomePage = () => {

    const savedMovies = localStorage.getItem('clickedMovies')
    const clickedMovies = savedMovies ? JSON.parse(savedMovies) : []
    // console.log(clickedMovies)
    return (

        <>
            <NowPlayingMoviesPage />
            <TopRatedMoviesPage />
            <PopularMoviesPage />
            <ClickedMoviesComponent result={clickedMovies} />
            {/* <ClickedMoviesPage /> */}
        </>
    )
}

export default HomePage