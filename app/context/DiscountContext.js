import { createContext, useEffect, useMemo, useState } from "react";
export const DiscountContext = createContext();

const DiscountContextProvider = ({children}) => {
    const [ discount, setDiscount ] = useState([]);

    const value = useMemo(
      ()=> ({
        discount, 
        setDiscount,
        removeDiscountAtIndex: (index) => {
            const updatedDiscounts = [...discount];
            updatedDiscounts.splice(index, 1);
            setDiscount(updatedDiscounts);
        },
        updateDiscountAtIndex: (index, updatedData) => {
            const updatedDiscounts = [...discount];
            updatedDiscounts[index] = updatedData;
            setDiscount(updatedDiscounts);
            console.log(discount)
        },
        }),
      [discount]
    );

    return(
        <DiscountContext.Provider value={value}>
            { children }
        </DiscountContext.Provider>
    )
}

export default DiscountContextProvider;