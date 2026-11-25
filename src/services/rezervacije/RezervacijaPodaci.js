import { datumZaDana } from "../../utils/datumi"

// datumi su relativni u odnosu na danas, da uvijek postoje
// završene, trenutne i nadolazeće rezervacije
export const rezervacije = [
    { sifra: 1, apartman: 10, gost: 1, datumDolaska: datumZaDana(-12), datumOdlaska: datumZaDana(-7), brojOsoba: 3, ukupnaCijena: 5 * 120, napomena: '' },
    { sifra: 2, apartman: 12, gost: 2, datumDolaska: datumZaDana(-2), datumOdlaska: datumZaDana(5), brojOsoba: 6, ukupnaCijena: 7 * 250, napomena: 'Dolazak kasno navečer' },
    { sifra: 3, apartman: 11, gost: 3, datumDolaska: datumZaDana(3), datumOdlaska: datumZaDana(6), brojOsoba: 2, ukupnaCijena: 3 * 75, napomena: '' },
    { sifra: 4, apartman: 13, gost: 4, datumDolaska: datumZaDana(14), datumOdlaska: datumZaDana(21), brojOsoba: 5, ukupnaCijena: 7 * 180, napomena: 'Treba dječji krevetić' },
    { sifra: 5, apartman: 15, gost: 5, datumDolaska: datumZaDana(30), datumOdlaska: datumZaDana(34), brojOsoba: 2, ukupnaCijena: 4 * 110, napomena: '' },
]
