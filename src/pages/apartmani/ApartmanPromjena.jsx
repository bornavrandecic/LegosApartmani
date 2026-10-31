import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import ApartmanService from "../../services/apartmani/ApartmanService";
import { useEffect, useState } from "react";


export default function ApartmanPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [apartman, setApartman] = useState({})
    const [aktivan, setAktivan] = useState(false)

    async function ucitajApartman() {
        await ApartmanService.getBySifra(params.sifra).then((odgovor) => {
            const a = odgovor.data
            a.datumPokretanja = a.datumPokretanja.substring(0, 10)
            setApartman(a)
            setAktivan(a.aktivan)
        })
    }

    useEffect(() => {
        ucitajApartman()
    }, [])

    async function promijeni(apartman) {
        await ApartmanService.promijeni(params.sifra, apartman).then(() => {
            navigate(RouteNames.APARTMANI)
        })
    }

    function obradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promijeni({
            naziv: podaci.get('naziv'),
            opis: podaci.get('opis'),
            grad: podaci.get("grad"),
            adresa: podaci.get("adresa"),
            cijenaPoNoci: parseFloat(podaci.get('cijenaPoNoci')),
            kapacitet: parseInt(podaci.get('kapacitet')),
            slikaUrl: podaci.get('slikaUrl'),
            aktivan: aktivan
        })
    }


    return (
        <>
            <h3>
                Promjena Apartmana
            </h3>

            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required
                        defaultValue={apartman.naziv} />
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control type="text" name="opis"
                        defaultValue={apartman.opis} />
                </Form.Group>

                <Form.Group controlId="grad">
                    <Form.Label>Grad</Form.Label>
                    <Form.Control type="text" name="grad"
                        defaultValue={apartman.grad} />
                </Form.Group>

                <Form.Group controlId="adresa">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control type="text" name="adresa"
                        defaultValue={apartman.adresa} />
                </Form.Group>


                <Form.Group controlId="cijenaPoNoci">
                    <Form.Label>Cijena po noći</Form.Label>
                    <Form.Control type="number" name="cijenaPoNoci" step={0.01}
                        defaultValue={apartman.cijenaPoNoci} />
                </Form.Group>

                <Form.Group controlId="kapacitet">
                    <Form.Label>Kapacitet</Form.Label>
                    <Form.Control type="number" name="kapacitet"
                        defaultValue={apartman.kapacitet} />
                </Form.Group>

                <Form.Group controlId="slikaUrl">
                    <Form.Label>Slika URL</Form.Label>
                    <Form.Control type="text" name="slikaUrl"
                        defaultValue={apartman.slikaUrl} />
                </Form.Group>

                <Form.Group controlId="aktivan" className="mt-3">
                    <Form.Check label="Aktivan" name="aktivan"
                        checked={aktivan}
                        onChange={(e) => { setAktivan(e.target.checked) }} />
                </Form.Group>


                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.APARTMANI}
                            className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Promijeni
                        </Button>
                    </Col>
                </Row>
            </Form>


        </>
    )
}