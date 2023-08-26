/**
 * Till att skriva ut alla filmer
 */

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Placeholder from '../assets/images/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
import { MovieResponse } from '../types/movieAPI.types'


interface IProps {
    result: MovieResponse
    url: string
}

const Movies: React.FC<IProps> = ({ result, url }) => {

    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/w500'


    return (
        <>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {result && (
                    <>
                        {result.results.map(movie => (
                            <Col key={movie.id} className="d-flex align-items-stretch">
                                <Card className="glass">
                                    <Card.Body className=" d-flex row px-4">
                                        {movie.poster_path
                                            ? <Card.Img alt="poster" src={BASE_URL_IMAGE + movie.poster_path} />
                                            : <Card.Img alt="placeholder" src={Placeholder}
                                                style={{ height: ' 237px' }} />}

                                        {/* <Card.Img variant="top" src={BASE_URL_IMAGE} /> */}
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>
                                            ⭐️ {movie.vote_average}
                                        </Card.Text>
                                        <Button
                                            variant="dark"
                                            href={`${url}${movie.id}`}
                                        >
                                            Read more
                                        </Button>
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

export default Movies