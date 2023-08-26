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
        <div>
            {result && (
                <>
                    <div className="d-flex justify-content-between pt-5">
                        <h2>Popular movies</h2>
                        <Button
                            variant="dark"
                            href={`popular-movies`}
                        >
                            All movies &gt;
                        </Button>
                    </div>

                    <Row xs={1} md={2} lg={3} className="g-4">
                        <>
                            <Col className="d-flex align-items-stretch">

                                <Card as={Link} to="/">
                                    <Card.Img variant="top" src={BASE_URL_IMAGE + result.results[0].backdrop_path} />
                                    <Card.Body>
                                        <Card.Title>
                                            {result.results[0].title}
                                        </Card.Title>
                                        <Card.Text>
                                            ⭐️ {result.results[0].vote_average}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="d-flex align-items-stretch">

                                <Card as={Link} to="/">
                                    <Card.Img variant="top" src={BASE_URL_IMAGE + result.results[1].backdrop_path} />
                                    <Card.Body>
                                        <Card.Title>
                                            {result.results[1].title}
                                        </Card.Title>
                                        <Card.Text>
                                            ⭐️ {result.results[1].vote_average}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col className="d-flex align-items-stretch">

                                <Card as={Link} to="/">
                                    <Card.Img variant="top" src={BASE_URL_IMAGE + result.results[2].backdrop_path} />
                                    <Card.Body>
                                        <Card.Title>
                                            {result.results[2].title}
                                        </Card.Title>
                                        <Card.Text>
                                            ⭐️ {result.results[2].vote_average}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                    </Row>
                </>
            )}
        </div>
    )
}

export default PopularMovies