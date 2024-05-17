"use client"

import { useParams } from 'next/navigation';
import FormEditProduct from "../../components/formeditproduct";
import DiscountContextProvider from '@/app/context/DiscountContext';

const Page = () => {
    const params = useParams()
    console.log(params.id);
    return(
        <>
            <DiscountContextProvider>
                <FormEditProduct id={params.id}/>
            </DiscountContextProvider>
        </>
    )
}

export default Page