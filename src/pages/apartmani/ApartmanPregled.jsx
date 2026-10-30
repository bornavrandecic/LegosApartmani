import { useEffect, useState } from "react"
import ApartmanService from "../../services/apartmani/ApartmanService"
import { Badge, Table } from "react-bootstrap"
import { GrValidate } from "react-icons/gr"
import { FcApproval, FcDisapprove } from "react-icons/fc"
import { NumericFormat } from "react-number-format"
import FormatDatuma from "../../components/FormatDatuma"


export default function ApartmanPregled() {
    const [apartmani, setApartmani] = useState([])



    async function ucitajApartmane() {
        await ApartmanService.get().then((odgovor) => {
            setApartmani(odgovor.data)
        })
    }

    useEffect(() => {
        console.log('Došao na pregled apartmana')
        ucitajApartmane()
    }, [])


    return (
        <>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Površina</th>
                        <th>Cijena noćenja</th>
                        <th>Slobodno od:</th>
                        <th>Aktivan</th>
                    </tr>
                </thead>
                <tbody>
                    {apartmani && apartmani.map((apartman) => (
                        <tr key={apartman.sifra}>
                            <td className="lead">
                                {apartman.naziv}
                            </td>
                            <td className="text-end">
                                {apartman.povrsina}
                            </td>
                            <td className="desno">
                                <NumericFormat
                                    value={apartman.cijenaNocenja}
                                    displayType={'text'}
                                    decimalSeparator=","
                                    decimalScale={2}
                                    fixedDecimalScale
                                    thousandSeparator='.'
                                    suffix=" €"
                                    prefix="="
                                />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <FormatDatuma datum={apartman.datumPokretanja} />
                            </td>
                            <td>
                                <GrValidate
                                    size={25}
                                    color={apartman.aktivan ? 'green' : 'red'}
                                    title={apartman.aktivan ? 'Aktivan' : 'Neaktivan'}
                                />

                                {apartman.aktivan ? (
                                    <FcApproval />
                                ) : (
                                    <FcDisapprove />
                                )}


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