import Container from "react-bootstrap/Container"

const NotFound = () => {

    return (
        <Container className="not-found-page py-auto">
            <h2>404</h2>
            <div className="mx-4">
                <p>Looks like our page has pulled a 'Taken' and disapeared!</p>
                <p>But don't you worry, we've got a particular set of skills for finding movie magic. </p>
                <p>Return to the homepage, and we'll make sure you cinematic adventure isn't 'Taken' away.
                </p>
            </div>
        </Container>
    )
}

export default NotFound