
import { useState } from "react"
import Search from "../components/Search"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { searchMovie } from "../services/TheMovieDB"
import Pagination from "../components/Pagination"
import Movies from "../components/Movies"
import Row from 'react-bootstrap/Row'

const SearchMoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchInput, setSearchInput] = useState('')

    const page = Number(searchParams.get('page') ?? 1)
    const query = searchParams.get('query') ?? ''

    searchParams.set('page', String(page))

    const { data } = useQuery(['search-movies', { query, page }],
        () => searchMovie(query, page),
        {
            enabled: !!query,
            keepPreviousData: true,
        }
    )

    const newSearch = (searchInput: string, page: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('query', searchInput)
        newSearchParams.set('page', String(page))
        setSearchParams(newSearchParams)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!searchInput.trim().length) {
            return
        }

        setSearchParams({ query: searchInput })
    }

    return (
        <>
            <Search
                handleSubmit={handleSubmit}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
            />

            {data && (
                <>
                    <Row>
                        <Movies result={data} url={'movies/'} />
                    </Row>

                    <Pagination
                        page={page}
                        totalPages={data.total_pages}
                        hasPreviousPage={page > 1}
                        hasNextPage={page < data.total_pages}
                        onPreviousPage={() => { newSearch(searchInput, String(page - 1)) }}
                        onNextPage={() => { newSearch(searchInput, String(page + 1)) }}
                    />

                </>
            )}
        </>

    )
}
export default SearchMoviesPage