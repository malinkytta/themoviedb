import { Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Container from 'react-bootstrap/Container'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'

import './assets/scss/App.scss'
import MoviesPage from './pages/MoviesPage'
import SingleMoviePage from './pages/SingleMoviePage'
import GenreMoviesPage from './pages/GenreMoviesPage'
import SearchMoviesPage from './pages/SearchMoviesPage'
import ActorsPage from './pages/ActorsPage'

const App = () => {

  return (
    <>
      <Navigation />

      <div id="App">
        {/* <Sidebar /> */}

        <Container className="py-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/popular-movies" element={<MoviesPage />} />
            <Route path="/popular-movies/:id" element={<SingleMoviePage />} />
            <Route path="/popular-movies/:id/actors/:id" element={<ActorsPage />} />

            <Route path="/top-rated" element={<MoviesPage />} />
            <Route path="/top-rated/:id" element={<SingleMoviePage />} />
            <Route path="/top-rated/:id/actors/:id" element={<ActorsPage />} />

            <Route path="/now-playing" element={<MoviesPage />} />
            <Route path="/now-playing/:id" element={<SingleMoviePage />} />
            <Route path="/now-playing/:id/actors/:id" element={<ActorsPage />} />

            <Route path="/movies" element={<GenreMoviesPage />} />
            <Route path="/movies/:id" element={<SingleMoviePage />} />
            <Route path="/movies/:id/actors/:id" element={<ActorsPage />} />

            <Route path="/search" element={<SearchMoviesPage />} />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </Container>

        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />

      </div>
    </>
  )
}

export default App
