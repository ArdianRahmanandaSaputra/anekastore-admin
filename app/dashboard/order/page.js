"use client";

import { useUserToken } from "@/app/context/UserTokenContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import Endpoint from "@/app/constant/constant";

const Page = () => {
  const [orders, setOrders] = useState([]);
  const { token, setToken } = useUserToken();
  const [isPending, setPending] = useState(false);
  const [isTransitionStarted, startTransition] = useTransition();
  const isMutating = isPending || isTransitionStarted;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("inProcess"); // State untuk mengontrol tab yang aktif
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan nilai kotak pencarian

  // Fungsi untuk mengubah tab yang aktif
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Fungsi untuk mengambil data baru berdasarkan activeTab
  const fetchData = () => {
    axios
      .get(Endpoint.BASE_URL + Endpoint.ORDER, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Menyortir data berdasarkan timestamp secara descending (waktu yang lebih awal terlebih dahulu)
        const sortedOrders = response.data.orders.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        setOrders(sortedOrders);
      })
      .catch((error) => {
        console.error("Gagal melakukan permintaan:", error);
      });
  };

  useEffect(() => {
    // Memanggil fetchData saat komponen pertama kali dimuat
    fetchData();
  }, []);

  // Memanggil fetchData saat activeTab berubah
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleEdit = (id) => {
    router.replace(`/dashboard/order/${id}`);
  };

  useEffect(() => {
    const pollingInterval = setInterval(fetchData, 5000); // Polling setiap 5 detik

    // Membersihkan interval polling saat komponen dibongkar
    return () => clearInterval(pollingInterval);
  }, [token]); 

  // Filter orders based on active tab and search term
  const filteredOrders = orders.filter((order) => {
    const matchesSearchTerm = 
      order.id.toString().includes(searchTerm.toLowerCase()) || 
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "inProcess") {
      return order.status === "Dalam Proses" && matchesSearchTerm;
    } else if (activeTab === "shipped") {
      return order.status === "Dikirim" && matchesSearchTerm;
    } else if (activeTab === "completed") {
      return order.status === "Selesai" && matchesSearchTerm;
    }
  });

  return (
    <>
      <div className="flex justify-center space-x-4">
        {/* Tab "Dalam Proses" */}
        <button
          className={`px-4 py-2 ${
            activeTab === "inProcess" ? "bg-green-500 text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => handleTabChange("inProcess")}
        >
          Dalam Proses
        </button>
        {/* Tab "Dikirim" */}
        <button
          className={`px-4 py-2 ${
            activeTab === "shipped" ? "bg-green-500 text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => handleTabChange("shipped")}
        >
          Dikirim
        </button>
        {/* Tab "Selesai" */}
        <button
          className={`px-4 py-2 ${
            activeTab === "completed" ? "bg-green-500 text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => handleTabChange("completed")}
        >
          Selesai
        </button>
      </div>
      <div className="mt-4">
        {/* Kotak Pencarian */}
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Cari berdasarkan ID Order atau Nama Customer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg w-1/2"
          />
        </div>
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Order Status
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {isMutating ? (
              <tr>
                <td>{"Get Data"}</td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.id}
                  </td>
                  <td>{order.user.name}</td>
                  <td>{order.status}</td>
                  <td>{order.total}</td>
                  <td>{order.status_pembayaran}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(order.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      View or Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
