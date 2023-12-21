"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Endpoint from '@/app/constant/constant';
import { useRouter } from 'next/navigation';
import { useUserToken } from '@/app/context/UserTokenContext';

const FormEditOrder = ({id}) => {
  const [order, setOrder] = useState('');
  const [status, setStatus] = useState('');
  const [resi, setResi] = useState('');
  const { token, setToken } = useUserToken();
  const router = useRouter();

    useEffect(() => {
        console.log(id)
        axios.get(Endpoint.BASE_URL + Endpoint.VIEWORDER + '/' + id, { 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('Response dari server:', response.data);
                setOrder(response.data.order);
            })
            .catch((error) => {
                console.error('Gagal melakukan permintaan:', error);
        });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('id', id);
        formData.append('status', status);
        formData.append('resi', resi);

        axios.post(Endpoint.BASE_URL + Endpoint.UPDATEORDERSTATUS, formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((response) => {
            // Tangani respons dari server di sini
            console.log('Response dari server:', response.data);
            router.replace('/dashboard/order');
        })
        .catch((error) => {
            // Tangani error jika request gagal
            console.error('Error:', error);
        });
    };

  return (
    <form onSubmit={handleSubmit} className="max-w w-full">
        <div className="mb-4">
            <label className="block mb-2 text-gray-800" htmlFor="productName">
            List Pesanan
            </label>
            <div className="w-full px-4 py-2 border rounded-lg">
                {
                    order && order.product.map((e) => (
                        <p className="w-full px-4 py-2 border rounded-lg" key={e.item.id + e.item.price + e.amount}>{`Item : ${e.item.name} - Harga : ${e.item.price} - Jumlah Pesan : ${e.amount}`}</p>
                    ))
                }    
            </div>
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-gray-800" htmlFor="productName">
            Nama Customer
            </label>
            <p className="w-full px-4 py-2 border rounded-lg">{order && order.user.name}</p>
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-gray-800" htmlFor="productName">
            Pengiriman
            </label>
            <p className="w-full px-4 py-2 border rounded-lg">{order.pengiriman && `${order.pengiriman.courier} - ${order.pengiriman.service} - ${order.pengiriman.price}`}</p>
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-gray-800" htmlFor="productName">
            Alamat Pengiriman
            </label>
            <p className="w-full px-4 py-2 border rounded-lg">{order.user_detail && `A.N ${order.user.name} - ${order.user_detail.phone} - ${order.user_detail.province} - ${order.user_detail.city} - ${order.user_detail.postal_code} - ${order.user_detail.detail_address}`}</p>
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-gray-800">Status</label>
            <select
            className="w-full px-4 py-2 border rounded-lg"
            value={order && order.status}
            onChange={(e) => setStatus(e.target.value)}
            >
            <option value="" disabled defaultValue={false}>Status</option>
            <option value="Dalam Proses" defaultValue={order && order.status === "Dalam Proses" ? true : false}>Dalam Proses</option>
            <option value="Dikirim" defaultValue={order && order.status === "Dikirim" ? true : false}>Dikirm</option>
            <option value="Selesai" defaultValue={order && order.status === "Selesai" ? true : false}>Selesai</option>
            </select>
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-gray-800" htmlFor="productName">
            Resi Pengiriman
            </label>
            <input
            type="text"
            id="productName"
            className="w-full px-4 py-2 border rounded-lg"
            value={order && order.pengiriman.resi}
            onChange={(e) => setResi(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-gray-800" htmlFor="productName">
            Total
            </label>
            <p className="w-full px-4 py-2 border rounded-lg">{order && order.total}</p>
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-gray-800" htmlFor="productName">
            Status Pembayaran
            </label>
            <p className="w-full px-4 py-2 border rounded-lg">{order && order.status_pembayaran}</p>
        </div>
        <div className="text-center">
            <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
            Submit
            </button>
        </div>
    </form>
  );
};

export default FormEditOrder;
