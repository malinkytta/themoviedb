import { Cast } from "./cast.types"

export type MovieResponse = {
    dates: {
        maximum: string
        minimum: string
    }
    page: number
    results: Result[]
    total_pages: number
    total_results: number
}

export type Result = {
    adult: false
    backdrop_path: string
    genres_id: Genre_Id[]
    homepage: string
    id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    production_companies: Production_Companies[]
    spoken_languages: Languages[]
    runtime: number
    title: string
    video: boolean
    tagline: string
    vote_average: number
    vote_count: number
    credits: Credits
    similar: SimilarResponse
}

export type Credits = {
    cast: Cast[]
}

export type SimilarResponse = {
    dates: {
        maximum: string
        minimum: string
    }
    page: number
    results: Similar[]
    total_pages: number
    total_results: number
}

export type Similar = {
    id: number
    adult: false
    backdrop_path: string
    poster_path: string
    title: string
}

export type Languages = {
    english_name: string
    name: string
}

export type Production_Companies = {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export type Genre_Id = {
    id: number
}

export type Genre = {
    genres: [{
        id: number
        name: string
    }]
}