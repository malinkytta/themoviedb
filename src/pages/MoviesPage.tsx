import Movies from "../components/Movies"
import { useLocation, useSearchParams } from "react-router-dom"
import ErrorComponent from "../components/ErrorComponent"
import useNowPlaying from "../hooks/useNowPlaying"
import useTopRated from "../hooks/useTopRated"
import useTrending from "../hooks/useTrending"

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 1)
    const timeWindow = searchParams.get('time-window') ?? 'day'

    const toggleText = () => {
        const newTimeWindow = (timeWindow === 'day' ? 'week' : 'day')
        setSearchParams({ 'time-window': newTimeWindow, page: String(1) })
    }

    const top_rated = useTopRated(page)
    const popular = useTrending(timeWindow, page)
    const now_playing = useNowPlaying(page)

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
                    <input type="checkbox" id="check" className="toggle" checked={timeWindow === 'week'} readOnly />
                    <label htmlFor="check" onClick={toggleText} />

                    <Movies result={popular.data}
                        url={'popular-movies/'}
                        currentPage={page}
                        setSearchParams={setSearchParams}
                        time={timeWindow}
                        data={popular} />
                </>
            )}

            {top_rated.data && location.pathname === '/top-rated' && (
                <>
                    <h2>Top Rated Movies</h2>

                    <Movies result={top_rated.data}
                        url={'top-rated/'}
                        currentPage={page}
                        setSearchParams={setSearchParams}
                        time={timeWindow}
                        data={top_rated} />
                </>
            )}

            {now_playing.data && location.pathname === '/now-playing' && (
                <>
                    <h1>Now Playing in Cinemas</h1>
                    <Movies
                        result={now_playing.data}
                        url={'now-playing/'}
                        currentPage={page}
                        setSearchParams={setSearchParams}
                        time={timeWindow}
                        data={now_playing}
                    />
                </>
            )}
        </>
    )
}

export default MoviesPage