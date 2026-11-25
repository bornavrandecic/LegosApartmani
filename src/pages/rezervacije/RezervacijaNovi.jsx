import { useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import RezervacijaForma from "./RezervacijaForma"

export default function RezervacijaNovi() {
    const navigate = useNavigate()

    async function dodaj(rezervacija) {
        await RezervacijaService.dodaj(rezervacija)
        navigate(RouteNames.REZERVACIJE)
    }

    return (
        <>
            <div className="naslov-stranice">
                <h2>Nova rezervacija</h2>
            </div>
            <RezervacijaForma onSpremi={dodaj} tekstGumba="Spremi rezervaciju" />
        </>
    )
}
