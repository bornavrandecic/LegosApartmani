import { apartmani as pocetniApartmani } from "./ApartmanPodaci"

const STORAGE_KEY='apartmani'

function dohvatiSveIzStorage(){
    const podaci = localStorage.getItem(STORAGE_KEY)
    if(podaci === null){
        // prvo pokretanje: upiši primjere da aplikacija nije prazna
        spremiUStorage(pocetniApartmani)
        return [...pocetniApartmani]
    }
    return JSON.parse(podaci)
}

function spremiUStorage(podaci){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci))
}

async function get(){
    const apartmani = dohvatiSveIzStorage()
    return {data: [...apartmani]}
}

async function getBySifra(sifra){
    const apartmani = dohvatiSveIzStorage()
    return {data: apartmani.find(s => s.sifra === parseInt(sifra))}
}


async function dodaj(apartman){
    const apartmani = dohvatiSveIzStorage()
    if(apartmani.length === 0){
        apartman.sifra = 1
    }else{
        const maxSifra = Math.max(...apartmani.map(s => s.sifra))
        apartman.sifra = maxSifra + 1
    }
    apartmani.push(apartman)
    spremiUStorage(apartmani)
}



async function promijeni(sifra, apartman){
    const apartmani = dohvatiSveIzStorage()
    const index = apartmani.findIndex(s => s.sifra === parseInt(sifra))
    apartmani[index] = {...apartmani[index], ...apartman}
    spremiUStorage(apartmani)
}



async function obrisi(sifra){
    let apartmani = dohvatiSveIzStorage()
    apartmani = apartmani.filter(s => s.sifra !== parseInt(sifra))
    spremiUStorage(apartmani)
}



export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi
}