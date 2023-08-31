import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'
import { MovieResponse } from '../types/movieAPI.types'
import React from 'react'
import Form from 'react-bootstrap/Form'

interface IProps {
    result: MovieResponse
    toggleText: (e: React.FormEvent) => void
    text: string
    toggle: boolean
}

const PopularMovies: React.FC<IProps> = ({ result, toggleText, text, toggle }) => {
    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'


    return (
        <>

            {result && (
                <>

                    <div className="d-flex justify-content-start align-items-center px-3 py-4">
                        <h2>Popular movies</h2>
                        <div className="d-flex px-4">
                            <p>Sort by</p>
                            <Button
                                data-bs-theme='dark'
                                className=""
                                variant="transparent"
                                onClick={toggleText}
                            >
                                {toggle ? 'Day' : 'Week'}
                            </Button>

                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button
                            className='px-end'
                            variant="dark"
                            href={`popular-movies?time-window=${toggle ? 'day' : 'week'}`}
                        >
                            All movies &gt;
                        </Button>
                    </div>

                    <Row xs={1} md={2} lg={3} className="g-4 mb-5">
                        {result.results.slice(0, 3).map(data => (
                            <Col key={data.id} className="d-flex align-items-stretch">
                                <Card as={Link} to={`movies/${data.id}`}>
                                    <Card.Img variant="top" src={data.backdrop_path
                                        ? BASE_URL_IMAGE + data.backdrop_path
                                        : 'https://placehold.co/500x300'
                                    } />
                                    <Card.Body>
                                        <Card.Title>
                                            {data.title}
                                        </Card.Title>
                                        <Card.Text>
                                            ⭐️ {data.vote_average}
                                        </Card.Text>
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