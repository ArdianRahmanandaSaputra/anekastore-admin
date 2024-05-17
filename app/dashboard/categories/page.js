"use client"

import { useUserToken } from "@/app/context/UserTokenContext";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from "react";
import Endpoint from "@/app/constant/constant";
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';

const Page = () => {
    const [ category, setCategory ] = useState([]);
    const { token, setToken } = useUserToken();
    const [isPending, setPending] = useState(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const isMutating = isPending || isTransitionStarted;
    const router = useRouter();

    useEffect(() => {
        axios.get(Endpoint.BASE_URL + Endpoint.CATEGORY, { 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response);
                setCategory(response.data.category);
            })
            .catch((error) => {
                console.error('Gagal melakukan permintaan:', error);
            });
    }, [isPending])

    const handleEdit = (id) => {
        router.replace(`/dashboard/categories/${id}`);
    }

    const handleDelete = (id) => {  
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus kategori ini? Menghapus kategori akan menghapus produk yang terkait dengannya. Pastikan Anda telah mempertimbangkan tindakan ini dengan baik.");
        if (confirmDelete) {
            setPending(true);  
            const postData = {
                id: id,
            };
            axios.post(Endpoint.BASE_URL + Endpoint.DELETECATEGORY, postData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                console.log('Response dari server:', response.data);
                startTransition(router.refresh);
                setPending(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
      };

    return(
        <>
            <div className="grid justify-items-stretch mb-3">
                <Link href={`/dashboard/categories/add`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded justify-self-end">Tambah</Link>
            </div>            
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Nama</th>
                        <th scope="col" className="px-6 py-3">Foto</th>
                        <th scope="col" className="px-6 py-3">Deskripsi</th>
                        <th scope="col" className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {isMutating ? <tr><td>{'Get Data'}</td></tr> : 
                    category && category.map((a) => (
                        <tr key={a.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{a.id}</td>
                            <td>{a.name}</td>
                            <td>
                                <img className="rounded w-28" src={`${Endpoint.CATEGORYIMAGE}${a.photo}`} />    
                            </td>
                            <td>{a.description}</td>
                            <td>
                                <button onClick={() => handleEdit(a.id)} href={`/dashboard/categories`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <PencilIcon className="w-5 h-6" />
                                </button>
                                <button onClick={() => handleDelete(a.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ms-2">
                                    <TrashIcon className="w-5 h-6" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Page