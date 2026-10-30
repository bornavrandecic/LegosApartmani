import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { IME_APLIKACIJE, RouteNames } from './constants'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApartmanPregled from './pages/apartmani/ApartmanPregled'
import ApartmanNovi from './pages/apartmani/ApartmanNovi'

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
          </Routes>
           </Container>
        <hr />
        &copy; {IME_APLIKACIJE}
      </Container>
         </>
  )
}