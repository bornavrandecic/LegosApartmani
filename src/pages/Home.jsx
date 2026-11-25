import { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaBed, FaCalendarAlt, FaEuroSign, FaPlus, FaUsers } from 'react-icons/fa'
import slika from '../assets/LegosApartmani.svg'
import { IME_APLIKACIJE, RouteNames } from '../constants'
import ApartmanService from '../services/apartmani/ApartmanService'
import GostService from '../services/gosti/GostService'
import RezervacijaService from '../services/rezervacije/RezervacijaService'
import { statusRezervacije } from '../utils/datumi'
import FormatDatuma from '../components/FormatDatuma'
import Cijena from '../components/Cijena'

export default function Home() {
    const [apartmani, setApartmani] = useState([])
    const [gosti, setGosti] = useState([])
    const [rezervacije, setRezervacije] = useState([])

    useEffect(() => {
        ApartmanService.get().then(o => setApartmani(o.data))
        GostService.get().then(o => setGosti(o.data))
        RezervacijaService.get().then(o => setRezervacije(o.data))
    }, [])

    const aktivnih = apartmani.filter(a => a.aktivan).length
    const prihod = rezervacije.reduce((zbroj, r) => zbroj + r.ukupnaCijena, 0)
    const nadolazece = rezervacije
        .filter(r => statusRezervacije(r).kljuc !== 'zavrsena')
        .sort((a, b) => a.datumDolaska.localeCompare(b.datumDolaska))
        .slice(0, 5)

    function nazivApartmana(sifra) {
        return apartmani.find(a => a.sifra === sifra)?.naziv ?? '(obrisan)'
    }

    function imeGosta(sifra) {
        const g = gosti.find(g => g.sifra === sifra)
        return g ? `${g.ime} ${g.prezime}` : '(obrisan)'
    }

    function resetirajPodatke() {
        if (!confirm('Vratiti početne (demo) podatke? Sve promjene će se izgubiti.')) return
        localStorage.removeItem('apartmani')
        localStorage.removeItem('gosti')
        localStorage.removeItem('rezervacije')
        window.location.reload()
    }

    return (
        <>
            <div className='hero'>
                <Row className='align-items-center g-4'>
                    <Col md={8}>
                        <h1 className='fw-bold'>Dobrodošli u {IME_APLIKACIJE}</h1>
                        <p className='lead mb-4'>
                            Jednostavno upravljanje apartmanima, gostima i rezervacijama na jednom mjestu.
                        </p>
                        <Link to={RouteNames.REZERVACIJE_DODAJ} className='btn btn-light btn-lg'>
                            <FaPlus className='me-2' />Nova rezervacija
                        </Link>
                    </Col>
                    <Col md={4} className='text-center'>
                        <img src={slika} alt={IME_APLIKACIJE} className='img-fluid' />
                    </Col>
                </Row>
            </div>

            <Row xs={1} sm={2} lg={4} className='g-3 mb-4'>
                <Col>
                    <Card className='stat-kartica'>
                        <Card.Body className='d-flex align-items-center gap-3'>
                            <FaBed className='ikona' />
                            <div>
                                <div className='vrijednost'>{aktivnih} / {apartmani.length}</div>
                                <div className='text-muted'>Aktivnih apartmana</div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='stat-kartica'>
                        <Card.Body className='d-flex align-items-center gap-3'>
                            <FaUsers className='ikona' />
                            <div>
                                <div className='vrijednost'>{gosti.length}</div>
                                <div className='text-muted'>Gostiju</div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='stat-kartica'>
                        <Card.Body className='d-flex align-items-center gap-3'>
                            <FaCalendarAlt className='ikona' />
                            <div>
                                <div className='vrijednost'>{rezervacije.length}</div>
                                <div className='text-muted'>Rezervacija</div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='stat-kartica'>
                        <Card.Body className='d-flex align-items-center gap-3'>
                            <FaEuroSign className='ikona' />
                            <div>
                                <div className='vrijednost'><Cijena iznos={prihod} /></div>
                                <div className='text-muted'>Ukupni prihod</div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className='stat-kartica'>
                <Card.Header className='bg-white fw-semibold d-flex justify-content-between align-items-center'>
                    Trenutne i nadolazeće rezervacije
                    <Link to={RouteNames.REZERVACIJE} className='btn btn-sm btn-outline-primary'>
                        Sve rezervacije
                    </Link>
                </Card.Header>
                <ListGroup variant='flush'>
                    {nadolazece.length === 0 && (
                        <ListGroup.Item className='text-muted'>Nema nadolazećih rezervacija.</ListGroup.Item>
                    )}
                    {nadolazece.map(r => {
                        const status = statusRezervacije(r)
                        return (
                            <ListGroup.Item key={r.sifra} className='d-flex flex-wrap justify-content-between gap-2'>
                                <div>
                                    <strong>{nazivApartmana(r.apartman)}</strong>
                                    <span className='text-muted'> · {imeGosta(r.gost)}</span>
                                </div>
                                <div>
                                    <FormatDatuma datum={r.datumDolaska} /> – <FormatDatuma datum={r.datumOdlaska} />
                                    <Badge bg={status.boja} className='ms-2'>{status.tekst}</Badge>
                                </div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Card>

            <div className='text-end mt-3'>
                <Button variant='link' size='sm' className='text-muted' onClick={resetirajPodatke}>
                    Vrati demo podatke
                </Button>
            </div>
        </>
    )
}
