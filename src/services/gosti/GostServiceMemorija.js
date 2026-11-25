import { gosti } from "./GostPodaci";

// 1/4 od CRUD: Read

async function get(){
    return {data: [...gosti]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra){
    return {data: gosti.find(g => g.sifra === parseInt(sifra))}
}

// 2/4 od CRUD: Create

async function dodaj(gost){
    if(gosti.length === 0){
        gost.sifra = 1
    }else{
        gost.sifra = Math.max(...gosti.map(g => g.sifra)) + 1
    }
    gosti.push(gost)
}

// 3/4 od CRUD: Update

async function promijeni(sifra, gost){
    const index = nadiIndex(sifra)
    gosti[index] = {...gosti[index], ...gost}
}

function nadiIndex(sifra){
    return gosti.findIndex(g => g.sifra === parseInt(sifra))
}

// 4/4 od CRUD: Delete

async function obrisi(sifra){
    const index = nadiIndex(sifra)
    gosti.splice(index, 1)
}

export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi
}
