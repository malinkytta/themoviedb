import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom'
import { MovieResponse } from '../types/movieAPI.types'
import React from 'react'
import Image from 'react-bootstrap/Image'

interface IProps {
    result: MovieResponse
}

const CarouselComponent: React.FC<IProps> = ({ result }) => {

    const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'

    return (
        <>
            <h2 className="ps-5 pt-4 pb-1 movies-title">In cinemas now</h2>

            {result && (

                <Carousel className="now-playing mt-2">
                    {
                        result.results.slice(0, 10).map(movie => (
                            <Carousel.Item key={movie.id}>
                                <Image
                                    className="d-block w-100 img-movie"
                                    src={movie.backdrop_path
                                        ? BASE_URL_IMAGE + movie.backdrop_path
                                        : 'https://placehold.co/250x400'
                                    }
                                    alt="Movie poster"
                                />
                                <Carousel.Caption as={Link} to={`now-playing/${movie.id}`} >
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





