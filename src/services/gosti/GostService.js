import { DATA_SOURCE } from "../../constants"
import GostServiceLocalStorage from "./GostServiceLocalStorage"
import GostServiceMemorija from "./GostServiceMemorija"


let Servis = null

switch(DATA_SOURCE){
    case 'memorija':
        Servis = GostServiceMemorija
        break
    case 'localStorage':
        Servis = GostServiceLocalStorage
        break
    default:
        Servis = null
}

const PrazanServis = {
    get: async () => ({data: []}),
    getBySifra: async () => ({data: {}}),
    dodaj: async () => {console.error('Servis nije implementiran')},
    promijeni: async () => {console.error('Servis nije implementiran')},
    obrisi: async () => {console.error('Servis nije implementiran')}
}

const AktivniServis = Servis || PrazanServis

export default{
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (gost) => AktivniServis.dodaj(gost),
    promijeni: (sifra,gost) => AktivniServis.promijeni(sifra,gost),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
}
