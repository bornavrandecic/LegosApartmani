import { DATA_SOURCE } from "../../constants"
import ApartmanServiceLocalStorage from "./ApartmanServiceLocalStorage"
import ApartmanServiceMemorija from "./ApartmanServiceMemorija"


let Servis = null

switch(DATA_SOURCE){
    case 'memorija':
        Servis = ApartmanServiceMemorija
        break
    case 'localStorage':
        Servis = ApartmanServiceLocalStorage
        break
    default:
        Servis = null
}

const PrazanServis = {
    get: async () => ({data: []}),
    getBySifra: async (sifra) => ({data: {}}),
    dodaj: async (apartman) => {console.error('Servis nije implementiran')},
    promijeni: async (sifra, apartman) => {console.error('Servis nije implementiran')},
    obrisi: async (sifra) => {console.error('Servis nije implementiran')}
}

const AktivniServis = Servis || PrazanServis

export default{
 get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (apartman) => AktivniServis.dodaj(apartman),
    promijeni: (sifra,apartman) => AktivniServis.promijeni(sifra,apartman),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
}