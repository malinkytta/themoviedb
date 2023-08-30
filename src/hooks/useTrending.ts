import { useQuery } from "@tanstack/react-query"
import { getTrending } from "../services/TheMovieDB"

const useTrending = (time_window: string, page: number) => {
    return useQuery(['trending', { time_window: time_window, page: page }], () => getTrending(time_window, page), {
        keepPreviousData: true
    })
}


export default useTrending
