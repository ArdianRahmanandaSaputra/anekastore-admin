"use client"

import { DiscountContext } from "@/app/context/DiscountContext";
import { useContext, useState } from "react";

const FormDiscount = ({ index }) => {
    const { removeDiscountAtIndex, updateDiscountAtIndex } = useContext(DiscountContext);
    const [ discounts, setDiscounts ] = useState(0);
    const [ constraints, setConstraints ] = useState(0);
    const [ descriptions, setDescriptions ] = useState('');

    const handleConstraint = (val) => {
      setConstraints(val);
    }
    const handleDescription = (val) => {
      setDescriptions(val);
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
            onChange={(e)=>{handleConstraint(e.target.value)}}
            required
            value={constraints}
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-800" htmlFor="productName">Diskon</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e)=>{handleDiscount(e.target.value)}}
            required
            value={discounts}
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-800" htmlFor="productName">Deskripsi</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e)=>{handleDescription(e.target.value)}}
            required
            value={descriptions}
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

export default FormDiscount;