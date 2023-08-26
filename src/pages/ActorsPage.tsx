import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Actors from "../components/Actors"
import { getCast } from "../services/TheMovieDB"

const ActorsPage = () => {
    const { id } = useParams()
    const movieId = Number(id)

    const { data } = useQuery(['cast', { id: movieId }], () => getCast(movieId))

    return (
        <>
            {data && (
                <>
                    <Actors result={data} url={'/popular-movies/'} />
                </>
            )}

        </>
    )
}

export default ActorsPage