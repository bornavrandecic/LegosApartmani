import { useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import GostService from "../../services/gosti/GostService"
import GostForma from "./GostForma"

export default function GostNovi() {
    const navigate = useNavigate()

    async function dodaj(gost) {
        await GostService.dodaj(gost)
        navigate(RouteNames.GOSTI)
    }

    return (
        <>
            <div className="naslov-stranice">
                <h2>Novi gost</h2>
            </div>
            <GostForma onSpremi={dodaj} tekstGumba="Spremi gosta" />
        </>
    )
}
