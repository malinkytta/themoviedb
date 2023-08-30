import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import ClickedMoviesComponent from "../components/ClickedMoviesComponent"

const Navigation = () => {
    const [searchInput, setSearchInput] = useState("")
    const navigate = useNavigate()
    const savedMovies = localStorage.getItem('clickedMovies')
    const [showOffcanvas, setShowOffcanvas] = useState(false)

    const closeOffcanvas = () => {
        setShowOffcanvas(false)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        navigate(`/search?query=${encodeURIComponent(searchInput)}`)
    }
    const clickedMovies = savedMovies ? JSON.parse(savedMovies) : []

    return (
        <Navbar sticky='top' expand={false} data-bs-theme="dark" className="bg-body-tertiary mb-3">
            <Container>
                <Navbar.Brand as={Link} to={'/'}>The Movie DB</Navbar.Brand>
                {/* <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
                <Navbar.Toggle onClick={() => setShowOffcanvas(true)} />
                <Navbar.Offcanvas
                    show={showOffcanvas}
                    onHide={() => setShowOffcanvas(false)}
                    data-bs-theme="dark"
                    id={`offcanvasNavbar`}
                    aria-labelledby={`offcanvasNavbarLabel`}
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel}`}>
                            The Movie DB
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav>
                            <Nav.Link as={NavLink} end to="/top-rated"
                                className="nav-link"
                                onClick={() => { closeOffcanvas() }}
                            >
                                Top Rated</Nav.Link>
                            <Nav.Link
                                as={NavLink} end to="/popular-movies"
                                className="nav-link"
                                onClick={() => { closeOffcanvas() }}
                            >
                                Popular</Nav.Link>
                            <Nav.Link as={NavLink} end to="/now-playing"
                                className="nav-link"
                                onClick={() => { closeOffcanvas() }}
                            >
                                Now Playing</Nav.Link>
                            <Nav.Link as={NavLink} end to="/movies"
                                className="nav-link"
                                onClick={() => { closeOffcanvas() }}
                            >
                                All Movies</Nav.Link>
                        </Nav>
                        <hr />
                        <Container>
                            <ClickedMoviesComponent result={clickedMovies} />
                        </Container>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>

    )
}

export default Navigation