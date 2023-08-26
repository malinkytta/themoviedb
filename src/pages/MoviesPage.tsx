import { useQuery } from "@tanstack/react-query"
import { getAllGenres, getNowPlaying, getPopular, getTopRated } from "../services/TheMovieDB"
import Movies from "../components/Movies"
import { useLocation } from "react-router-dom"

const MoviesPage = () => {
    const { data: popular } = useQuery(['popular'], getPopular)
    const { data: top_rated } = useQuery(['top-rated'], getTopRated)
    const { data: now_playing } = useQuery(['now-playing'], getNowPlaying)
    // const { data: all_movies } = useQuery(['movies'], getAllGenres)

    const location = useLocation()
    console.log(location.pathname)

    return (
        <>
            {popular && location.pathname === '/popular-movies' && (
                <>
                    <h2>Popular Movies</h2>
                    <Movies result={popular} url={'popular-movies/'} />
                </>
            )}
            {top_rated && location.pathname === '/top-rated' && (
                <>
                    <h2>Top Rated Movies</h2>

                    <Movies result={top_rated} url={'top-rated/'} />
                </>
            )}
            {now_playing && location.pathname === '/now-playing' && (
                <>
                    <h1>Now Playing in Cinemas</h1>
                    <Movies result={now_playing} url={'now-playing/'} />
                </>
            )}
            {/* {all_movies && location.pathname === 'movies/' && (
                <>
                    <h1>Now Playing in Cinemas</h1>
                    <Movies result={all_movies} url={'movies/'} />
                </>
            )} */}
        </>
    )
}

export default MoviesPage