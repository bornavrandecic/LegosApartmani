import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import Izbornik from './components/Izbornik'
import { DATA_SOURCE, IME_APLIKACIJE, RouteNames } from './constants'
import Home from './pages/Home'
import ApartmanPregled from './pages/apartmani/ApartmanPregled'
import ApartmanNovi from './pages/apartmani/ApartmanNovi'
import ApartmanPromjena from './pages/apartmani/ApartmanPromjena'
import GostPregled from './pages/gosti/GostPregled'
import GostNovi from './pages/gosti/GostNovi'
import GostPromjena from './pages/gosti/GostPromjena'
import RezervacijaPregled from './pages/rezervacije/RezervacijaPregled'
import RezervacijaNovi from './pages/rezervacije/RezervacijaNovi'
import RezervacijaPromjena from './pages/rezervacije/RezervacijaPromjena'

export default function App() {
  return (
    <>
      <Izbornik />
      <Container className='app'>
        <Routes>
          <Route path={RouteNames.HOME} element={<Home />} />

          <Route path={RouteNames.APARTMANI} element={<ApartmanPregled />} />
          <Route path={RouteNames.APARTMANI_DODAJ} element={<ApartmanNovi />} />
          <Route path={RouteNames.APARTMANI_PROMJENA} element={<ApartmanPromjena />} />

          <Route path={RouteNames.GOSTI} element={<GostPregled />} />
          <Route path={RouteNames.GOSTI_DODAJ} element={<GostNovi />} />
          <Route path={RouteNames.GOSTI_PROMJENA} element={<GostPromjena />} />

          <Route path={RouteNames.REZERVACIJE} element={<RezervacijaPregled />} />
          <Route path={RouteNames.REZERVACIJE_DODAJ} element={<RezervacijaNovi />} />
          <Route path={RouteNames.REZERVACIJE_PROMJENA} element={<RezervacijaPromjena />} />
        </Routes>
      </Container>
      <Container className='podnozje'>
        <hr />
        &copy; {new Date().getFullYear()} {IME_APLIKACIJE} · izvor podataka: {DATA_SOURCE}
      </Container>
    </>
  )
}
