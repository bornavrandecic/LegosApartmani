import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApartmanPregled from './pages/apartmani/ApartmanPregled'
import ApartmanNovi from './pages/apartmani/ApartmanNovi'
import ApartmanPromjena from './pages/apartmani/ApartmanPromjena'
import GostPregled from './pages/gosti/GostPregled'
import GostNovi from './pages/gosti/GostNovi'
import GostPromjena from './pages/gosti/GostPromjena'
import { DATA_SOURCE, IME_APLIKACIJE, RouteNames } from './constants'

export default function App() {

  return (
    <>
      <Container>
        <Izbornik />
        <Container className='app'>
          <Routes>
            <Route path={RouteNames.HOME} element={<Home />} />
            <Route path={RouteNames.APARTMANI} element ={<ApartmanPregled/>} />
            <Route path={RouteNames.APARTMANI_DODAJ} element={<ApartmanNovi />} />
                  <Route path={RouteNames.APARTMANI_PROMJENA} element={<ApartmanPromjena />} />

            <Route path={RouteNames.GOSTI} element={<GostPregled />} />
            <Route path={RouteNames.GOSTI_DODAJ} element={<GostNovi />} />
            <Route path={RouteNames.GOSTI_PROMJENA} element={<GostPromjena />} />
          </Routes>
           </Container>
        <hr />
        &copy; {IME_APLIKACIJE} ({DATA_SOURCE})
      </Container>
         </>
  )
}