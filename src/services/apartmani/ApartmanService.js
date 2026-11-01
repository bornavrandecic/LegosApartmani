import { apartmani } from "../apartmani/ApartmanPodaci";

async function get(){
    return {data: [...apartmani]} 
}

async function getBySifra(sifra){
    return {data: apartmani.find(a => a.sifra === parseInt(sifra))}
}

async function dodaj(apartman){
    if(apartmani.length === 0){
        apartman.sifra = 1
    }else{
        apartman.sifra = apartmani[apartmani.length - 1].sifra + 1
    }
    apartmani.push(apartman)
}

function nadiIndex(sifra){
    return apartmani.findIndex(a => a.sifra === parseInt(sifra))
} 

async function promijeni(sifra, apartman){
    const index = nadiIndex(sifra)
    apartmani[index] = {...apartmani[index], ...apartman}
}


async function obrisi(sifra){
    const index = nadiIndex(sifra)
    apartmani.splice(index,1)
}


export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi
}