"use client"

import { useUserToken } from "@/app/context/UserTokenContext";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from "react";
import Endpoint from "@/app/constant/constant";

const Page = () => {
    const [ customers, setCustomers ] = useState([]);
    const [ payments, setPayments ] = useState([]);
    const { token, setToken } = useUserToken();
    const [isPending, setPending] = useState(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const isMutating = isPending || isTransitionStarted;
    const router = useRouter();

    useEffect(() => {
        axios.get(Endpoint.BASE_URL + Endpoint.PAYMENT, { 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response.data);
                setCustomers(response.data.customers);
                const newPayments = response.data.customers.flatMap((customer) => {
                    return customer.payment.map((payment) => ({
                        id: payment.id,
                        name: customer.name,
                        status: payment.status_pembayaran,
                        total: payment.total,
                    }));
                });
        
                console.log(newPayments);
                setPayments(newPayments);
                // setPayments(response.data.customers.payment);
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
                        <th scope="col" className="px-6 py-3">Customer Name</th>
                        <th scope="col" className="px-6 py-3">Payment Status</th>
                        <th scope="col" className="px-6 py-3">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {isMutating ? <tr><td>{'Get Data'}</td></tr> : 
                    payments && payments.map((a) => (
                        <tr key={a.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{a.id}</td>
                            <td>{a.name}</td>
                            <td>{a.status}</td>
                            <td>{a.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Page