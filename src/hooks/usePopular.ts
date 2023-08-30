import { useQuery } from '@tanstack/react-query'
import { getPopular } from '../services/TheMovieDB'

const usePopular = (page: number) => {
    return useQuery(['popular', { page: page }], () => getPopular(page),
        { keepPreviousData: true })
}
export default usePopular