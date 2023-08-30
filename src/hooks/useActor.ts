import { useQuery } from "@tanstack/react-query"
import { getCast } from "../services/TheMovieDB"

const useActor = (actorId: number) => {

    return useQuery(['actor', { id: actorId }], () => getCast(actorId))

}

export default useActor