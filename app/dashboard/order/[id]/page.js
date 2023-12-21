"use client"

import { useParams } from 'next/navigation';
import FormEditOrder from '../../components/formeditorder';

const Page = () => {
    const params = useParams()
    console.log(params.id);
    return(
        <>
            <FormEditOrder id={params.id}/>
        </>
    )
}

export default Page