import {useRouter} from 'next/router'

export default function Car ({car}){

const router =useRouter()
const{id}=router.query

return(<>
<h1>Hello {id}</h1>


</>) 
}


export async function getStaticProps({params}){


const req =await fetch (`localhost:3000/${params.id}.json`);
const data =await req .json();

return{
    props:{car:data},
}

}