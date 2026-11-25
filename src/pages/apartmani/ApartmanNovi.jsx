import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import ApartmanService from "../../services/apartmani/ApartmanService";
import ApartmanForma from "./ApartmanForma";

export default function ApartmanNovi() {
    const navigate = useNavigate()

    async function dodaj(apartman) {
        await ApartmanService.dodaj(apartman)
        navigate(RouteNames.APARTMANI)
    }

    return (
        <>
            <div className="naslov-stranice">
                <h2>Novi apartman</h2>
            </div>
            <ApartmanForma onSpremi={dodaj} tekstGumba="Spremi apartman" />
        </>
    )
}
