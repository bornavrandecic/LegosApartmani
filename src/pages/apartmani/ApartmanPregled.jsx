import { useEffect, useState } from "react"
import ApartmanService from "../../services/apartmani/ApartmanService"

export default function ApartmanPregled(){
        const [apartmani, setApartmani] = useState([])

    useEffect(()=>{
        console.log('Došao na pregled apartmana')
        ucitajApartmane()
    },[])

    async function ucitajApartmane(){
        await ApartmanService.get().then((odgovor)=>{
           setApartmani(odgovor.data)
        })
    }



    return(
        <>
            Ovdje dođe pregled apartmana
                     <hr />
            <pre>
                {JSON.stringify(apartmani, null, 2)}
            </pre> 
        </>
    )
}