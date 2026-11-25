import { rezervacije as pocetneRezervacije } from "./RezervacijaPodaci"

const STORAGE_KEY = 'rezervacije'

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY)
    if (podaci === null) {
        spremiUStorage(pocetneRezervacije)
        return [...pocetneRezervacije]
    }
    return JSON.parse(podaci)
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}

async function get() {
    return { data: dohvatiSveIzStorage() }
}

async function getBySifra(sifra) {
    return { data: dohvatiSveIzStorage().find(r => r.sifra === parseInt(sifra)) }
}

async function dodaj(rezervacija) {
    const rezervacije = dohvatiSveIzStorage()
    rezervacija.sifra = rezervacije.length === 0 ? 1 : Math.max(...rezervacije.map(r => r.sifra)) + 1
    rezervacije.push(rezervacija)
    spremiUStorage(rezervacije)
}

async function promijeni(sifra, rezervacija) {
    const rezervacije = dohvatiSveIzStorage()
    const index = rezervacije.findIndex(r => r.sifra === parseInt(sifra))
    rezervacije[index] = { ...rezervacije[index], ...rezervacija }
    spremiUStorage(rezervacije)
}

async function obrisi(sifra) {
    spremiUStorage(dohvatiSveIzStorage().filter(r => r.sifra !== parseInt(sifra)))
}

// Vraća rezervaciju koja se preklapa s traženim terminom (ili undefined).
// Dan odlaska jednog gosta može biti dan dolaska drugog.
// iskljuciSifru služi kod promjene, da rezervacija ne smeta sama sebi.
async function nadiPreklapanje(apartman, datumDolaska, datumOdlaska, iskljuciSifru = null) {
    return dohvatiSveIzStorage().find(r =>
        r.apartman === apartman &&
        r.sifra !== iskljuciSifru &&
        datumDolaska < r.datumOdlaska &&
        datumOdlaska > r.datumDolaska
    )
}

export default { get, getBySifra, dodaj, promijeni, obrisi, nadiPreklapanje }
