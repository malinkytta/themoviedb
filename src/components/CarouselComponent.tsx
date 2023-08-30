import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom'
import { MovieResponse } from '../types/movieAPI.types'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'

interface IProps {
    result: MovieResponse
}

const CarouselComponent: React.FC<IProps> = ({ result }) => {

    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'

    return (
        <>
            <h2>In cinemas now</h2>

            {result && (

                <Carousel interval={null} className="now-playing">
                    {
                        result.results.slice(0, 10).map(movie => (
                            <Carousel.Item key={movie.id}>
                                <Image
                                    className="d-block w-100 img-movie"
                                    src={BASE_URL_IMAGE + movie.backdrop_path}
                                    alt="Movie poster"
                                />
                                <Carousel.Caption as={Link} to={`now-playing/${movie.id}`} className="mb-3">
                                    <h3>{movie.title}</h3>
                                </Carousel.Caption>
                            </Carousel.Item >
                        ))}

                </Carousel >
            )}

        </>
    );
};

export default CarouselComponent;





