import { useEffect, useState } from "react"
import ApartmanService from "../../services/apartmani/ApartmanService"
import { Badge, Button, Table } from "react-bootstrap"
import { NumericFormat } from "react-number-format"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"



export default function ApartmanPregled() {
    const [apartmani, setApartmani] = useState([])

 const navigate = useNavigate()


    async function ucitajApartmane() {
        await ApartmanService.get().then((odgovor) => {
            setApartmani(odgovor.data)
        })
    }

    useEffect(() => {
        ucitajApartmane()
    }, [])
 
      async function obrisi(sifra){
        if(!confirm('Sigurno obrisati?')){
            return
        }

        await ApartmanService.obrisi(sifra)
        ucitajApartmane()
    }


    return (
        <>
         <Link to={RouteNames.APARTMANI_DODAJ} className="btn btn-primary mb-3">
                Dodavanje novog apartmana
            </Link>
            <Table hover striped bordered responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Grad i Adresa</th>
                        <th>Cijena po noći</th>
                        <th>Kapacitet</th>
                        <th>Status</th>
                        <th className="text-center">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {apartmani && apartmani.map((apartman) => (
                        <tr key={apartman.sifra}>
                            <td className="lead">
                                {apartman.naziv}
                            </td>
                            <td>
                                {apartman.grad}, {apartman.adresa}
                            </td>
                            <td className="text-end">
                                <NumericFormat
                                    value={apartman.cijenaPoNoci}
                                    displayType={'text'}
                                    decimalSeparator=","
                                    decimalScale={2}
                                    fixedDecimalScale
                                    thousandSeparator="."
                                    suffix=" €"
                                />
                            </td>
                            <td className="text-center">
                                {apartman.kapacitet} {apartman.kapacitet === 1 ? 'osoba' : 'osobe'}
                            </td>
                            
                            <td className="text-center">
                                <span className={`badge ${apartman.aktivan ? 'bg-success' : 'bg-secondary'}`}>
                                    {apartman.aktivan ? 'Aktivan' : 'Neaktivan'}
                                </span>
                            </td>
                            <td className="text-center">
                                <Button variant="success" 
                                onClick={()=>{navigate(`/apartmani/${apartman.sifra}`)}}>
                                    Promjena
                                </Button>
                                <Button variant="danger" 
                                onClick={() => obrisi(apartman.sifra)} className="ms-2">
                                    Brisanje
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            Ukupno &nbsp;
            <Badge pill bg="success">
                {apartmani && apartmani.length}
            </Badge>
            &nbsp; apartmana

            <hr />

        </>
    )
}