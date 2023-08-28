import { useEffect, useState } from "react"
import { Result } from "../types/movieAPI.types"

const useClickedMovies = () => {
    const [clickedMovies, setClickedMovies] = useState<Result[] | []>([])

    useEffect(() => {
        const savedMovies = localStorage.getItem('clickedMovies')
        if (savedMovies) {
            setClickedMovies(JSON.parse(savedMovies))
        }
    }, [])

    const handleMovieClick = (movie: Result) => {

        // const filteredMovies = clickedMovies.filter(prevMovie => prevMovie.id !== movie.id);
        const updatedMovies = [movie, ...clickedMovies]

        if (updatedMovies.length > 10) {
            updatedMovies.shift()
        }

        localStorage.setItem('clickedMovies', JSON.stringify(updatedMovies))
        console.log(updatedMovies)
        return updatedMovies
    }

    return { clickedMovies, handleMovieClick }
}

export default useClickedMovies