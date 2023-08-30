import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'
import { MovieResponse } from '../types/movieAPI.types'

interface Iprops {
    result: MovieResponse
}
const TopRatedMovies: React.FC<Iprops> = ({ result }) => {
    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/w500'

    return (
        <>
            <div className="d-flex justify-content-between pt-5">
                <h2>Top Rated Movies</h2>
                <Button
                    variant="dark"
                    href={`top-rated`}
                >
                    All movies &gt;
                </Button>
            </div>

            <Row xs={1} md={2} lg={2} className="g-4">
                {result && (
                    <>

                        {result.results.slice(0, 2).map(data => (
                            <Col key={data.id} className="d-flex align-items-stretch">

                                <Card as={Link} to={`/top-rated/${data.id}`}>
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
                    </>
                )}
            </Row>
        </>
    )
}

export default TopRatedMovies