"use client"

import FormEditCategory from "../../components/formeditcategory"
import { useParams } from 'next/navigation';

const Page = () => {
    const params = useParams()
    console.log(params.id);
    return(
        <>
            <FormEditCategory id={params.id}/>
        </>
    )
}

export default Page