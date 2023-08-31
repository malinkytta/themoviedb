import Movies from "../components/Movies"
import { useNavigate, useSearchParams } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useEffect, useState } from "react"
import Search from "../components/Search"
import ErrorComponent from "../components/ErrorComponent"
import useGenres from "../hooks/useGenres"
import useSingleGenre from "../hooks/useSingleGenre"

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


    return (
        <>

            <Search
                handleSubmit={handleSubmit}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
            />

            {
                genreTitles.data && (
                    <div className="d-flex justify-content-stretch genres">
                        <h2>Sort by Genre:</h2>
                        <DropdownButton className="mb-4 ms-3" variant="transparent" data-bs-theme="dark" title={title ? title : 'Filter genres'}>
                            {genreTitles.data.genres.map(data => (
                                <Dropdown.Item
                                    key={data.id}
                                    onClick={() => {
                                        setSearchParams({ page: String(1), genre: String(data.id) })
                                        setTitle(data.name)
                                    }}
                                >
                                    {data.name}
                                </Dropdown.Item>
                            ))
                            }
                        </DropdownButton>
                    </div>
                )
            }

            {
                singleGenre.data && (

                    <>

                        {/* <Col xs={12} md={6}>
                            <h4 className="my-3">{title}</h4>
                        </Col> */}

                        <Movies
                            result={singleGenre.data}
                            url={'/movies'}
                            currentPage={page}
                            setSearchParams={setSearchParams}
                            text={''}
                            useTimeWindow={false}
                            useQuery={false}
                            useGenre={true}
                            genreId={genreId}
                            title={'Choose genre'}
                        />
                    </>
                )
            }

        </>
    )
}

export default GenreMoviesPage