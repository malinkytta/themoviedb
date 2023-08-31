import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import { Link, useNavigate } from "react-router-dom"
import { Result } from "../types/movieAPI.types"
import Container from "react-bootstrap/Container"

interface IProps {
    result: Result
}

const SingleMovie: React.FC<IProps> = ({ result }) => {
    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'
    const BASE_URL_PROFILE_IMAGE = 'https://image.tmdb.org/t/p/w185'

    console.log(BASE_URL_IMAGE + result.backdrop_path)
    const navigate = useNavigate()

    return (
        <>
            <div className="background-image" style={{
                backgroundImage: "url(" + BASE_URL_IMAGE + (result.poster_path) + ")"
            }} >
                <div className="blur">

                    <Button variant='secondary' className="mb-3" onClick={() => navigate(-1)}>&laquo; Go Back</Button>
                    <Container>
                        <Row xs={1} md={2} lg={2} className="g-4">
                            <Card className="transparent-bg">
                                <h2>{result.title}</h2>
                                {result.genres.map(genre => (
                                    <Card.Text key={genre.id}>{genre.name}</Card.Text>
                                ))}
                                <Card.Text>{result.runtime}</Card.Text>
                                <Card.Text>⭐️ {result.vote_average}</Card.Text>
                                <Card.Text>Release date: {result.release_date}</Card.Text>
                                <Card.Text>{result.overview}</Card.Text>

                                <Card.Title>Similar movies:</Card.Title>
                                {result.similar.results.slice(0, 5).map(data => (
                                    <Button key={data.id} variant="outline-secondary" className="similar-movies-btn mb-2 m-2" href={`/movies/${data.id}`}>{data.title}</Button>
                                ))}
                            </Card>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src={BASE_URL_IMAGE + (result.poster_path)} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>

                    <Card>
                        <Card.Title>Actors:</Card.Title>
                        {/* <Container fluid> */}
                        <div className="scrolling-wrapper row flex-row flex-nowrap">
                            {result.credits.cast.map(actor => (
                                <Col md={5} className="card-block" key={actor.id}>
                                    <Card className="card-block">
                                        <Card.Body as={Link} to={`actors/${actor.id}`}>
                                            {actor.profile_path
                                                ? <Image src={BASE_URL_PROFILE_IMAGE + actor.profile_path} />
                                                : <Image src='https://placehold.co/500x750' />
                                            }
                                            <Card.Text>
                                                {actor.name}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </div>

                    </Card>
                </div>
            </div>
        </>
    )
}

export default SingleMovie