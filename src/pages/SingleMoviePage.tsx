import { useQuery } from "@tanstack/react-query"
import SingleMovie from "../components/SingleMovie"
import { getMovie } from "../services/TheMovieDB"
import { useParams } from "react-router-dom"

const SingleMoviePage = () => {
    const { id } = useParams()
    const movieId = Number(id)

    const { data } = useQuery(['single-movie', { id: movieId }], () => getMovie(movieId))

    return (
        <>
            {data && (
                <>
                    <SingleMovie result={data} />
                </>
            )}

        </>
    )
}

export default SingleMoviePage