import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import ApartmanService from "../../services/apartmani/ApartmanService";


export default function ApartmanNovi() {

    const navigate = useNavigate()

    async function dodaj(apartman){
        await ApartmanService.dodaj(apartman).then(()=>{
            navigate(RouteNames.APARTMANI)
        })
    }

    function obradiSubmit(e) {
    e.preventDefault(); 
    const podaci = new FormData(e.target);

    dodaj({
        naziv: podaci.get('naziv'),
        opis: podaci.get('opis'),
        grad: podaci.get('grad'),
        adresa: podaci.get('adresa'),
        cijenaPoNoci: parseFloat(podaci.get('cijenaPoNoci')),
        kapacitet: parseInt(podaci.get('kapacitet')),
        slikaUrl: podaci.get('slikaUrl'),
        aktivan: podaci.get('aktivan') === 'on' 
    });
}


    return (
        <>
            <h3>
                Dodavanje novog apartmana
            </h3>

           <Form onSubmit={obradiSubmit}>
    <Form.Group controlId="naziv" className="mb-3">
        <Form.Label>Naziv apartmana</Form.Label>
        <Form.Control type="text" name="naziv" required placeholder="npr. Lux Sunset Apartment" />
    </Form.Group>

    <Form.Group controlId="opis" className="mb-3">
        <Form.Label>Opis</Form.Label>
        <Form.Control as="textarea" rows={3} name="opis" placeholder="Opis smještaja, opremljenosti..." />
    </Form.Group>

    <Row className="mb-3">
        <Form.Group as={Col} controlId="grad">
            <Form.Label>Grad</Form.Label>
            <Form.Control type="text" name="grad" required placeholder="npr. Zadar" />
        </Form.Group>

        <Form.Group as={Col} controlId="adresa">
            <Form.Label>Adresa</Form.Label>
            <Form.Control type="text" name="adresa" required placeholder="npr. Obala kneza Trpimira 8" />
        </Form.Group>
    </Row>

    <Row className="mb-3">
        <Form.Group as={Col} controlId="cijenaPoNoci">
            <Form.Label>Cijena po noći (€)</Form.Label>
            <Form.Control type="number" name="cijenaPoNoci" step="0.01" min="0" required placeholder="0.00" />
        </Form.Group>

        <Form.Group as={Col} controlId="kapacitet">
            <Form.Label>Kapacitet (broj osoba)</Form.Label>
            <Form.Control type="number" name="kapacitet" step={1} min="1" required placeholder="npr. 4" />
        </Form.Group>
    </Row>

    <Form.Group controlId="slikaUrl" className="mb-3">
        <Form.Label>URL slike</Form.Label>
        <Form.Control type="url" name="slikaUrl" placeholder="https://images.unsplash.com/..." />
    </Form.Group>

    <Form.Group controlId="aktivan" className="mb-3">
        <Form.Check type="checkbox" label="Aktivan (vidljiv gostima)" name="aktivan" defaultChecked />
    </Form.Group>

    <hr />

    <Row>
        <Col>
            <Link to={RouteNames.APARTMANI} className="btn btn-danger w-100">
                Odustani
            </Link>
        </Col>
        <Col>
            <Button type="submit" variant="success" className="w-100">
                Spremi apartman
            </Button>
        </Col>
    </Row>
</Form>

        </>
    )
}