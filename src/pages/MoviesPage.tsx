import Movies from "../components/Movies"
import { useLocation, useSearchParams } from "react-router-dom"
import ErrorComponent from "../components/ErrorComponent"
import useNowPlaying from "../hooks/useNowPlaying"
import useTopRated from "../hooks/useTopRated"
import useTrending from "../hooks/useTrending"
import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 1)
    const timeWindow = searchParams.get('time-window') ?? 'day'
    const [toggle, setToggle] = useState(true)

    const toggleText = () => {
        setToggle(!toggle)
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

    useEffect(() => {

    }, [setSearchParams])

    return (
        <>

            {now_playing.data && location.pathname === '/now-playing' && (
                <>
                    <Movies
                        result={now_playing.data}
                        url={'/now-playing'}
                        currentPage={page}
                        setSearchParams={setSearchParams}
                        text={timeWindow}
                        useTimeWindow={false}
                        useQuery={false}
                        useGenre={false}>

                        <h2 className="py-2 mb-0 movies-title">In cinemas now</h2>

                    </Movies>

                </>
            )}

            {
                top_rated.data && location.pathname === '/top-rated' && (
                    <>
                        <Movies
                            result={top_rated.data}
                            url={'/top-rated'}
                            currentPage={page}
                            setSearchParams={setSearchParams}
                            text={timeWindow}
                            useTimeWindow={false}
                            useQuery={false}
                            useGenre={false}
                        >
                            <h2 className="py-2 mb-0 movies-title">Top Rated movies</h2>

                        </Movies>
                    </>
                )
            }

            {popular.data && location.pathname === '/popular-movies' && (
                <>
                    <div className=" ps-5 ms-5 d-flex align-items-center justify-content-start">
                        <h2 className="py-2 mb-0 movies-title">Popular movies</h2>
                        <p className="ps-3 mb-0">by</p>
                        <Button
                            data-bs-theme='dark'
                            className="mb-0 ms-0"
                            variant="transparent"
                            onClick={toggleText}
                        >
                            {toggle ? 'Day ▿' : 'Week ▿'}
                        </Button>
                    </div>

                    <Movies
                        result={popular.data}
                        url={'/popular-movies'}
                        currentPage={page}
                        setSearchParams={setSearchParams}
                        text={timeWindow}
                        useTimeWindow={true}
                        useQuery={false}
                        useGenre={false}
                    />
                </>
            )
            }
        </>
    )
}

export default MoviesPage
