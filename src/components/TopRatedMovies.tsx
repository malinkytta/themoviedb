import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { MovieResponse } from '../types/movieAPI.types'

interface Iprops {
    result: MovieResponse
}
const TopRatedMovies: React.FC<Iprops> = ({ result }) => {
    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/w500'

    return (
        <>
            <h2 className="ps-5 pt-4 pb-1 movies-title">Top Rated Movies</h2>

            {result && (
                <>
                    <Row className="g-3 slider flex-nowrap ms-3 top-rated">
                        {result.results.slice(0, 10).map(data => (
                            <Col key={data.id} className=" d-flex align-items-stretch">
                                <Card as={Link} to={`/top-rated/${data.id}`} className="movies-card">
                                    <div className='poster'>
                                        <Card.Img alt="poster" src={data.poster_path
                                            ? BASE_URL_IMAGE + data.poster_path
                                            : 'https://placehold.co/500x750/1c1c1c/FFF?text=Image+Not+Found'
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
            )
            }
        </>
    )
}

export default TopRatedMovies