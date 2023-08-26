import { useQuery } from "@tanstack/react-query"
import SingleMovie from "../components/SingleMovie"
import { getMovie } from "../services/TheMovieDB"
import { useLocation, useParams } from "react-router-dom"
import ErrorComponent from "../components/ErrorComponent"

const SingleMoviePage = () => {
    const { id } = useParams()
    const movieId = Number(id)

    const { data, isError } = useQuery(['single-movie', { id: movieId }], () => getMovie(movieId))

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