import { rezervacije } from "./RezervacijaPodaci";

// 1/4 od CRUD: Read

async function get(){
    return {data: [...rezervacije]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra){
    return {data: rezervacije.find(r => r.sifra === parseInt(sifra))}
}

// 2/4 od CRUD: Create

async function dodaj(rezervacija){
    if(rezervacije.length === 0){
        rezervacija.sifra = 1
    }else{
        rezervacija.sifra = Math.max(...rezervacije.map(r => r.sifra)) + 1
    }
    rezervacije.push(rezervacija)
}

// 3/4 od CRUD: Update

async function promijeni(sifra, rezervacija){
    const index = nadiIndex(sifra)
    rezervacije[index] = {...rezervacije[index], ...rezervacija}
}

function nadiIndex(sifra){
    return rezervacije.findIndex(r => r.sifra === parseInt(sifra))
}

// 4/4 od CRUD: Delete

async function obrisi(sifra){
    const index = nadiIndex(sifra)
    rezervacije.splice(index, 1)
}

// Vraća rezervaciju koja se preklapa s traženim terminom (ili undefined).
// Dan odlaska jednog gosta može biti dan dolaska drugog.
// iskljuciSifru služi kod promjene, da rezervacija ne smeta sama sebi.
async function nadiPreklapanje(apartman, datumDolaska, datumOdlaska, iskljuciSifru = null){
    return rezervacije.find(r =>
        r.apartman === apartman &&
        r.sifra !== iskljuciSifru &&
        datumDolaska < r.datumOdlaska &&
        datumOdlaska > r.datumDolaska
    )
}

export default{
    get,
    getBySifra,
    dodaj,
    promijeni,
    obrisi,
    nadiPreklapanje
}
