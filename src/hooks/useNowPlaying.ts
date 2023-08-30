import { useQuery } from '@tanstack/react-query'
import { getNowPlaying } from '../services/TheMovieDB'

const useNowPlaying = (page: number) => {
    return useQuery(['now-playing', { page: page }], () => getNowPlaying(page), {
        keepPreviousData: true
    })
}
export default useNowPlaying