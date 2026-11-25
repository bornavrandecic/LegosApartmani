import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import ApartmanService from "../../services/apartmani/ApartmanService"
import GostService from "../../services/gosti/GostService"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import { brojNoci, danas } from "../../utils/datumi"
import FormatDatuma from "../../components/FormatDatuma"
import Cijena from "../../components/Cijena"

// Zajednička forma za novu rezervaciju i promjenu postojeće.
// Polja su "kontrolirana" (useState) kako bi se cijena računala dok korisnik upisuje.
export default function RezervacijaForma({ rezervacija = {}, onSpremi, tekstGumba }) {
    const jeNova = !rezervacija.sifra

    const [apartmani, setApartmani] = useState([])
    const [gosti, setGosti] = useState([])
    const [greska, setGreska] = useState('')

    const [apartman, setApartman] = useState(rezervacija.apartman ?? '')
    const [gost, setGost] = useState(rezervacija.gost ?? '')
    const [datumDolaska, setDatumDolaska] = useState(rezervacija.datumDolaska ?? '')
    const [datumOdlaska, setDatumOdlaska] = useState(rezervacija.datumOdlaska ?? '')
    const [brojOsoba, setBrojOsoba] = useState(rezervacija.brojOsoba ?? 1)
    const [napomena, setNapomena] = useState(rezervacija.napomena ?? '')

    useEffect(() => {
        // nude se aktivni apartmani + onaj koji je već na rezervaciji (kod promjene)
        ApartmanService.get().then(o =>
            setApartmani(o.data.filter(a => a.aktivan || a.sifra === rezervacija.apartman)))
        GostService.get().then(o => setGosti(o.data))
    }, [rezervacija.apartman])

    const odabraniApartman = apartmani.find(a => a.sifra === parseInt(apartman))
    const noci = brojNoci(datumDolaska, datumOdlaska)
    const ukupno = odabraniApartman && noci > 0 ? noci * odabraniApartman.cijenaPoNoci : 0

    async function obradiSubmit(e) {
        e.preventDefault()
        setGreska('')

        if (jeNova && datumDolaska < danas()) {
            setGreska('Datum dolaska ne može biti u prošlosti.')
            return
        }
        if (noci < 1) {
            setGreska('Datum odlaska mora biti barem jedan dan nakon datuma dolaska.')
            return
        }
        if (brojOsoba > odabraniApartman.kapacitet) {
            setGreska(`Apartman "${odabraniApartman.naziv}" prima najviše ${odabraniApartman.kapacitet} osoba.`)
            return
        }

        const preklapanje = await RezervacijaService.nadiPreklapanje(
            odabraniApartman.sifra, datumDolaska, datumOdlaska, rezervacija.sifra ?? null)
        if (preklapanje) {
            setGreska(
                <>
                    Apartman je u tom terminu već zauzet (<FormatDatuma datum={preklapanje.datumDolaska} /> –{' '}
                    <FormatDatuma datum={preklapanje.datumOdlaska} />). Odaberite drugi termin ili apartman.
                </>
            )
            return
        }

        onSpremi({
            apartman: odabraniApartman.sifra,
            gost: parseInt(gost),
            datumDolaska,
            datumOdlaska,
            brojOsoba: parseInt(brojOsoba),
            ukupnaCijena: ukupno,
            napomena: napomena.trim()
        })
    }

    return (
        <Form onSubmit={obradiSubmit} className="forma-okvir">
            {greska && <Alert variant="danger">{greska}</Alert>}

            {gosti.length === 0 && (
                <Alert variant="warning">
                    Još nema unesenih gostiju. <Link to={RouteNames.GOSTI_DODAJ}>Dodajte gosta</Link> prije rezervacije.
                </Alert>
            )}

            <Row className="g-4">
                <Col lg={8}>
                    <Form.Group controlId="apartman" className="mb-3">
                        <Form.Label>Apartman</Form.Label>
                        <Form.Select value={apartman} onChange={(e) => setApartman(e.target.value)} required>
                            <option value="">-- odaberite apartman --</option>
                            {apartmani.map(a => (
                                <option key={a.sifra} value={a.sifra}>
                                    {a.naziv} ({a.grad}) · do {a.kapacitet} osoba · {a.cijenaPoNoci} €/noć
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="gost" className="mb-3">
                        <Form.Label>Gost</Form.Label>
                        <Form.Select value={gost} onChange={(e) => setGost(e.target.value)} required>
                            <option value="">-- odaberite gosta --</option>
                            {gosti.map(g => (
                                <option key={g.sifra} value={g.sifra}>
                                    {g.ime} {g.prezime} ({g.email})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} sm={4} controlId="datumDolaska">
                            <Form.Label>Dolazak</Form.Label>
                            <Form.Control type="date" required value={datumDolaska}
                                min={jeNova ? danas() : undefined}
                                onChange={(e) => setDatumDolaska(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} sm={4} controlId="datumOdlaska">
                            <Form.Label>Odlazak</Form.Label>
                            <Form.Control type="date" required value={datumOdlaska}
                                min={datumDolaska || undefined}
                                onChange={(e) => setDatumOdlaska(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} sm={4} controlId="brojOsoba">
                            <Form.Label>Broj osoba</Form.Label>
                            <Form.Control type="number" min={1} required value={brojOsoba}
                                max={odabraniApartman?.kapacitet}
                                onChange={(e) => setBrojOsoba(e.target.value)} />
                        </Form.Group>
                    </Row>

                    <Form.Group controlId="napomena">
                        <Form.Label>Napomena</Form.Label>
                        <Form.Control as="textarea" rows={2} value={napomena}
                            placeholder="npr. kasni dolazak, kućni ljubimac..."
                            onChange={(e) => setNapomena(e.target.value)} />
                    </Form.Group>
                </Col>

                <Col lg={4}>
                    <div className="izracun">
                        <h5>Izračun</h5>
                        {odabraniApartman && odabraniApartman.slikaUrl && (
                            <img src={odabraniApartman.slikaUrl} alt={odabraniApartman.naziv}
                                className="img-fluid rounded mb-2" />
                        )}
                        <div className="d-flex justify-content-between">
                            <span>Cijena po noći</span>
                            <span>{odabraniApartman ? <Cijena iznos={odabraniApartman.cijenaPoNoci} /> : '-'}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Broj noći</span>
                            <span>{noci > 0 ? noci : '-'}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fs-5 fw-bold">
                            <span>Ukupno</span>
                            <span><Cijena iznos={ukupno} /></span>
                        </div>
                    </div>
                </Col>
            </Row>

            <hr />
            <Row>
                <Col>
                    <Link to={RouteNames.REZERVACIJE} className="btn btn-outline-secondary w-100">Odustani</Link>
                </Col>
                <Col>
                    <Button type="submit" variant="success" className="w-100">{tekstGumba}</Button>
                </Col>
            </Row>
        </Form>
    )
}
