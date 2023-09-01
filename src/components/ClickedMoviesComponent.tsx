
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom"
import { Result } from "../types/movieAPI.types"
import Carousel from "react-bootstrap/Carousel"
import Container from "react-bootstrap/Container"

interface Iprops {
    result: Result[]
    setShowOffcanvas: (value: React.SetStateAction<boolean>) => void

}

const ClickedMoviesComponent: React.FC<Iprops> = ({ result, setShowOffcanvas }) => {
    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'


    return (
        <>
            <div className="d-flex justify-content-center align-self-center">
                <h3 className="justify-self-center">Recently watched</h3>
                <p className="vertical-ruler"> </p>
                <p className="align-self-center">{result.length && result.length > 1 ? `${result.length} movies` : `${result.length} movie`}</p>
            </div>

            {result && result.length > 0 && (
                <>
                    <Container className="pt-3 px-5 py-2">
                        <Carousel className="mb-5  custom-carousel" interval={null} >
                            {result.map((movie) => (
                                <Carousel.Item key={movie.id}>
                                    <div className="d-flex justify-content-center">
                                        <Card
                                            as={Link} to={`movies/${movie.id}`}
                                            onClick={() => setShowOffcanvas(false)}
                                            className="mx-3"
                                            style={{ width: "300px" }}
                                        >
                                            <Card.Img
                                                style={{ height: "100%", objectFit: "cover" }}
                                                className="img-movie"
                                                variant="top"
                                                src={movie.backdrop_path
                                                    ? BASE_URL_IMAGE + movie.backdrop_path
                                                    : 'https://placehold.co/500x300'
                                                }
                                            />

                                        </Card>

                                    </div>
                                    <Card.Body className="pt-2">
                                        <Card.Text >{movie.title}</Card.Text>
                                    </Card.Body>
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