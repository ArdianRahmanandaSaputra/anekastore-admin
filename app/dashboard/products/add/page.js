"use client"
import DiscountContextProvider from "@/app/context/DiscountContext"
import FormProduct from "../../components/formproduct"

const Page = () => {
    return(
        <>
            <DiscountContextProvider>
                <FormProduct />
            </DiscountContextProvider>
        </>
    )
}

export default Page