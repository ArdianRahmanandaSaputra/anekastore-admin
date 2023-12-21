"use client"

import { useParams } from 'next/navigation';
import FormEditProduct from "../../components/formeditproduct";

const Page = () => {
    const params = useParams()
    console.log(params.id);
    return(
        <>
            <FormEditProduct id={params.id}/>
        </>
    )
}

export default Page