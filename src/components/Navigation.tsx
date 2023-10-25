import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import ClickedMoviesComponent from "../components/ClickedMoviesComponent"

const Navigation = () => {

    const savedMovies = localStorage.getItem('clickedMovies')
    const [showOffcanvas, setShowOffcanvas] = useState(false)

    const closeOffcanvas = () => {
        setShowOffcanvas(false)
    }

    const clickedMovies = savedMovies ? JSON.parse(savedMovies) : []

    return (
        <Navbar sticky='top' expand={false} data-bs-theme="dark" className="mb-3">
            <Container>
                <Navbar.Brand as={Link} to={'/'}>
                The<span style={{ color: "#cc5e48" }}>Movie</span>DB
                </Navbar.Brand>
                <Link to={'/search'}>
                    <Button
                        variant="transparent">
                        <i className="fa fa-search"></i>
                    </Button></Link>
                <Navbar.Toggle onClick={() => setShowOffcanvas(true)} />
                <Navbar.Offcanvas
                    show={showOffcanvas}
                    onHide={() => setShowOffcanvas(false)}
                    data-bs-theme="dark"
                    id={`offcanvasNavbar`}
                    aria-labelledby={`offcanvasNavbarLabel`}
                    placement="start"
                >
                    <Offcanvas.Header className='justify-content-end' closeButton>

                    </Offcanvas.Header>
                    <Offcanvas.Body className='d-flex flex-column between'>
                        <Offcanvas.Title id={`offcanvasNavbarLabel}`}>
                            The Movie DB
                        </Offcanvas.Title>
                        <Nav>
                            <Nav.Link as={NavLink} to="/top-rated"
                                className="nav-link"
                                onClick={() => { closeOffcanvas() }}
                            >
                                Top Rated</Nav.Link>
                            <Nav.Link
                                as={NavLink} to="/popular-movies"
                                className="nav-link"
                                onClick={() => { closeOffcanvas() }}
                            >
                                Popular</Nav.Link>
                            <Nav.Link as={NavLink} to="/now-playing"
                                className="nav-link"
                                onClick={() => { closeOffcanvas() }}
                            >
                                Now Playing</Nav.Link>
                            <Nav.Link as={NavLink} to="/movies"
                                className="nav-link"
                                onClick={() => { closeOffcanvas() }}
                            >
                                All Movies</Nav.Link>
                            <hr />
                        </Nav>

                        <Container className="my-3">
                            <ClickedMoviesComponent result={clickedMovies} setShowOffcanvas={setShowOffcanvas} />
                        </Container>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar >

    )
}

export default Navigation