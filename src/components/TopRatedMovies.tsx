import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import { Link } from 'react-router-dom'
import { MovieResponse } from '../types/movieAPI.types'

interface Iprops {
    result: MovieResponse
}
const TopRatedMovies: React.FC<Iprops> = ({ result }) => {
    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/w500'

    return (
        <Container>
            <div className="d-flex justify-content-between pt-5">
                <h2>Top Rated Movies</h2>
                <Button
                    variant="dark"
                    href={`top-rated`}
                >
                    All movies &gt;
                </Button>
            </div>

            {result && (
                <>
                    <Row className="g-4 slider flex-nowrap">
                        {result.results.slice(0, 10).map(data => (
                            <Col key={data.id} className=" d-flex align-items-stretch">
                                <Card as={Link} to={`/top-rated/${data.id}`} className="movies-card">
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
            )}
        </Container>
    )
}

export default TopRatedMovies