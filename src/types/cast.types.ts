export type TMDB_CastResponse = {
    id: number
    cast: Cast[]
}

export type Cast = {
    adult: false
    id: number
    biography: string
    birthday: string
    place_of_birth: string
    gender: number
    known_for_department: string
    name: string
    profile_path: string
    cast_id: number
    character: string
    movie_credits: MovieCredits
}

export type MovieCredits = {
    cast: [{
        id: number
        adult: false
        original_title: string
        poster_path: string
    }]
}