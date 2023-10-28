import Movies from "../components/Movies"
import { useLocation, useSearchParams } from "react-router-dom"
import ErrorComponent from "../components/ErrorComponent"
import useNowPlaying from "../hooks/useNowPlaying"
import useTopRated from "../hooks/useTopRated"
import useTrending from "../hooks/useTrending"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Pagination from "../components/Pagination"

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

    return (
        <>

            {now_playing.data && location.pathname === '/now-playing' && (
                <>
                    <Movies
                        result={now_playing.data}
                        url={'/now-playing'}
                        currentPage={page}
                    >
                    <h2 className="py-2 mb-0 movies-title">In cinemas now</h2>

                    </Movies>
                    <Pagination
                        page={page}
                        totalPages={now_playing.data.total_pages}
                        hasPreviousPage={page > 1}
                        hasNextPage={page < (now_playing.data.total_pages > 500 ? 500 : now_playing.data.total_pages)}
                        onPreviousPage={() => setSearchParams({ page: String(page -1) })}
                        onNextPage={() => setSearchParams({ page: String(page +1) })}
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
                        >
                            <h2 className="py-2 mb-0 movies-title">Top Rated movies</h2>

                        </Movies>
                        <Pagination
                        page={page}
                        totalPages={top_rated.data.total_pages}
                        hasPreviousPage={page > 1}
                        hasNextPage={page < (top_rated.data.total_pages > 500 ? 500 : top_rated.data.total_pages)}
                        onPreviousPage={() => setSearchParams({ page: String(page -1) })}
                        onNextPage={() => setSearchParams({ page: String(page +1) })}
                        />
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
                    />
                    <Pagination
                        page={page}
                        totalPages={popular.data.total_pages}
                        hasPreviousPage={page > 1}
                        hasNextPage={page < (popular.data.total_pages > 500 ? 500 : popular.data.total_pages)}
                        onPreviousPage={() => setSearchParams({ 'time-window': timeWindow, page: String(page -1) })}
                        onNextPage={() => setSearchParams({ 'time-window': timeWindow, page: String(page + 1) })}
                    />
                </>
            )
            }
        </>
    )
}

export default MoviesPage
