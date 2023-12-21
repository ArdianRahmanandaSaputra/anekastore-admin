"use client"

import { useUserToken } from "@/app/context/UserTokenContext";
import axios from "axios";
import { useState, useEffect } from "react";
import Endpoint from "@/app/constant/constant";

const Page = () => {
    const [ page, setPage ] = useState([]);
    const { token, setToken } = useUserToken();

    useEffect(() => {
        axios.get(Endpoint.BASE_URL + Endpoint.PAGES, { 
                params: {
                    token: token,
                },
            })
            .then((response) => {
                console.log(response.data.data.page);
                setPage(response.data.data.page);
            })
            .catch((error) => {
                console.error('Gagal melakukan permintaan:', error);
            });
    }, [])

    return(
        <>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Nama</th>
                        <th scope="col" className="px-6 py-3">Page ID</th>
                        <th scope="col" className="px-6 py-3">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {page &&
                    page.map((a) => (
                        <tr key={a.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{a.id}</td>
                            <td>{a.name}</td>
                            <td>{a.page_id}</td>
                            <td>{a.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Page