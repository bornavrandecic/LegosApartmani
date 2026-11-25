import { Link } from "react-router-dom"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"

// Zajednička forma za dodavanje i promjenu gosta
export default function GostForma({ gost = {}, onSpremi, tekstGumba }) {

    function obradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        onSpremi({
            ime: podaci.get('ime').trim(),
            prezime: podaci.get('prezime').trim(),
            email: podaci.get('email').trim(),
            telefon: podaci.get('telefon').trim()
        })
    }

    return (
        <Form onSubmit={obradiSubmit} className="forma-okvir">
            <Row className="mb-3">
                <Form.Group as={Col} sm={6} controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required defaultValue={gost.ime} />
                </Form.Group>
                <Form.Group as={Col} sm={6} controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required defaultValue={gost.prezime} />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} sm={6} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" required defaultValue={gost.email}
                        placeholder="ime@primjer.hr" />
                </Form.Group>
                <Form.Group as={Col} sm={6} controlId="telefon">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control type="tel" name="telefon" defaultValue={gost.telefon}
                        placeholder="091 123 4567" />
                </Form.Group>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Link to={RouteNames.GOSTI} className="btn btn-outline-secondary w-100">Odustani</Link>
                </Col>
                <Col>
                    <Button type="submit" variant="success" className="w-100">{tekstGumba}</Button>
                </Col>
            </Row>
        </Form>
    )
}
