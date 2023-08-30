import { useParams } from "react-router-dom"
import Actors from "../components/Actors"
import ErrorComponent from "../components/ErrorComponent"
import useActor from "../hooks/useActor"

const ActorsPage = () => {
    const { id } = useParams()
    const movieId = Number(id)

    const { data, isError } = useActor(movieId)

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