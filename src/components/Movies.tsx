import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { MovieResponse } from '../types/movieAPI.types'
import ErrorComponent from './ErrorComponent'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
    result: MovieResponse
    url: string
    currentPage: number
    children?: React.ReactNode
}

const Movies: React.FC<IProps> = ({
    result,
    url,
    currentPage,
    children
}) => {

    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/w500'

    useEffect(() => {
        setTimeout(() => { window.scrollTo(0, 0) }, 100)
    }, [currentPage])

    if (currentPage > result.total_pages) {
        return <ErrorComponent />
    }

    return (
        <>
            <div className="mx-3 py-3" >
                <div className=" ps-5 ms-5">
                    {children}
                </div>

                {result && (
                    <Row xs={2} md={3} lg={4} xl={6} className="g-4 mt-3">
                        {result.results.map(movie => (
                            <Col key={movie.id} className=" d-flex align-items-stretch flex-wrap justify-content-center">
                                <Card as={Link} to={`${url}/${movie.id}`} className="movies-card">
                                    <div className="poster">
                                        <Card.Img alt="poster" src={movie.poster_path
                                            ? BASE_URL_IMAGE + movie.poster_path
                                            : 'https://placehold.co/500x750/1c1c1c/FFF?text=Image+Not+Found'
                                        } />
                                    </div>
                                    <Card.Body className="details">
                                        <Card.Title>{movie.title} </Card.Title>
                                        <Card.Text>⭐️ {movie.vote_average} </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </div >
        </>
    )
}

export default Movies
