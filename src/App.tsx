import { Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Container from 'react-bootstrap/Container'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'

import './assets/scss/App.scss'

const App = () => {

  return (
    <>
      <Navigation />

      <div id="App">
        {/* <Sidebar /> */}

        <Container className="py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Container>

        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />

      </div>
    </>
  )
}

export default App
