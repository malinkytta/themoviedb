import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'
import React from 'react'
import { MovieResponse } from '../types/movieAPI.types'

interface IProps {
    result: MovieResponse
}

const PopularMovies: React.FC<IProps> = ({ result }) => {
    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'

    return (
        <>
            {result && (
                <>
                    <div className="d-flex justify-content-between pt-5">
                        <h2>Popular movies</h2>
                        <input type="checkbox" id="check" className="toggle" />
                        <label id="check" htmlFor="check" />
                        <Button
                            variant="dark"
                            href={`popular-movies`}
                        >
                            All movies &gt;
                        </Button>
                    </div>

                    <Row xs={1} md={2} lg={3} className="g-4">
                        {result.results.slice(0, 3).map(data => (
                            <Col className="d-flex align-items-stretch">
                                <Card as={Link} to={`movies/${data.id}`}>
                                    <Card.Img variant="top" src={BASE_URL_IMAGE + data.backdrop_path} />
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
            )}
        </>
    )
}

export default PopularMovies