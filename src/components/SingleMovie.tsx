import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import Placeholder from '../assets/images/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'

import ListGroup from "react-bootstrap/ListGroup"
import { Link, useNavigate } from "react-router-dom"
import { Result } from "../types/movieAPI.types"
import Container from "react-bootstrap/Container"

interface IProps {
    result: Result
}

const SingleMovie: React.FC<IProps> = ({ result }) => {
    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'
    const BASE_URL_PROFILE_IMAGE = 'https://image.tmdb.org/t/p/w185'

    const navigate = useNavigate()
    return (
        <>
            <ListGroup className="mb-3 my-3">

                <ListGroup.Item className=" px-4 py-4">
                    <Button variant='secondary' className="mb-3" onClick={() => navigate(-1)}>&laquo; Go Back</Button>

                    <Row xs={1} md={2} lg={2} className="g-4">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src={BASE_URL_IMAGE + (result.poster_path)} />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Card>
                            <Card.Body>

                                <h2>{result.title}</h2>
                                {result.genres.map(genre => (
                                    <Card.Text>{genre.name}</Card.Text>
                                )
                                )}
                                <Card.Text>{result.runtime}</Card.Text>
                                <Card.Text>⭐️ {result.vote_average}</Card.Text>
                                <Card.Text>Release date: {result.release_date}</Card.Text>
                                <Card.Text>{result.overview}</Card.Text>

                                <Card.Title>Similar movies:</Card.Title>
                                {result.similar.results.slice(0, 5).map(data => (
                                    <Button key={data.id} variant="outline-secondary" className="similar-movies-btn mb-2 m-2" href={`/movies/${data.id}`}>{data.title}</Button>
                                ))}
                                <Card.Title>Actors:</Card.Title>

                                <Container fluid>
                                    <div className="scrolling-wrapper row flex-row flex-nowrap">
                                        {result.credits.cast.map(actor => (
                                            <Col md={5} className="card-block" key={actor.id}>
                                                <Card className="card-block">
                                                    <Card.Body as={Link} to={`actors/${actor.id}`}>
                                                        {actor.profile_path
                                                            ? <Image src={BASE_URL_PROFILE_IMAGE + actor.profile_path} />
                                                            : <Image src={Placeholder} />
                                                        }
                                                        <Card.Text>
                                                            {actor.name}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </div>

                                </Container>
                            </Card.Body>
                        </Card>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}

export default SingleMovie