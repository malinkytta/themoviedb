import TopRatedMoviesPage from "./TopRatedMoviesPage"
import NowPlayingMoviesPage from "./NowPlayingMoviesPage"
import PopularMoviesPage from "./PopularMoviesPage"
import Container from "react-bootstrap/Container"

const HomePage = () => {

    return (
        <>
            {/* <Container className="px-5"> */}
            <NowPlayingMoviesPage />
            <TopRatedMoviesPage />
            <PopularMoviesPage />
            {/* </Container> */}

        </>
    )
}

export default HomePage