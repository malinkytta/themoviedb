import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"

import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import { Result } from "../types/movieAPI.types"

interface IProps {
    result: Result
}

const SingleMovie: React.FC<IProps> = ({ result }) => {
    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'
    const BASE_URL_PROFILE_IMAGE = 'https://image.tmdb.org/t/p/w185'

    return (
        <>
            <ListGroup className="mb-3 my-3">
                <ListGroup.Item className=" px-4 py-4">
                    <h2>{result.title}</h2>

                    <Row xs={1} md={2} lg={2} className="g-4">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src={BASE_URL_IMAGE + result.poster_path} />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Card>
                            <Card.Body>

                                <Card.Title>{result.title}</Card.Title>

                                <Card.Text>⭐️ {result.vote_average}</Card.Text>
                                <Card.Text>Release date: {result.release_date}</Card.Text>
                                <Card.Text>{result.overview}</Card.Text>

                                <Card.Title>Similar movies:</Card.Title>
                                {result.similar.results.slice(0, 5).map(data => (
                                    <Button key={data.id} href={`/movies/${data.id}`}>{data.title}</Button>
                                ))}


                                <Card.Title>Actors</Card.Title>
                                <Row xs={1} md={4} className="g-4">
                                    {result.credits.cast.slice(0, 5).map(cast => (
                                        <Col key={cast.id}>
                                            <Card>
                                                <Card.Body as={Link} to={`actors/${cast.id}`}>
                                                    <Image fluid src={BASE_URL_PROFILE_IMAGE + cast.profile_path} />
                                                    <Card.Text >
                                                        {cast.name}
                                                    </Card.Text>

                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}

export default SingleMovie