import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Actors from "../components/Actors"
import { getCast } from "../services/TheMovieDB"
import ErrorComponent from "../components/ErrorComponent"

const ActorsPage = () => {
    const { id } = useParams()
    const movieId = Number(id)

    const { data, isError } = useQuery(['cast', { id: movieId }], () => getCast(movieId))

    return (
        <>
            {isError && (
                <ErrorComponent />
            )}
            {data && (
                <>
                    <Actors result={data} url={'/movies/'} />
                </>
            )}

        </>
    )
}

export default ActorsPage