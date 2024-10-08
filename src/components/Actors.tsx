import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Image from "react-bootstrap/Image"
import { Cast } from "../types/cast.types"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import { useState } from "react"

interface IProps {
    result: Cast
    url: string
}
const Actors: React.FC<IProps> = ({ result, url }) => {
    const [readMore, setReadMore] = useState(false)

    const toggleText = () => {
        setReadMore(!readMore)
    }

    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'
    return (

        <>
            <div className="background-image" style={{
                backgroundImage: result.profile_path ? `url(${BASE_URL_IMAGE}${result.profile_path})` : ''
            }}>
                <div className="blur">
                    <Container>
                        <Row xs={1} sm={1} md={2} lg={2} className="g-4 pt-5 pb-2 justify-content-center">
                            <Image className="order-md-2 single-movie-img"
                                src={result.profile_path
                                    ? BASE_URL_IMAGE + result.profile_path
                                    : 'https://placehold.co/300x400/1c1c1c/FFF?text=Image+Not+Found'
                                } />

                            <Card className="transparent-bg order-md-1">
                                <h2>{result.name}</h2>
                                <Card.Text>Gender: {
                                    result.gender === 1
                                        ? 'Female'
                                        : result.gender === 2
                                            ? 'Male'
                                            : result.gender === 3
                                                ? 'Non-binary'
                                                : 'Not set / not specified'}
                                </Card.Text>
                                <Card.Text>Place of Birth: {result.place_of_birth}</Card.Text>
                                <Card.Text>Birthday: {result.birthday}</Card.Text>
                                <Card.Title>Biography</Card.Title>
                                <Card.Text>
                                    {result.biography.length <= 200 || readMore
                                        ? result.biography
                                        : `${result.biography.slice(0, 200)}...`}
                                    {result.biography.length > 200 && (
                                        <span onClick={toggleText} className="read-more">
                                            {readMore ? "Show less" : " Read more"}
                                        </span>
                                    )}
                                </Card.Text>
                            </Card>
                        </Row>
                        {result.movie_credits.cast.length > 0 && (
                            <Col className="order-md-3 mt-2">
                                <h3>Movies</h3>
                                <Row className="g-3 slider flex-nowrap">
                                    {result.movie_credits.cast.map(data => (
                                        <Col key={data.id} className=" d-flex align-items-stretch">
                                            <Card as={Link} to={`${url}${data.id}`} className="movies-card">

                                                <Card.Img alt="poster" src={data.poster_path
                                                    ? BASE_URL_IMAGE + data.poster_path
                                                    : 'https://placehold.co/300x400/1c1c1c/FFF?text=Image+Not+Found'
                                                } />

                                                <Card.Body className='single-movie-details'>
                                                    <Card.Title>{data.original_title}</Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        )}

                    </Container>
                </div>
            </div>
        </>
    )
}

export default Actors