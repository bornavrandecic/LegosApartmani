import { useEffect, useState } from "react"
import { Badge, Button, ButtonGroup, Col, Form, Row, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { RouteNames } from "../../constants"
import FormatDatuma from "../../components/FormatDatuma"
import Cijena from "../../components/Cijena"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import ApartmanService from "../../services/apartmani/ApartmanService"
import GostService from "../../services/gosti/GostService"
import { brojNoci, statusRezervacije } from "../../utils/datumi"

const FILTERI = [
    { kljuc: 'sve', tekst: 'Sve' },
    { kljuc: 'nadolazeca', tekst: 'Nadolazeće' },
    { kljuc: 'utijeku', tekst: 'U tijeku' },
    { kljuc: 'zavrsena', tekst: 'Završene' },
]

export default function RezervacijaPregled() {
    const [rezervacije, setRezervacije] = useState([])
    const [apartmani, setApartmani] = useState([])
    const [gosti, setGosti] = useState([])
    const [filterStatus, setFilterStatus] = useState('sve')
    const [filterApartman, setFilterApartman] = useState('')
    const navigate = useNavigate()

    function ucitaj() {
        RezervacijaService.get().then(o => setRezervacije(o.data))
        ApartmanService.get().then(o => setApartmani(o.data))
        GostService.get().then(o => setGosti(o.data))
    }

    useEffect(() => {
        ucitaj()
    }, [])

    // rezervacija sprema samo šifre, ovdje ih pretvaramo u nazive
    function nazivApartmana(sifra) {
        return apartmani.find(a => a.sifra === sifra)?.naziv ?? '(obrisan)'
    }

    function imeGosta(sifra) {
        const g = gosti.find(g => g.sifra === sifra)
        return g ? `${g.ime} ${g.prezime}` : '(obrisan)'
    }

    async function obrisi(r) {
        if (!confirm(`Sigurno obrisati rezervaciju #${r.sifra}?`)) return
        await RezervacijaService.obrisi(r.sifra)
        ucitaj()
    }

    const prikazane = rezervacije
        .filter(r => filterStatus === 'sve' || statusRezervacije(r).kljuc === filterStatus)
        .filter(r => filterApartman === '' || r.apartman === parseInt(filterApartman))
        .sort((a, b) => a.datumDolaska.localeCompare(b.datumDolaska))

    const ukupniIznos = prikazane.reduce((zbroj, r) => zbroj + r.ukupnaCijena, 0)

    return (
        <>
            <div className="naslov-stranice">
                <h2>Rezervacije <Badge pill bg="secondary">{prikazane.length}</Badge></h2>
                <Link to={RouteNames.REZERVACIJE_DODAJ} className="btn btn-primary">
                    <FaPlus className="me-1" /> Nova rezervacija
                </Link>
            </div>

            <Row className="mb-3 g-2">
                <Col md={7}>
                    <ButtonGroup className="flex-wrap">
                        {FILTERI.map(f => (
                            <Button key={f.kljuc}
                                variant={filterStatus === f.kljuc ? 'primary' : 'outline-primary'}
                                onClick={() => setFilterStatus(f.kljuc)}>
                                {f.tekst}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Col>
                <Col md={5}>
                    <Form.Select value={filterApartman} onChange={(e) => setFilterApartman(e.target.value)}>
                        <option value="">Svi apartmani</option>
                        {apartmani.map(a => (
                            <option key={a.sifra} value={a.sifra}>{a.naziv}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            <Table hover bordered responsive className="bg-white">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Apartman</th>
                        <th>Gost</th>
                        <th>Termin</th>
                        <th className="text-center">Noći</th>
                        <th className="text-center">Osoba</th>
                        <th className="text-end">Iznos</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {prikazane.length === 0 && (
                        <tr><td colSpan={9} className="text-center text-muted">Nema rezervacija.</td></tr>
                    )}
                    {prikazane.map((r) => {
                        const status = statusRezervacije(r)
                        return (
                            <tr key={r.sifra}>
                                <td>{r.sifra}</td>
                                <td className="fw-semibold">{nazivApartmana(r.apartman)}</td>
                                <td>
                                    {imeGosta(r.gost)}
                                    {r.napomena && <div className="small text-muted">{r.napomena}</div>}
                                </td>
                                <td className="text-nowrap">
                                    <FormatDatuma datum={r.datumDolaska} /> – <FormatDatuma datum={r.datumOdlaska} />
                                </td>
                                <td className="text-center">{brojNoci(r.datumDolaska, r.datumOdlaska)}</td>
                                <td className="text-center">{r.brojOsoba}</td>
                                <td className="text-end text-nowrap"><Cijena iznos={r.ukupnaCijena} /></td>
                                <td className="text-center"><Badge bg={status.boja}>{status.tekst}</Badge></td>
                                <td className="text-center text-nowrap">
                                    <Button variant="outline-primary" size="sm"
                                        onClick={() => navigate(`/rezervacije/${r.sifra}`)}>
                                        <FaEdit />
                                    </Button>
                                    <Button variant="outline-danger" size="sm" className="ms-2"
                                        onClick={() => obrisi(r)}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={6} className="text-end fw-semibold">Ukupno prikazano:</td>
                        <td className="text-end fw-bold text-nowrap"><Cijena iznos={ukupniIznos} /></td>
                        <td colSpan={2}></td>
                    </tr>
                </tfoot>
            </Table>
        </>
    )
}
