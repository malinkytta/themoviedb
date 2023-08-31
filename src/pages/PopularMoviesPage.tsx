
import PopularMovies from "../components/PopularMovies"
import ErrorComponent from '../components/ErrorComponent'
import useTrending from "../hooks/useTrending"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

const PopularMoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const timeWindow = searchParams.get('time-window') ?? 'day'
    const [toggle, setToggle] = useState(true)

    const toggleText = () => {
        setToggle(!toggle)
        toggle ? 'week' : 'day'
        const newTimeWindow = (toggle ? 'week' : 'day')
        setSearchParams({ 'time-window': newTimeWindow })
    }
    const { data, isError } = useTrending(timeWindow, 1)

    return (
        <>
            {isError && (
                <ErrorComponent />
            )}

            {data && (
                <PopularMovies
                    result={data}
                    toggleText={toggleText}
                    toggle={toggle}
                />
            )}

        </>
    )
}

export default PopularMoviesPage