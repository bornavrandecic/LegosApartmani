import { gosti as pocetniGosti } from "./GostPodaci"

const STORAGE_KEY = 'gosti'

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY)
    if (podaci === null) {
        spremiUStorage(pocetniGosti)
        return [...pocetniGosti]
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
    return { data: dohvatiSveIzStorage().find(g => g.sifra === parseInt(sifra)) }
}

async function dodaj(gost) {
    const gosti = dohvatiSveIzStorage()
    gost.sifra = gosti.length === 0 ? 1 : Math.max(...gosti.map(g => g.sifra)) + 1
    gosti.push(gost)
    spremiUStorage(gosti)
}

async function promijeni(sifra, gost) {
    const gosti = dohvatiSveIzStorage()
    const index = gosti.findIndex(g => g.sifra === parseInt(sifra))
    gosti[index] = { ...gosti[index], ...gost }
    spremiUStorage(gosti)
}

async function obrisi(sifra) {
    spremiUStorage(dohvatiSveIzStorage().filter(g => g.sifra !== parseInt(sifra)))
}

export default { get, getBySifra, dodaj, promijeni, obrisi }
