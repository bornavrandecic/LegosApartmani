import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { FaBed, FaCalendarAlt, FaHome, FaUsers } from 'react-icons/fa';
import { IME_APLIKACIJE, RouteNames } from '../constants';

export default function Izbornik() {
    return (
        <Navbar expand="lg" variant="dark" className="legos-navbar shadow-sm">
            <Container>
                <Navbar.Brand as={NavLink} to={RouteNames.HOME} className="fw-bold">
                    {IME_APLIKACIJE}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="glavni-izbornik" />
                <Navbar.Collapse id="glavni-izbornik">
                    <Nav className="ms-auto">
                        {/* NavLink sam dodaje klasu "active" na stranicu na kojoj smo */}
                        <Nav.Link as={NavLink} to={RouteNames.HOME} end>
                            <FaHome className="me-1" /> Početna
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={RouteNames.APARTMANI}>
                            <FaBed className="me-1" /> Apartmani
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={RouteNames.GOSTI}>
                            <FaUsers className="me-1" /> Gosti
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={RouteNames.REZERVACIJE}>
                            <FaCalendarAlt className="me-1" /> Rezervacije
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
