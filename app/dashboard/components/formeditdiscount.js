"use client"

import { DiscountContext } from "@/app/context/DiscountContext";
import { useState, useContext } from "react";

const FormEditDiscount = ({ index }) => {
    console.log(index, 'index')
    const { discount, setDiscount, removeDiscountAtIndex, updateDiscountAtIndex } = useContext(DiscountContext);
    const [ constraints, setConstraintDiscounts ] = useState(discount[index].constraint);
    const [ descriptions, setDiscountDescriptions ] = useState(discount[index].description === undefined ? '' : discount[index].description);
    const [ discounts, setDiscounts ] = useState(discount[index].discount === undefined ? 0 : discount[index].discount);

    const handleConstraint = (val) => {
      setConstraintDiscounts(val);
    }
    const handleDescription = (val) => {
      setDiscountDescriptions(val);
    }
    const handleDiscount = (val) => {
      setDiscounts(val);
    }

    const deleteHandler = (index) => {
      removeDiscountAtIndex(index);
    }
    const addHandler = (index) => {
      updateDiscountAtIndex(index, { constraint: constraints, discount: discounts, description: descriptions })
    }

    return (
      <>
        <div>
          <label className="block mb-2 text-gray-800" htmlFor="productName">Minimum Pembelian</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e)=>handleConstraint(e.target.value)}
            value={constraints}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-800" htmlFor="productName">Diskon</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e)=>handleDiscount(e.target.value)}
            value={discounts}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-800" htmlFor="productName">Deskripsi</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e)=>handleDescription(e.target.value)}
            value={descriptions}
            required
          />
        </div>
        <div className="my-3">
          <span className="px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600 cursor-pointer" onClick={() => deleteHandler(index)}>Delete</span>
          <span className="px-4 py-2 bg-green-500 text-white rounded-sm hover:bg-green-600 cursor-pointer ml-2" onClick={() => addHandler(index)}>Save</span>
        </div>
        <hr className='w-full h-1 bg-gray-400 my-3' />
      </>
    );
};

export default FormEditDiscount;