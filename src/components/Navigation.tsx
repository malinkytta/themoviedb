import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'


const Navigation = () => {
    const [searchInput, setSearchInput] = useState("")
    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        navigate(`/search?query=${encodeURIComponent(searchInput)}`)
    }

    return (
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="md" >
            <Container>
                <Navbar.Brand as={Link} to="/">The Movie DB</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/search">Search</Nav.Link>
                        <NavDropdown title="Movies" data-bs-theme="dark" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/popular-movies">Popular</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/top-rated">Top Rated</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/now-playing">Now Playing</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={NavLink} to="/movies">All movies</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>

                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button href="/search" variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation