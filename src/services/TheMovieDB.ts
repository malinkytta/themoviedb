import axios from 'axios'
import { Genre, MovieResponse, Result } from '../types/movieAPI.types'
import { Cast } from '../types/cast.types'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_API_KEY
const FAKE_DELAY = 1500

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Authorization': API_KEY
    }
})

const get = async <T>(endpoint: string) => {
    const response = await instance.get<T>(endpoint)

    !!FAKE_DELAY && await new Promise((r) => setTimeout(r, FAKE_DELAY))

    return response.data
}

// eventuellt lägga till parameter så man bara använder en, 
// tex endpoint: string och sen har man 'movie' + endpoint?

export const getNowPlaying = () => {
    return get<MovieResponse>(`/movie/now_playing`)
}

export const getTopRated = () => {
    return get<MovieResponse>('/movie/top_rated')
}

export const getPopular = () => {
    return get<MovieResponse>('/movie/popular')
}

export const getMovie = (id: number) => {
    return get<Result>(`/movie/${id}?&append_to_response=credits,similar`)
}

export const getCast = (actorId: number) => {
    return get<Cast>(`/person/${actorId}?append_to_response=movie_credits`)
}

export const getAllMovies = (page: number) => {
    return get<MovieResponse>(`/discover/movie?&page=${page}`)
}

export const getAllGenres = async (page: number) => {
    const data = await get<Genre>(`/genre/movie/list?&page=${page}`)
    return data.genres
}

export const getGenre = (genreId: number, page: number) => {
    return get<MovieResponse>(`/discover/movie?&with_genres=${genreId}&page=${page}`)
}

export const searchMovie = (query: string, page: number) => {
    return get<MovieResponse>(`/search/movie?query=${query}&page=${page}`)
}
