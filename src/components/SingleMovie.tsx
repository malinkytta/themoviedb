import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Image from "react-bootstrap/Image"
import { Link } from "react-router-dom"
import { Result } from "../types/movieAPI.types"
import Container from "react-bootstrap/Container"

interface IProps {
    result: Result
}

const SingleMovie: React.FC<IProps> = ({ result }) => {
    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'

    return (
        <>
            <div className="background-image" style={{
                backgroundImage: result.poster_path ? `url(${BASE_URL_IMAGE}${result.poster_path})` : ''
            }}>
                <div className="blur">
                    <Container>
                        <Row xs={1} sm={1} md={2} lg={2} className="g-4 pt-5 pb-2 justify-content-center">
                            <Image className="order-md-2 single-movie-img"
                                src={result.poster_path
                                    ? BASE_URL_IMAGE + result.poster_path
                                    : 'https://placehold.co/300x400'
                                }
                            />

                            <Card className="transparent-bg order-md-1">
                                <h2>
                                    {result.title} ({result.release_date && result.release_date.toString().slice(0, 4)})
                                </h2>
                                <div className="d-flex">
                                    {result.genres.map(genre => (
                                        <Card.Text className="mx-2" key={genre.id}>{genre.name}</Card.Text>
                                    ))}
                                </div>
                                <Card.Text>
                                    {Math.floor(result.runtime / 60)} h{' '}
                                    {result.runtime % 60} min
                                </Card.Text>
                                <Card.Text>⭐️ {result.vote_average}</Card.Text>
                                <Card.Text>Release date: {result.release_date}</Card.Text>
                                <h5>Overview</h5>
                                <Card.Text>{result.overview}</Card.Text>
                            </Card>
                        </Row>
                        {result.credits.cast.length > 0 && (
                            <Col className="order-md-3">
                                <h3>Actors</h3>
                                <Row className="g-3 slider flex-nowrap">
                                    {result.credits.cast.map(data => (
                                        <Col key={data.id} className=" d-flex align-items-stretch">
                                            <Card as={Link} to={`actors/${data.id}`} className="movies-card">
                                                <div className=''>
                                                    <Card.Img alt="poster" src={data.profile_path
                                                        ? BASE_URL_IMAGE + data.profile_path
                                                        : 'https://placehold.co/300x400'
                                                    } />
                                                </div>
                                                <Card.Body className='single-movie-details'>
                                                    <Card.Title>{data.name}</Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>

                        )}

                        {result.similar.results.length > 0 && (
                            <Col className="order-md-4">
                                <h3>Similar movies</h3>
                                <Row className="g-3 slider flex-nowrap">
                                    {result.similar.results.map(movie => (
                                        <Col key={movie.id} className=" d-flex align-items-stretch">
                                            <Card as={Link} to={`/movies/${movie.id}`} className="movies-card">
                                                <div className=''>
                                                    <Card.Img alt="poster" src={movie.poster_path
                                                        ? BASE_URL_IMAGE + movie.poster_path
                                                        : 'https://placehold.co/300x400'
                                                    } />
                                                </div>
                                                <Card.Body className="single-movie-details">
                                                    <Card.Title>{movie.title}</Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        )}


                    </Container>
                </div >
            </div >
        </>
    )
}

export default SingleMovie