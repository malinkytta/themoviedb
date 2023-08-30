
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom"
import { Result } from "../types/movieAPI.types"
import Carousel from "react-bootstrap/Carousel"
import Container from "react-bootstrap/Container"

interface Iprops {
    result: Result[]
}

const ClickedMoviesComponent: React.FC<Iprops> = ({ result }) => {
    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'


    return (
        <>
            <div className="d-flex justify-content-center align-content-center">
                <h3>Recently watched</h3>
                <div className="vertical-ruler"> </div>
                <p>{result.length && result.length > 1 ? `${result.length} movies` : `${result.length} movie`}</p>
            </div>

            {result && result.length > 0 && (
                <>
                    <Container className="pt-3 px-5 py-5">
                        <Carousel className="mb-5" interval={null} >
                            {result.map((movie) => (
                                <Carousel.Item key={movie.id}>
                                    <div className="d-flex justify-content-center">
                                        <Card as={Link} to={`now-playing/${movie.id}`} className="mx-3">
                                            <Card.Img
                                                className="img-movie"
                                                variant="top"
                                                src={BASE_URL_IMAGE + movie.backdrop_path}
                                            />
                                            <Card.Title>{movie.title}</Card.Title>
                                        </Card>

                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel >
                    </Container>

                </>
            )}

        </>
    )
}
export default ClickedMoviesComponent