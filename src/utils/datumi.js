// Pomoćne funkcije za rad s datumima rezervacija.
// Datumi se spremaju kao tekst 'YYYY-MM-DD' pa ih možemo uspoređivati kao stringove.

function dvijeZnamenke(broj) {
    return String(broj).padStart(2, '0')
}

// današnji datum + pomak u danima, u obliku 'YYYY-MM-DD'
export function datumZaDana(pomak = 0) {
    const d = new Date()
    d.setDate(d.getDate() + pomak)
    return `${d.getFullYear()}-${dvijeZnamenke(d.getMonth() + 1)}-${dvijeZnamenke(d.getDate())}`
}

export function danas() {
    return datumZaDana(0)
}

export function brojNoci(dolazak, odlazak) {
    if (!dolazak || !odlazak) return 0
    const razlika = new Date(odlazak) - new Date(dolazak)
    return Math.round(razlika / (1000 * 60 * 60 * 24))
}

// status se ne sprema, nego se računa iz datuma
export function statusRezervacije(rezervacija) {
    const d = danas()
    if (rezervacija.datumOdlaska <= d) {
        return { kljuc: 'zavrsena', tekst: 'Završena', boja: 'secondary' }
    }
    if (rezervacija.datumDolaska <= d) {
        return { kljuc: 'utijeku', tekst: 'U tijeku', boja: 'success' }
    }
    return { kljuc: 'nadolazeca', tekst: 'Nadolazeća', boja: 'primary' }
}
