import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"

import { Cast, TMDB_CastResponse } from "../types/cast.types"
import { useState } from "react"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"

interface IProps {
    result: Cast
    url: string
}
const Actors: React.FC<IProps> = ({ result, url }) => {
    const [show, setShow] = useState(false)

    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'
    const BASE_URL_PROFILE_IMAGE = 'https://image.tmdb.org/t/p/w92'


    return (

        <>
            <ListGroup className="mb-3 my-3">
                <ListGroup.Item className=" px-4 py-4">

                    <Row xs={1} md={2} lg={2} className="g-4">

                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src={BASE_URL_IMAGE + result.profile_path} />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <h2>{result.name}</h2>

                            <Card.Text>Birthday: {result.birthday}</Card.Text>
                            <Card.Text>Place of Birth: {result.place_of_birth}</Card.Text>
                            <Card.Text>Gender: {result.gender === 1 ? 'Female' : result.gender === 2 ? 'Male' : result.gender === 3 ? 'Non-binary' : 'Not set / not specified'}</Card.Text>

                            <Card.Title>Biography</Card.Title>
                            <Card.Text>{show ? result.biography : `${result.biography.substring(0, 150)}`}
                                <Button variant='outline-secondary' onClick={() => setShow(!show)}>{show ? "read less" : "read more"}</Button>
                            </Card.Text>
                            <Card.Title>Known for:</Card.Title>

                            <Container fluid>
                                <div className="scrolling-wrapper row flex-row flex-nowrap">
                                    {result.movie_credits.cast.map(movie => (
                                        <Col md={3} className="card-block" key={movie.id}>
                                            <Card className="card-block">
                                                <Card.Body as={Link} to={`${url}${movie.id}`}>
                                                    <Image src={BASE_URL_PROFILE_IMAGE + movie.poster_path} />
                                                    <Card.Text>
                                                        {movie.original_title}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </div>
                            </Container>

                        </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup >
        </>
    )
}

export default Actors