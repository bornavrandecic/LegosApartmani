import slika from '../assets/LegosApartmani.svg'
import { IME_APLIKACIJE } from '../constants'


export default function Home(){

    return(
        <>
          <h1 className='text-3xl font-bold m-5 text-center'>
               Dobrodošli na {IME_APLIKACIJE}
            </h1>

            <div className='text-center mb-4'>
                <img src={slika} 
                className='img-fluid rounded-5' alt='Legos Apartmani' />
            </div>

        
        </>
    )
}