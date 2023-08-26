import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { MovieResponse } from '../types/movieAPI.types';
import React from 'react';

interface IProps {
    result: MovieResponse
}

const CarouselComponent: React.FC<IProps> = ({ result }) => {

    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'

    return (
        <>
            <h1>In cinemas now</h1>

            {result && (
                <Carousel>
                    {result.results.map((movie) => (
                        <Carousel.Item key={movie.id}>
                            <Card as={Link} to={`now-playing/${movie.id}`}>
                                <Card.Img
                                    className="img-movie"
                                    variant="top"
                                    src={BASE_URL_IMAGE + movie.backdrop_path}
                                />
                                <Card.ImgOverlay>
                                    {/* <Card.Body> */}
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>
                                        ⭐️ {movie.vote_average}
                                    </Card.Text>
                                    {/* </Card.Body> */}
                                </Card.ImgOverlay>

                            </Card>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </>
    );
};

export default CarouselComponent;





