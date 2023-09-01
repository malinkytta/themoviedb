
import { useEffect, useState } from "react"
import Search from "../components/Search"
import { useSearchParams } from "react-router-dom"
import Movies from "../components/Movies"
import Row from 'react-bootstrap/Row'
import ErrorComponent from "../components/ErrorComponent"
import useSearchMovie from "../hooks/useSearchMovie"

const SearchMoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchInput, setSearchInput] = useState('')

    const page = Number(searchParams.get('page') ?? 1)
    const query = searchParams.get('query') ?? ''

    searchParams.set('page', String(page))

    const { data, isError } = useSearchMovie(query, page)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!searchInput.trim().length) {
            return
        }

        setSearchParams({ query: searchInput, page: String(1) })
    }

    useEffect(() => {
        setSearchInput(searchParams.get("query") || "")
    }, [searchParams])


    if (data) {
        if (page > data.total_pages) {
            <ErrorComponent />
        }
    }


    return (
        <>

            {isError && (
                <ErrorComponent />
            )}

            <Search
                handleSubmit={handleSubmit}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
            />

            {data && data.results.length > 0 && (
                <>

                    <p>Showing {new Intl.NumberFormat().format(data.total_results)} movies for "{query}"</p>

                    <Row>
                        <Movies
                            result={data}
                            url={'/movies'}
                            currentPage={page}
                            setSearchParams={setSearchParams}
                            text={query}
                            useTimeWindow={false}
                            useQuery={true}
                            useGenre={false}
                        />
                    </Row>
                </>
            )}
        </>

    )
}
export default SearchMoviesPage