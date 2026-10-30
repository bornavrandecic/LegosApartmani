import { apartmani } from "../apartmani/ApartmanPodaci";

async function get(){
    return {data: [...apartmani]} 
}

async function dodaj(apartman){
    if(apartmani.length === 0){
        apartman.sifra = 1
    }else{
        apartman.sifra = apartmani[apartmani.length - 1].sifra + 1
    }
    apartmani.push(apartman)
}


export default{
    get,
    dodaj
}