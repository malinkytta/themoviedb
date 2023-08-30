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

export const getNowPlaying = (page: number) => {
    return get<MovieResponse>(`/movie/now_playing?region=US&include_adult=false&page=${page}`)
}

export const getTopRated = (page: number) => {
    return get<MovieResponse>(`/movie/top_rated?region=US&include_adult=false&page=${page}`)
}

export const getPopular = (page: number) => {
    return get<MovieResponse>(`/movie/popular?region=US&language=en-US&page=${page}`)
}

export const getTrending = (time_window: string, page: number) => {
    return get<MovieResponse>(`/trending/movie/${time_window}?&page=${page}`)
}

export const getMovie = (id: number) => {
    return get<Result>(`/movie/${id}?&append_to_response=credits,similar,genre`)
}

export const getCast = (actorId: number) => {
    return get<Cast>(`/person/${actorId}?append_to_response=movie_credits`)
}


export const getAllGenres = () => {
    return get<Genre>(`/genre/movie/list?`)
}

export const getGenre = (genreId: number | string, page: number) => {
    return get<MovieResponse>(`/discover/movie?&with_genres=${genreId}&page=${page}`)
}

export const getSearchMovie = (query: string, page: number) => {
    return get<MovieResponse>(`/search/movie?query=${query}&page=${page}&include_adult=false`)
}
