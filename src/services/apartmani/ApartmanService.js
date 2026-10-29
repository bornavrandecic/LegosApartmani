import { apartmani } from "../apartmani/ApartmanPodaci";

async function get(){
    return {data: [...apartmani]} 
}

export default{
    get
}