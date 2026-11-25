import { useEffect, useState } from "react"
import { Badge, Button, Form, InputGroup, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa"
import { RouteNames } from "../../constants"
import GostService from "../../services/gosti/GostService"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"

export default function GostPregled() {
    const [gosti, setGosti] = useState([])
    const [rezervacije, setRezervacije] = useState([])
    const [pretraga, setPretraga] = useState('')
    const navigate = useNavigate()

    function ucitaj() {
        GostService.get().then(o => setGosti(o.data))
        RezervacijaService.get().then(o => setRezervacije(o.data))
    }

    useEffect(() => {
        ucitaj()
    }, [])

    function brojRezervacija(sifraGosta) {
        return rezervacije.filter(r => r.gost === sifraGosta).length
    }

    async function obrisi(gost) {
        const broj = brojRezervacija(gost.sifra)
        if (broj > 0) {
            alert(`${gost.ime} ${gost.prezime} ima rezervacije (${broj}) i ne može se obrisati.`)
            return
        }
        if (!confirm(`Sigurno obrisati gosta ${gost.ime} ${gost.prezime}?`)) return
        await GostService.obrisi(gost.sifra)
        ucitaj()
    }

    const tekst = pretraga.toLowerCase()
    const filtrirani = gosti.filter(g =>
        `${g.ime} ${g.prezime} ${g.email}`.toLowerCase().includes(tekst)
    )

    return (
        <>
            <div className="naslov-stranice">
                <h2>Gosti <Badge pill bg="secondary">{filtrirani.length}</Badge></h2>
                <Link to={RouteNames.GOSTI_DODAJ} className="btn btn-primary">
                    <FaPlus className="me-1" /> Novi gost
                </Link>
            </div>

            <InputGroup className="mb-3">
                <InputGroup.Text><FaSearch /></InputGroup.Text>
                <Form.Control placeholder="Pretraga po imenu, prezimenu ili emailu..."
                    value={pretraga} onChange={(e) => setPretraga(e.target.value)} />
            </InputGroup>

            <Table hover bordered responsive className="bg-white">
                <thead>
                    <tr>
                        <th>Ime i prezime</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th className="text-center">Rezervacija</th>
                        <th className="text-center">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrirani.length === 0 && (
                        <tr><td colSpan={5} className="text-center text-muted">Nema gostiju.</td></tr>
                    )}
                    {filtrirani.map((gost) => (
                        <tr key={gost.sifra}>
                            <td className="fw-semibold">{gost.ime} {gost.prezime}</td>
                            <td><a href={`mailto:${gost.email}`}>{gost.email}</a></td>
                            <td>{gost.telefon}</td>
                            <td className="text-center">
                                <Badge bg="info">{brojRezervacija(gost.sifra)}</Badge>
                            </td>
                            <td className="text-center text-nowrap">
                                <Button variant="outline-primary" size="sm"
                                    onClick={() => navigate(`/gosti/${gost.sifra}`)}>
                                    <FaEdit /> Promjena
                                </Button>
                                <Button variant="outline-danger" size="sm" className="ms-2"
                                    onClick={() => obrisi(gost)}>
                                    <FaTrash /> Brisanje
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
