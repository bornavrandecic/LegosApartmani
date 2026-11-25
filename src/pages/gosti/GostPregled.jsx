import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import GostService from "../../services/gosti/GostService"

export default function GostPregled() {
    const [gosti, setGosti] = useState([])
    const navigate = useNavigate()

    async function ucitajGoste() {
        const odgovor = await GostService.get()
        setGosti(odgovor.data)
    }

    useEffect(() => {
        ucitajGoste()
    }, [])

    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati?')) return
        await GostService.obrisi(sifra)
        ucitajGoste()
    }

    return (
        <>
            <Link to={RouteNames.GOSTI_DODAJ} className="btn btn-primary mb-3">
                Dodavanje novog gosta
            </Link>
            <Table hover striped bordered responsive>
                <thead>
                    <tr>
                        <th>Ime i prezime</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th className="text-center">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {gosti.map((gost) => (
                        <tr key={gost.sifra}>
                            <td>{gost.ime} {gost.prezime}</td>
                            <td>{gost.email}</td>
                            <td>{gost.telefon}</td>
                            <td className="text-center">
                                <Button variant="success"
                                    onClick={() => navigate(`/gosti/${gost.sifra}`)}>
                                    Promjena
                                </Button>
                                <Button variant="danger" className="ms-2"
                                    onClick={() => obrisi(gost.sifra)}>
                                    Brisanje
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
