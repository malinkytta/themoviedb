import { useQuery } from "@tanstack/react-query"
import { getAllGenres, getAllMovies, getGenre } from "../services/TheMovieDB"
import Movies from "../components/Movies"
import Pagination from "../components/Pagination"
import { useNavigate, useSearchParams } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useState } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Search from "../components/Search"


const GenreMoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [genreTitle, setGenreTitle] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()

    const genreId = Number(searchParams.get('genre') ?? '')
    const page = Number(searchParams.get('page') ?? 1)

    const newSearch = (page: string, genreId: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('page', String(page))
        newSearchParams.set('genre', String(genreId))
        setSearchParams(newSearchParams)
    }

    const { data: genreTitles } = useQuery(['genre',
        { page }], () => getAllGenres(page))


    const { data: singleGenre } = useQuery(['specific-genre',
        { page, genre: genreId }],
        () => getGenre(genreId, page))

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!searchInput.trim().length) {
            return
        }

        navigate(`/search?query=${encodeURIComponent(searchInput)}`)
    }

    return (
        <div>

            <Search
                handleSubmit={handleSubmit}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
            />

            {genreTitles && (

                <DropdownButton variant="dark" data-bs-theme="dark" title="Filter genre">
                    {genreTitles.map(data => (
                        <Dropdown.Item
                            key={data.id}
                            onClick={() => {
                                newSearch(String(1), String(data.id))
                                setGenreTitle(data.name)
                            }}
                        >
                            {data.name}
                        </Dropdown.Item>
                    ))
                    }
                </DropdownButton>
            )}

            <Col xs={12} md={6}>
                {genreTitle && (
                    <h4 className="my-3">{genreTitle}</h4>
                )}
            </Col>
            {singleGenre && (
                <>
                    <Row>
                        <Movies result={singleGenre} url={'movies/'} />

                        <Pagination
                            page={page}
                            totalPages={singleGenre.total_pages}
                            hasPreviousPage={page > 1}
                            hasNextPage={page < singleGenre.total_pages}
                            onPreviousPage={() => { newSearch(String(page - 1), String(genreId)) }}
                            onNextPage={() => { newSearch(String(page + 1), String(genreId)) }}
                        />
                    </Row>
                </>
            )}

        </div >
    )
}

export default GenreMoviesPage