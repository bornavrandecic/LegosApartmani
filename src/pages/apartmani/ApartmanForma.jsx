import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Col, Form, Image, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"

// Zajednička forma za dodavanje i promjenu apartmana.
// apartman = početne vrijednosti (prazan objekt kod dodavanja)
export default function ApartmanForma({ apartman = {}, onSpremi, tekstGumba }) {
    const [slikaUrl, setSlikaUrl] = useState(apartman.slikaUrl ?? '')

    function obradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        onSpremi({
            naziv: podaci.get('naziv'),
            opis: podaci.get('opis'),
            grad: podaci.get('grad'),
            adresa: podaci.get('adresa'),
            cijenaPoNoci: parseFloat(podaci.get('cijenaPoNoci')),
            kapacitet: parseInt(podaci.get('kapacitet')),
            slikaUrl: podaci.get('slikaUrl'),
            aktivan: podaci.get('aktivan') === 'on'
        })
    }

    return (
        <Form onSubmit={obradiSubmit} className="forma-okvir">
            <Row className="g-4">
                <Col lg={8}>
                    <Form.Group controlId="naziv" className="mb-3">
                        <Form.Label>Naziv apartmana</Form.Label>
                        <Form.Control type="text" name="naziv" required
                            defaultValue={apartman.naziv} placeholder="npr. Lux Sunset Apartment" />
                    </Form.Group>

                    <Form.Group controlId="opis" className="mb-3">
                        <Form.Label>Opis</Form.Label>
                        <Form.Control as="textarea" rows={3} name="opis"
                            defaultValue={apartman.opis} placeholder="Opis smještaja, opremljenosti..." />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} sm={6} controlId="grad">
                            <Form.Label>Grad</Form.Label>
                            <Form.Control type="text" name="grad" required
                                defaultValue={apartman.grad} placeholder="npr. Zadar" />
                        </Form.Group>
                        <Form.Group as={Col} sm={6} controlId="adresa">
                            <Form.Label>Adresa</Form.Label>
                            <Form.Control type="text" name="adresa" required
                                defaultValue={apartman.adresa} placeholder="npr. Obala kneza Trpimira 8" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} sm={6} controlId="cijenaPoNoci">
                            <Form.Label>Cijena po noći (€)</Form.Label>
                            <Form.Control type="number" name="cijenaPoNoci" step="0.01" min="1" required
                                defaultValue={apartman.cijenaPoNoci} placeholder="0.00" />
                        </Form.Group>
                        <Form.Group as={Col} sm={6} controlId="kapacitet">
                            <Form.Label>Kapacitet (broj osoba)</Form.Label>
                            <Form.Control type="number" name="kapacitet" step={1} min="1" max="20" required
                                defaultValue={apartman.kapacitet} placeholder="npr. 4" />
                        </Form.Group>
                    </Row>

                    <Form.Group controlId="slikaUrl" className="mb-3">
                        <Form.Label>URL slike</Form.Label>
                        <Form.Control type="url" name="slikaUrl" value={slikaUrl}
                            onChange={(e) => setSlikaUrl(e.target.value)}
                            placeholder="https://images.unsplash.com/..." />
                    </Form.Group>

                    <Form.Group controlId="aktivan">
                        <Form.Check type="switch" label="Aktivan (može se rezervirati)" name="aktivan"
                            defaultChecked={apartman.aktivan ?? true} />
                    </Form.Group>
                </Col>

                <Col lg={4}>
                    <Form.Label>Pregled slike</Form.Label>
                    {slikaUrl
                        ? <Image src={slikaUrl} rounded fluid alt="Pregled slike" />
                        : <div className="izracun text-muted text-center">Unesite URL slike</div>}
                </Col>
            </Row>

            <hr />
            <Row>
                <Col>
                    <Link to={RouteNames.APARTMANI} className="btn btn-outline-secondary w-100">
                        Odustani
                    </Link>
                </Col>
                <Col>
                    <Button type="submit" variant="success" className="w-100">
                        {tekstGumba}
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}
