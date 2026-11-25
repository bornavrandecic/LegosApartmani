import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { RouteNames } from "../../constants"
import GostService from "../../services/gosti/GostService"
import GostForma from "./GostForma"

export default function GostPromjena() {
    const navigate = useNavigate()
    const params = useParams()
    const [gost, setGost] = useState(null)

    useEffect(() => {
        GostService.getBySifra(params.sifra).then((odgovor) => setGost(odgovor.data))
    }, [params.sifra])

    async function promijeni(podaci) {
        await GostService.promijeni(params.sifra, podaci)
        navigate(RouteNames.GOSTI)
    }

    if (!gost) {
        return <p>Učitavanje...</p>
    }

    return (
        <>
            <div className="naslov-stranice">
                <h2>Promjena gosta</h2>
            </div>
            <GostForma gost={gost} onSpremi={promijeni} tekstGumba="Spremi promjene" />
        </>
    )
}
