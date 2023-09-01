import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React from 'react'
import Container from 'react-bootstrap/Container'

interface IProps {
    searchInput: string
    setSearchInput: (value: React.SetStateAction<string>) => void
    handleSubmit: (e: React.FormEvent) => void
}

const Search: React.FC<IProps> = ({
    searchInput,
    setSearchInput,
    handleSubmit
}) => {

    return (
        <>
            <Container>
                <Form
                    className="mb-4"
                    onSubmit={handleSubmit}
                >
                    <Form.Group className="mb-3" controlId="searchQuery">
                        <Form.Label>Search Query</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Search for Movie"
                            className="search-form"
                            onChange={e => setSearchInput(e.target.value)}
                            value={searchInput}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2" >
                        <Button
                            type="submit"
                            disabled={!searchInput.trim().length}
                            className="btn-next"
                        >
                            Search
                        </Button>
                    </div>

                </Form>
            </Container>
        </>
    )
}

export default Search