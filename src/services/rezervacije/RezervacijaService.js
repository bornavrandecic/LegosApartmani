import { DATA_SOURCE } from "../../constants"
import RezervacijaServiceLocalStorage from "./RezervacijaServiceLocalStorage"
import RezervacijaServiceMemorija from "./RezervacijaServiceMemorija"


let Servis = null

switch(DATA_SOURCE){
    case 'memorija':
        Servis = RezervacijaServiceMemorija
        break
    case 'localStorage':
        Servis = RezervacijaServiceLocalStorage
        break
    default:
        Servis = null
}

const PrazanServis = {
    get: async () => ({data: []}),
    getBySifra: async () => ({data: {}}),
    dodaj: async () => {console.error('Servis nije implementiran')},
    promijeni: async () => {console.error('Servis nije implementiran')},
    obrisi: async () => {console.error('Servis nije implementiran')},
    nadiPreklapanje: async () => undefined
}

const AktivniServis = Servis || PrazanServis

export default{
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (rezervacija) => AktivniServis.dodaj(rezervacija),
    promijeni: (sifra,rezervacija) => AktivniServis.promijeni(sifra,rezervacija),
    obrisi: (sifra) => AktivniServis.obrisi(sifra),
    nadiPreklapanje: (apartman, datumDolaska, datumOdlaska, iskljuciSifru) =>
        AktivniServis.nadiPreklapanje(apartman, datumDolaska, datumOdlaska, iskljuciSifru)
}
