"use client"

import { useUserToken } from "@/app/context/UserTokenContext";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from "react";
import Endpoint from "@/app/constant/constant";

const Page = () => {
    const [ orders, setOrders ] = useState([]);
    const { token, setToken } = useUserToken();
    const [isPending, setPending] = useState(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const isMutating = isPending || isTransitionStarted;
    const router = useRouter();

    useEffect(() => {
        axios.get(Endpoint.BASE_URL + Endpoint.ORDER, { 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response);
                setOrders(response.data.orders);
            })
            .catch((error) => {
                console.error('Gagal melakukan permintaan:', error);
            });
    }, [isPending])

    const handleEdit = (id) => {
        router.replace(`/dashboard/order/${id}`);
    }


    return(
        <>           
            <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Customer</th>
                        <th scope="col" className="px-6 py-3">Order Status</th>
                        <th scope="col" className="px-6 py-3">Total</th>
                        <th scope="col" className="px-6 py-3">Payment Status</th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {isMutating ? <tr><td>{'Get Data'}</td></tr> : 
                    orders && orders.map((a) => (
                        <tr key={a.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{a.id}</td>
                            <td>{a.user.name}</td>
                            <td>{a.status}</td>
                            <td>{a.total}</td>
                            <td>{a.status_pembayaran}</td>
                            <td>
                                <button onClick={() => handleEdit(a.id)} href={null} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View or Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Page