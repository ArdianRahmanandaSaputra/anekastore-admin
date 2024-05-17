"use client"

import { useUserToken } from "@/app/context/UserTokenContext";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from "react";
import Endpoint from "@/app/constant/constant";
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { decode } from 'html-entities';

const PaginateLinks = ({ links, handleClick }) => {
    return (
        <div className="w-full text-md text-center text-gray-500 dark:text-gray-400 flex space-x-3 items-center justify-center p-4">
            {links.map((l, index) => (
                <button key={index} className="cursor-pointer" onClick={() => handleClick(l.url)}>{decode(l.label)}</button>
            ))}
        </div>
    );
}

const TableItem = ({ product, isPending, setPending, isTransitionStarted, startTransition }) => {
    const router = useRouter();
    const { token } = useUserToken();

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus produk ini?");
        if (confirmDelete) {
            setPending(true);
            const postData = {
                id: id,
            };
            axios.post(Endpoint.BASE_URL + Endpoint.DELETEPRODUCT, postData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
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

    const handleEdit = (id) => {
        router.replace(`/dashboard/products/${id}`);
    }

    return (
        <>
            {product && product.map((a) => (
                <tr key={a.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{a.id}</td>
                    <td>{a.name}</td>
                    <td>{a.category_name}</td>
                    <td>
                        <img className="rounded w-28 p-3" src={`${Endpoint.PRODUCTIMAGE}${a.photo}`} />
                    </td>
                    <td>{a.price}</td>
                    <td>{a.weight}</td>
                    <td>{a.stock}</td>
                    <td>
                        <button onClick={() => handleEdit(a.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <PencilIcon className="h-5 w-5" /> {/* Ikon Edit */}
                        </button>
                        <button onClick={() => handleDelete(a.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ms-2">
                            <TrashIcon className="h-5 w-5" /> {/* Ikon Delete */}
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}

const Page = () => {
    const [product, setProduct] = useState([]);
    const [filteredProductList, setFilteredProductList] = useState([]);
    const { token } = useUserToken();
    const [isPending, setPending] = useState(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const router = useRouter();
    const [links, setLinks] = useState([]);

    useEffect(() => {
        fetchData();
    }, [isPending]);

    const fetchData = () => {
        axios.get(Endpoint.BASE_URL + Endpoint.PRODUCT, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            params: {
                search: ''
            }
        })
        .then((response) => {
            console.log(response);
            setProduct(response.data.products.data);
            setFilteredProductList(response.data.products.data);
            setLinks(response.data.products.links);
        })
        .catch((error) => {
            console.error('Gagal melakukan permintaan:', error);
        });
    };

    const handleClick = (url) => {
        if (url === null) {
            return;
        }
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            params: {
                search: ''
            }
        })
        .then((response) => {
            console.log(response);
            setProduct(response.data.products.data);
            setFilteredProductList(response.data.products.data);
            setLinks(response.data.products.links);
        })
        .catch((error) => {
            console.error('Gagal melakukan permintaan:', error);
        });
    };

    const searchProduct = (event) => {
        const searchTerm = event.target.value.toLowerCase(); 
        if (!searchTerm.trim()) { 
            fetchData(); 
        } else {
            axios.get(Endpoint.BASE_URL + Endpoint.PRODUCT, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    search: searchTerm
                }
            })
            .then((response) => {
                console.log(response);
                setProduct(response.data.products.data);
                setFilteredProductList(response.data.products.data);
                setLinks(response.data.products.links);
            })
            .catch((error) => {
                console.error('Gagal melakukan permintaan:', error);
            });
        }
    }

    return (
        <>
        {/* <div className="flex justify-between items-center mb-3">
            <div className="flex-grow mr-3">
                <input
                    type="text"
                    className="w-full border-gray-300 dark:bg-gray-800 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                    placeholder="Cari produk..."
                    onChange={searchProduct}
                />
            </div>
            <div>
                <Link href={`/dashboard/products/add`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Tambah</Link>
            </div>
        </div> */}
        <div className="flex justify-between items-center mb-3">
    <div className="flex-grow mr-3">
        <input
            type="text"
            className="w-full flex-grow border-gray-300 dark:bg-gray-800 rounded-md p-2 focus:outline-none focus:border-indigo-500"
            placeholder="Cari produk..."
            onChange={searchProduct}
        />
    </div>
    <div>
        <Link href={`/dashboard/products/add`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Tambah</Link>
    </div>
</div>

        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Nama</th>
                    <th scope="col" className="px-6 py-3">Kategori</th>
                    <th scope="col" className="px-6 py-3">Foto</th>
                    <th scope="col" className="px-6 py-3">Harga</th>
                    <th scope="col" className="px-6 py-3">Berat</th>
                    <th scope="col" className="px-6 py-3">Stok</th>
                    <th scope="col" className="px-6 py-3">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {isPending ? <tr><td>{'Get Data'}</td></tr> : 
                <TableItem
                    product={filteredProductList}
                    isPending={isPending}
                    setPending={setPending}
                    isTransitionStarted={isTransitionStarted}
                    startTransition={startTransition}
                />}
            </tbody>
        </table>
        <PaginateLinks links={links} handleClick={handleClick}/>
    </>    
    )
}

export default Page;
