import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { MovieResponse } from '../types/movieAPI.types'
import Pagination from './Pagination'
import ErrorComponent from './ErrorComponent'
import React from 'react'
import { Link, SetURLSearchParams } from 'react-router-dom'


interface IProps {
    result: MovieResponse
    url: string
    currentPage: number
    setSearchParams: SetURLSearchParams
    text: string | ''
    useTimeWindow: boolean
    useQuery: boolean
    useGenre: boolean
    genreId?: string
    children?: React.ReactNode
}

const Movies: React.FC<IProps> = ({
    result,
    url,
    currentPage,
    setSearchParams,
    text,
    useTimeWindow,
    useQuery,
    useGenre,
    genreId,
    children
}) => {

    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/w500'

    if (currentPage > result.total_pages) {
        return <ErrorComponent />
    }

    const handlePage = (change: number) => {
        if (useTimeWindow) {
            return setSearchParams({ 'time-window': text, page: String(currentPage + change) })
        } else if (useQuery) {
            return setSearchParams({ query: text, page: String(currentPage + change) })
        } else if (useGenre) {
            return setSearchParams({ page: String(currentPage + change), genre: String(genreId) })
        } else {
            return setSearchParams({ page: String(currentPage + change) })
        }
    }

    return (
        <>
            <div className="mx-3 py-3" >
                <div className=" ps-5 ms-5">
                    {children}
                </div>

                {result && (
                    <Row xs={2} md={3} lg={4} xl={5} className="g-4 mt-3">
                        {result.results.map(movie => (
                            <Col key={movie.id} className=" d-flex align-items-stretch flex-wrap justify-content-center">
                                <Card as={Link} to={`${url}/${movie.id}`} className="movies-card">
                                    <div className="poster">
                                        <Card.Img alt="poster" src={movie.poster_path
                                            ? BASE_URL_IMAGE + movie.poster_path
                                            : ' https://placehold.co/500x750'
                                        } />
                                    </div>
                                    <Card.Body className="details">
                                        <Card.Title>{movie.title}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

                <Pagination
                    page={currentPage}
                    totalPages={result.total_pages}
                    hasPreviousPage={currentPage > 1}
                    hasNextPage={currentPage < (result.total_pages > 500 ? 500 : result.total_pages)}
                    onPreviousPage={() => handlePage(-1)}
                    onNextPage={() => handlePage(+1)}
                />
            </div>
        </>
    )
}

export default Movies
