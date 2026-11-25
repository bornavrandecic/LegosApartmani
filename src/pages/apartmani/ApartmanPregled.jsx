import { useEffect, useState } from "react"
import { Badge, Button, ButtonGroup, Card, Col, Form, InputGroup, Row, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { FaEdit, FaPlus, FaSearch, FaTh, FaTrash, FaList, FaUserFriends } from "react-icons/fa"
import { RouteNames } from "../../constants"
import ApartmanService from "../../services/apartmani/ApartmanService"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import Cijena from "../../components/Cijena"

export default function ApartmanPregled() {
    const [apartmani, setApartmani] = useState([])
    const [pretraga, setPretraga] = useState('')
    const [prikaz, setPrikaz] = useState('kartice') // 'kartice' ili 'tablica'
    const navigate = useNavigate()

    function ucitajApartmane() {
        ApartmanService.get().then((odgovor) => setApartmani(odgovor.data))
    }

    useEffect(() => {
        ucitajApartmane()
    }, [])

    async function obrisi(apartman) {
        // ne dopuštamo brisanje apartmana koji ima rezervacije
        const rezervacije = (await RezervacijaService.get()).data
        const broj = rezervacije.filter(r => r.apartman === apartman.sifra).length
        if (broj > 0) {
            alert(`Apartman "${apartman.naziv}" ima rezervacije (${broj}) i ne može se obrisati. Možete ga označiti kao neaktivan.`)
            return
        }
        if (!confirm(`Sigurno obrisati "${apartman.naziv}"?`)) return
        await ApartmanService.obrisi(apartman.sifra)
        ucitajApartmane()
    }

    const tekst = pretraga.toLowerCase()
    const filtrirani = apartmani.filter(a =>
        a.naziv.toLowerCase().includes(tekst) || a.grad.toLowerCase().includes(tekst)
    )

    function gumbi(apartman) {
        return (
            <>
                <Button variant="outline-primary" size="sm"
                    onClick={() => navigate(`/apartmani/${apartman.sifra}`)}>
                    <FaEdit /> Promjena
                </Button>
                <Button variant="outline-danger" size="sm" className="ms-2"
                    onClick={() => obrisi(apartman)}>
                    <FaTrash /> Brisanje
                </Button>
            </>
        )
    }

    return (
        <>
            <div className="naslov-stranice">
                <h2>Apartmani <Badge pill bg="secondary">{filtrirani.length}</Badge></h2>
                <Link to={RouteNames.APARTMANI_DODAJ} className="btn btn-primary">
                    <FaPlus className="me-1" /> Novi apartman
                </Link>
            </div>

            <Row className="mb-3 g-2">
                <Col md={8}>
                    <InputGroup>
                        <InputGroup.Text><FaSearch /></InputGroup.Text>
                        <Form.Control placeholder="Pretraga po nazivu ili gradu..."
                            value={pretraga} onChange={(e) => setPretraga(e.target.value)} />
                    </InputGroup>
                </Col>
                <Col md={4} className="text-md-end">
                    <ButtonGroup>
                        <Button variant={prikaz === 'kartice' ? 'primary' : 'outline-primary'}
                            onClick={() => setPrikaz('kartice')}>
                            <FaTh /> Kartice
                        </Button>
                        <Button variant={prikaz === 'tablica' ? 'primary' : 'outline-primary'}
                            onClick={() => setPrikaz('tablica')}>
                            <FaList /> Tablica
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>

            {filtrirani.length === 0 && <p className="text-muted">Nema apartmana za zadanu pretragu.</p>}

            {prikaz === 'kartice' ? (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {filtrirani.map((apartman) => (
                        <Col key={apartman.sifra}>
                            <Card className={`apartman-kartica ${apartman.aktivan ? '' : 'neaktivan'}`}>
                                <Card.Img variant="top" src={apartman.slikaUrl} alt={apartman.naziv} />
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start mb-1">
                                        <Card.Title className="mb-0">{apartman.naziv}</Card.Title>
                                        <Badge bg={apartman.aktivan ? 'success' : 'secondary'}>
                                            {apartman.aktivan ? 'Aktivan' : 'Neaktivan'}
                                        </Badge>
                                    </div>
                                    <Card.Subtitle className="text-muted mb-2">
                                        {apartman.grad}, {apartman.adresa}
                                    </Card.Subtitle>
                                    <Card.Text className="small flex-grow-1">{apartman.opis}</Card.Text>
                                    <div className="d-flex justify-content-between mb-3">
                                        <span><FaUserFriends className="me-1" />do {apartman.kapacitet} osoba</span>
                                        <strong><Cijena iznos={apartman.cijenaPoNoci} /> / noć</strong>
                                    </div>
                                    <div>{gumbi(apartman)}</div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Table hover bordered responsive className="bg-white">
                    <thead>
                        <tr>
                            <th>Naziv</th>
                            <th>Grad i adresa</th>
                            <th className="text-end">Cijena po noći</th>
                            <th className="text-center">Kapacitet</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Akcija</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrirani.map((apartman) => (
                            <tr key={apartman.sifra}>
                                <td className="fw-semibold">{apartman.naziv}</td>
                                <td>{apartman.grad}, {apartman.adresa}</td>
                                <td className="text-end"><Cijena iznos={apartman.cijenaPoNoci} /></td>
                                <td className="text-center">{apartman.kapacitet}</td>
                                <td className="text-center">
                                    <Badge bg={apartman.aktivan ? 'success' : 'secondary'}>
                                        {apartman.aktivan ? 'Aktivan' : 'Neaktivan'}
                                    </Badge>
                                </td>
                                <td className="text-center text-nowrap">{gumbi(apartman)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}
