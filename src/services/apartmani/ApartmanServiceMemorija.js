import { apartmani } from "./ApartmanPodaci";

// 1/4 od CRUD: Read

async function get(){
    return {data: [...apartmani]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra){
    return {data: apartmani.find(s => s.sifra === parseInt(sifra))}
}

// 2/4 od CRUD: Create

async function dodaj(apartman){
    if(apartmani.length === 0){
        apartman.sifra = 1
    }else{
        apartman.sifra = apartmani[apartmani.length - 1].sifra + 1
    }
    apartmani.push(apartman)
}

// 3/4 od CRUD: Update

async function promijeni(sifra, apartman){
    const index = nadiIndex(sifra)
    apartmani[index] = {...apartmani[index], ...apartman}
}

function nadiIndex(sifra){
    return apartmani.findIndex(s => s.sifra === parseInt(sifra))
} 

// 4/4 od CRUD: Delete
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