import SingleMovie from "../components/SingleMovie"
import { useParams } from "react-router-dom"
import ErrorComponent from "../components/ErrorComponent"
import { useEffect } from "react"
import useSingleMovie from "../hooks/useSingleMovie"
import { Result } from "../types/movieAPI.types"

const SingleMoviePage = () => {
    const { id } = useParams()
    const movieId = Number(id)

    const { data, isError } = useSingleMovie(movieId)

    useEffect(() => {
        if (data) {
            const savedMovies = localStorage.getItem('clickedMovies')
            const clickedMovies: Result[] = savedMovies ? JSON.parse(savedMovies) : []

            const idExists = clickedMovies.findIndex((movie) => movie.id === data.id)

            if (idExists !== -1) {
                clickedMovies.splice(idExists, 1)
            }
            const updatedMovies = [data, ...clickedMovies]

            if (updatedMovies.length > 10) {
                updatedMovies.pop()
            }

            localStorage.setItem('clickedMovies', JSON.stringify(updatedMovies))
        }
    }, [data])

    return (
        <>
            {isError && (
                <ErrorComponent />
            )}

            {data && (
                <>
                    <SingleMovie result={data} />
                </>
            )}

        </>
    )
}

export default SingleMoviePage