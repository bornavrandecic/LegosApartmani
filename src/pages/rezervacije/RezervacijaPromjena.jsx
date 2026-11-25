import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../constants"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import RezervacijaForma from "./RezervacijaForma"

export default function RezervacijaPromjena() {
    const navigate = useNavigate()
    const params = useParams()
    const [rezervacija, setRezervacija] = useState(null)

    useEffect(() => {
        RezervacijaService.getBySifra(params.sifra).then(o => setRezervacija(o.data))
    }, [params.sifra])

    async function promijeni(podaci) {
        await RezervacijaService.promijeni(params.sifra, podaci)
        navigate(RouteNames.REZERVACIJE)
    }

    if (!rezervacija) {
        return <p>Učitavanje...</p>
    }

    return (
        <>
            <div className="naslov-stranice">
                <h2>Promjena rezervacije #{rezervacija.sifra}</h2>
            </div>
            <RezervacijaForma rezervacija={rezervacija} onSpremi={promijeni} tekstGumba="Spremi promjene" />
        </>
    )
}
