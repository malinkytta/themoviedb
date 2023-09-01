import { useQuery } from '@tanstack/react-query'
import { getTopRated } from '../services/TheMovieDB'

const useTopRated = (page: number) => {
    return useQuery(['top-rated', { page: page }], () => getTopRated(page), {
        keepPreviousData: true
    })
}

export default useTopRated