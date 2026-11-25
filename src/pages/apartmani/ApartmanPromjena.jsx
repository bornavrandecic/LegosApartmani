import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RouteNames } from "../../constants";
import ApartmanService from "../../services/apartmani/ApartmanService";
import ApartmanForma from "./ApartmanForma";

export default function ApartmanPromjena() {
    const navigate = useNavigate()
    const params = useParams()
    const [apartman, setApartman] = useState(null)

    useEffect(() => {
        ApartmanService.getBySifra(params.sifra).then((odgovor) => setApartman(odgovor.data))
    }, [params.sifra])

    async function promijeni(podaci) {
        await ApartmanService.promijeni(params.sifra, podaci)
        navigate(RouteNames.APARTMANI)
    }

    // formu prikazujemo tek kad stignu podaci, tako defaultValue radi ispravno
    if (!apartman) {
        return <p>Učitavanje...</p>
    }

    return (
        <>
            <div className="naslov-stranice">
                <h2>Promjena apartmana</h2>
            </div>
            <ApartmanForma apartman={apartman} onSpremi={promijeni} tekstGumba="Spremi promjene" />
        </>
    )
}
