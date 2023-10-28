
import { useEffect, useState } from "react"
import Search from "../components/Search"
import { useSearchParams } from "react-router-dom"
import Movies from "../components/Movies"
import ErrorComponent from "../components/ErrorComponent"
import useSearchMovie from "../hooks/useSearchMovie"
import Pagination from "../components/Pagination"

const SearchMoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchInput, setSearchInput] = useState('')

    const page = Number(searchParams.get('page') ?? 1)
    const query = searchParams.get('query') ?? ''

    searchParams.set('page', String(page))

    const { data, isError, refetch } = useSearchMovie(query, page)

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

    useEffect(() => {
        setSearchInput('')
        refetch()
    }, [])

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

                    <p className="mx-5">
                        Showing {new Intl.NumberFormat().format(data.total_results)} movies for search query "{query}"
                    </p>

                    <Movies
                        result={data}
                        url={'/movies'}
                        currentPage={page}
                    />
                    <Pagination
                        page={page}
                        totalPages={data.total_pages}
                        hasPreviousPage={page > 1}
                        hasNextPage={page < (data.total_pages > 500 ? 500 : data.total_pages)}
                        onPreviousPage={() => setSearchParams({ query: query, page: String(page -1) })}
                        onNextPage={() => setSearchParams({ query: query, page: String(page + 1) })}
                    />
                </>
            )}
        </>

    )
}
export default SearchMoviesPage