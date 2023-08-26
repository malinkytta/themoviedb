import { useQuery } from "@tanstack/react-query"
import { getAllGenres, getNowPlaying, getPopular, getTopRated } from "../services/TheMovieDB"
import Movies from "../components/Movies"
import { useLocation } from "react-router-dom"
import Alert from "react-bootstrap/Alert"
import ErrorComponent from "../components/ErrorComponent"

const MoviesPage = () => {
    const popular = useQuery(['popular'], getPopular)
    const top_rated = useQuery(['top-rated'], getTopRated)
    const now_playing = useQuery(['now-playing'], getNowPlaying)

    const location = useLocation()

    if (popular.isError || top_rated.isError || now_playing.isError) {
        return (
            <ErrorComponent />
        )
    }

    return (
        <>

            {popular.data && location.pathname === '/popular-movies' && (
                <>
                    <h2>Popular Movies</h2>
                    <Movies result={popular.data} url={'popular-movies/'} />
                </>
            )}
            {top_rated.data && location.pathname === '/top-rated' && (
                <>
                    <h2>Top Rated Movies</h2>

                    <Movies result={top_rated.data} url={'top-rated/'} />
                </>
            )}
            {now_playing.data && location.pathname === '/now-playing' && (
                <>
                    <h1>Now Playing in Cinemas</h1>
                    <Movies result={now_playing.data} url={'now-playing/'} />
                </>
            )}
        </>
    )
}

export default MoviesPage