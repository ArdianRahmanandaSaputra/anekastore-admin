'use client'

import { useState, useEffect, useTransition } from "react";
import axios from 'axios';
import Endpoint from '@/app/constant/constant';
import { useUserToken } from '@/app/context/UserTokenContext';
import generateOrderReport from "../components/generateOrderReport";

const Page = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isGenerating, setIsGenerating] = useState(false); // Menambahkan state untuk menentukan apakah sedang melakukan proses generate
    const { token, setToken } = useUserToken();

    useEffect(() => {
        // Memeriksa apakah kedua tanggal sudah terisi
        if (startDate && endDate) {
            setIsGenerating(false); // Jika sudah terisi, matikan isGenerating
        } else {
            setIsGenerating(true); // Jika belum terisi, aktifkan isGenerating
        }
    }, [startDate, endDate]);

    const handleGenerateReport = (e) => {
        e.preventDefault();
        // Lakukan logika untuk generate laporan hanya jika kedua tanggal sudah terisi
        if (startDate && endDate) {
            console.log('Menghasilkan laporan dari', startDate, 'hingga', endDate);
            const formData = new FormData();

            formData.append('start', startDate);
            formData.append('end', endDate);

            axios.post(Endpoint.BASE_URL + Endpoint.REPORT, formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            .then((response) => {
                console.log('Response dari server:', response.data);
                generateOrderReport(response.data.orders, response.data.total_orders, response.data.total_sales);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    };

    return(
        <>
            <div className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md flex flex-col space-y-7">
                    <h2 className="text-xl font-semibold mb-4">Generate Laporan Penjualan</h2>
                    <div className="mb-4">
                        <label htmlFor="start-date" className="block text-gray-700 text-start">Tanggal Awal</label>
                        <input 
                            type="date" 
                            id="start-date" 
                            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="end-date" className="block text-gray-700 text-start">Tanggal Akhir</label>
                        <input 
                            type="date" 
                            id="end-date" 
                            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <button 
                        className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleGenerateReport}
                        disabled={isGenerating} // Menggunakan isGenerating untuk menentukan apakah tombol harus dinonaktifkan
                    >
                        Generate
                    </button>
                </div>
            </div>
        </>
    );
}

export default Page;
