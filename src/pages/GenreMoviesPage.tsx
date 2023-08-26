import { useQuery } from "@tanstack/react-query"
import { getAllGenres, getGenre } from "../services/TheMovieDB"
import Movies from "../components/Movies"
import Pagination from "../components/Pagination"
import { useNavigate, useSearchParams } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useState } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Search from "../components/Search"
import ErrorComponent from "../components/ErrorComponent"


const GenreMoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [title, setTitle] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()

    const genreId = searchParams.get('genre') ?? ''
    const page = Number(searchParams.get('page') ?? 1)

    const newSearch = (page: string, genreId: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('page', String(page))
        newSearchParams.set('genre', genreId)
        setSearchParams(newSearchParams)
    }

    const genreTitles = useQuery(['genre',
        { page }], () => getAllGenres(page))

    const singleGenre = useQuery(['specific-genre',
        { page, genre: genreId }],
        () => getGenre(genreId, page))

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

    return (
        <div>

            <Search
                handleSubmit={handleSubmit}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
            />

            {genreTitles.data && (

                <DropdownButton variant="outline-secondary" data-bs-theme="dark" title="Filter genre">
                    {genreTitles.data.map(data => (
                        <Dropdown.Item
                            key={data.id}
                            onClick={() => {
                                newSearch(String(1), String(data.id))
                                setTitle(data.name)
                            }}
                        >
                            {data.name}
                        </Dropdown.Item>
                    ))
                    }
                </DropdownButton>
            )}

            <Col xs={12} md={6}>
                {title && (
                    <h4 className="my-3">{title}</h4>
                )}
            </Col>

            {singleGenre.data && (
                <>
                    <Row>
                        <Movies result={singleGenre.data} url={'movies/'} />

                        <Pagination
                            page={page}
                            totalPages={singleGenre.data.total_pages}
                            hasPreviousPage={page > 1}
                            hasNextPage={page < (singleGenre.data.total_pages > 500 ? 500 : singleGenre.data.total_pages)}
                            onPreviousPage={() => { newSearch(String(page - 1), genreId) }}
                            onNextPage={() => { newSearch(String(page + 1), String(genreId)) }}
                        />
                    </Row>
                </>
            )}

        </div >
    )
}

export default GenreMoviesPage