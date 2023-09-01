import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { MovieResponse } from '../types/movieAPI.types'
import React from 'react'
import Button from 'react-bootstrap/Button'

interface IProps {
    result: MovieResponse
    toggleText: (e: React.FormEvent) => void
    toggle: boolean
}

const PopularMovies: React.FC<IProps> = ({ result, toggleText, toggle }) => {
    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'


    return (
        <>
            {result && (
                <>
                    <div className=" ps-5 d-flex align-items-center justify-content-start">
                        <h2 className="py-2 mb-0 movies-title">Popular movies</h2>
                        <p className="ps-3 mb-0">by</p>
                        <Button
                            data-bs-theme='dark'
                            className="mb-0 ms-0"
                            variant="transparent"
                            onClick={toggleText}
                        >
                            {toggle ? 'Day ▿' : 'Week ▿'}
                        </Button>

                    </div>
                    <Row className="pb-3 mb-4 g-3 slider flex-nowrap ms-3 popular-movies">
                        {result.results.slice(0, 10).map(data => (
                            <Col key={data.id} className=" d-flex align-items-stretch">
                                <Card as={Link} to={`/popular-movies/${data.id}`} className="movies-card">
                                    <div className='poster'>
                                        <Card.Img alt="poster" src={data.poster_path
                                            ? BASE_URL_IMAGE + data.poster_path
                                            : 'https://placehold.co/500x300'
                                        } />
                                    </div>
                                    <Card.Body className='details'>
                                        <Card.Title>{data.title}</Card.Title>
                                        <Card.Text>   ⭐️ {data.vote_average}  </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )
            }
        </>
    )
}

export default PopularMovies