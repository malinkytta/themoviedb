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
                        useGenre={false}
                        title={'Now playing in Cinemas'}
                    />
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
                            title={'Top rated movies'}
                        />
                    </>
                )
            }

            {popular.data && location.pathname === '/popular-movies' && (
                <>
                    <div className="d-flex px-4">
                        <p>Sort by</p>
                        <Button
                            data-bs-theme='dark'
                            className=""
                            variant="transparent"
                            onClick={toggleText}
                        >
                            {toggle ? 'day' : 'week'}
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
                        title={'Popular movies'}
                    />
                </>
            )
            }




        </>
    )
}

export default MoviesPage
