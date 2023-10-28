import Movies from "../components/Movies"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Search from "../components/Search"
import ErrorComponent from "../components/ErrorComponent"
import useGenres from "../hooks/useGenres"
import useSingleGenre from "../hooks/useSingleGenre"
import GenreDropdown from "../components/GenreDropdown"
import Container from "react-bootstrap/Container"
import Pagination from "../components/Pagination"

const GenreMoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [title, setTitle] = useState(localStorage.getItem("genreTitle") || "")
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()

    const genreId = searchParams.get('genre') ?? ''
    const page = Number(searchParams.get('page') ?? 1)

    const genreTitles = useGenres()
    const singleGenre = useSingleGenre(genreId, page)

    useEffect(() => {
        localStorage.setItem("genreTitle", title)
    }, [title])


    useEffect(() => {
        return () => {
            localStorage.removeItem("genreTitle")
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!searchInput.trim().length) {
            return
        }
        navigate(`/search?query=${encodeURIComponent(searchInput)}`)
    }

    if (genreTitles.isError || singleGenre.isError) {
        return (
            <ErrorComponent />
        )
    }

    const setSearchParamss = (change: number) => {
        return setSearchParams({ page: String(page + change), genre: String(genreId) })
    }
    return (
        <>
            <Container>

                <Search
                    handleSubmit={handleSubmit}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                />

                {genreTitles.data && genreTitles.data.genres.length > 0 && (
                    <GenreDropdown
                        result={genreTitles.data}
                        title={title}
                        setSearchParams={setSearchParams}
                        setTitle={setTitle}
                    />
                )}
            </Container>

            {singleGenre.data && (
                <>
                <Movies
                    result={singleGenre.data}
                    url={'/movies'}
                    currentPage={page}
                />
                <Pagination
                    page={page}
                    totalPages={singleGenre.data.total_pages}
                    hasPreviousPage={page > 1}
                    hasNextPage={page < (singleGenre.data.total_pages > 500 ? 500 : singleGenre.data.total_pages)}
                    onPreviousPage={() => setSearchParamss(-1)}
                    onNextPage={() => setSearchParamss(+1)}
                />
                </>
            )}

        </>
    )
}

export default GenreMoviesPage