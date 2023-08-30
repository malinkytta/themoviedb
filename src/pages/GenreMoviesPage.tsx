import { useQuery } from "@tanstack/react-query"
import { getAllGenres, getGenre } from "../services/TheMovieDB"
import Movies from "../components/Movies"
import Pagination from "../components/Pagination"
import { useNavigate, useSearchParams } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useEffect, useState } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Search from "../components/Search"
import ErrorComponent from "../components/ErrorComponent"
import useGenres from "../hooks/useGenres"
import useSingleGenre from "../hooks/useSingleGenre"


const GenreMoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [title, setTitle] = useState(localStorage.getItem("genreTitle") || "")
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        localStorage.setItem("genreTitle", title)
    }, [title])

    useEffect(() => {
        return () => {
            localStorage.removeItem("genreTitle")
        }
    }, [])

    const genreId = searchParams.get('genre') ?? ''
    const page = Number(searchParams.get('page') ?? 1)

    const genreTitles = useGenres()
    const singleGenre = useSingleGenre(genreId, page)

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
    console.log(title)

    return (
        <>

            <Search
                handleSubmit={handleSubmit}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
            />

            {
                genreTitles.data && (
                    <DropdownButton variant="outline-secondary" data-bs-theme="dark" title="Filter genre">
                        {genreTitles.data.genres.map(data => (
                            <Dropdown.Item
                                key={data.id}
                                onClick={() => {
                                    setSearchParams({ page: String(page), genre: String(data.id) })
                                    setTitle(data.name)
                                }}
                            >
                                {data.name}
                            </Dropdown.Item>
                        ))
                        }
                    </DropdownButton>
                )
            }

            <Col xs={12} md={6}>
                <h4 className="my-3">{title}</h4>
            </Col>

            {
                singleGenre.data && (
                    <>
                        {/* <Row> */}
                        <Movies
                            result={singleGenre.data}
                            url={'movies/'}
                            currentPage={page}
                            setSearchParams={setSearchParams}
                            data={singleGenre}
                            time={''}
                        />
                        {/* </Row> */}
                    </>
                )
            }

        </>
    )
}

export default GenreMoviesPage