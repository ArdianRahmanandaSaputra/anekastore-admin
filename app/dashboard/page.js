"use client"
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Endpoint from '@/app/constant/constant';
// import { useRouter } from 'next/navigation';
// import { useUserToken } from '@/app/context/UserTokenContext';

// const Dashboard = () => {
//     const [loading, setLoading] = useState(true);
//     const [productCount, setProductCount] = useState(0);
//     const [orderCount, setOrderCount] = useState(0);
//     const [totalRevenue, setTotalRevenue] = useState(0);
//     const [customerCount, setCustomerCount] = useState(0);
//     const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
//     const [isTotalRevenueDetailOpen, setIsTotalRevenueDetailOpen] = useState(false);
//     const { token, setToken } = useUserToken();
//     const router = useRouter();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 if (!token) {
//                     setLoading(false);
//                     return;
//                 }
    
//                 const responses = await Promise.all([
//                     axios.get(Endpoint.BASE_URL + Endpoint.COUNTPRODUCT, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }),
//                     axios.get(Endpoint.BASE_URL + Endpoint.COUNTORDERBYMONTH, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }),
//                     axios.get(Endpoint.BASE_URL + Endpoint.SUMORDERSBYMONTH + "?type=" + (isOrderDetailOpen ? "yearly" : "monthly"), { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }), // Menyesuaikan permintaan berdasarkan tipe order
//                     axios.get(Endpoint.BASE_URL + Endpoint.COUNTCUSTOMER, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }),
//                     axios.get(Endpoint.BASE_URL + Endpoint.COUNTORDERBYYEAR, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }), // Mengambil data order tahunan
//                     axios.get(Endpoint.BASE_URL + Endpoint.SUMORDERSBYYEAR, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }) // Mengambil data total pendapatan tahunan
//                 ]);
    
//                 const productCount = responses[0].data.product_count;
//                 const orderCount = responses[1].data.order_count;
//                 const totalRevenue = responses[2].data.total_revenue;
//                 const customerCount = responses[3].data.customer_count;
//                 const yearlyOrderCount = responses[4].data.order_count;
//                 const yearlyTotalRevenue = responses[5].data.total_revenue; 
    
//                 setProductCount(productCount);
//                 setCustomerCount(customerCount);
//                 setOrderCount(isOrderDetailOpen ? yearlyOrderCount : orderCount); 
//                 setTotalRevenue(isTotalRevenueDetailOpen ? yearlyTotalRevenue : totalRevenue); 
    
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Gagal melakukan permintaan:", error);
//                 setLoading(false);
//             }
//         };
    
//         fetchData();
//     }, [token, isOrderDetailOpen, isTotalRevenueDetailOpen]); 
    
//     const toggleOrderDetail = () => {
//         setIsOrderDetailOpen(!isOrderDetailOpen);
//     };

//     const toggleTotalRevenueDetail = () => {
//         setIsTotalRevenueDetailOpen(!isTotalRevenueDetailOpen);
//     };

//     return (
//         <div className="grid grid-cols-4 gap-4">
//             {loading ? ( 
//                 <div>Loading...</div>
//             ) : ( 
//                 <>
//                     <div className="dashboard-card">
//                         <h2>Jumlah Produk:</h2>
//                         <div className="count">{productCount}</div>
//                     </div>
//                     <div className="dashboard-card" onClick={toggleOrderDetail}>
//                         <h2>{isOrderDetailOpen ? 'Order Tahunan:' : 'Order Bulanan:'}</h2>
//                         <div className="count">{isOrderDetailOpen ? orderCount : orderCount}</div>
//                     </div>
//                     <div className="dashboard-card" onClick={toggleTotalRevenueDetail}>
//                         <h2>{isTotalRevenueDetailOpen ? 'Pendapatan Tahunan:' : 'Pendapatan Bulanan:'}</h2>
//                         <div className="count">Rp. {totalRevenue}</div>
//                     </div>
//                     <div className="dashboard-card">
//                         <h2>Jumlah Pelanggan:</h2>
//                         <div className="count">{customerCount}</div>
//                     </div>
//                 </>
//             )}
//             <style jsx>{`
//                 .dashboard-card {
//                     background-color: #ffffff;
//                     border-radius: 8px;
//                     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//                     padding: 20px;
//                     cursor: pointer;
//                 }

//                 h2 {
//                     font-size: 16px;
//                     font-weight: bold;
//                     color: #333333;
//                     margin-bottom: 8px;
//                 }

//                 .count {
//                     font-size: 24px;
//                     font-weight: bold;
//                     color: #22C55E;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Dashboard;

"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Endpoint from '@/app/constant/constant';
import { useRouter } from 'next/navigation';
import { useUserToken } from '@/app/context/UserTokenContext';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [productCount, setProductCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
    const [isTotalRevenueDetailOpen, setIsTotalRevenueDetailOpen] = useState(false);
    const { token, setToken } = useUserToken();
    const router = useRouter();

    // Fungsi untuk mengubah angka menjadi format Rupiah tanpa tanda koma di belakang
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!token) {
                    setLoading(false);
                    return;
                }
    
                const responses = await Promise.all([
                    axios.get(Endpoint.BASE_URL + Endpoint.COUNTPRODUCT, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }),
                    axios.get(Endpoint.BASE_URL + Endpoint.COUNTORDERBYMONTH, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }),
                    axios.get(Endpoint.BASE_URL + Endpoint.SUMORDERSBYMONTH + "?type=" + (isOrderDetailOpen ? "yearly" : "monthly"), { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }), // Menyesuaikan permintaan berdasarkan tipe order
                    axios.get(Endpoint.BASE_URL + Endpoint.COUNTCUSTOMER, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }),
                    axios.get(Endpoint.BASE_URL + Endpoint.COUNTORDERBYYEAR, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }), // Mengambil data order tahunan
                    axios.get(Endpoint.BASE_URL + Endpoint.SUMORDERSBYYEAR, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }) // Mengambil data total pendapatan tahunan
                ]);
    
                const productCount = responses[0].data.product_count;
                const orderCount = responses[1].data.order_count;
                const totalRevenue = responses[2].data.net_revenue;
                const customerCount = responses[3].data.customer_count;
                const yearlyOrderCount = responses[4].data.order_count;
                const yearlyTotalRevenue = responses[5].data.net_revenue; 
    
                setProductCount(productCount);
                setCustomerCount(customerCount);
                setOrderCount(isOrderDetailOpen ? yearlyOrderCount : orderCount); 
                setTotalRevenue(isTotalRevenueDetailOpen ? formatRupiah(yearlyTotalRevenue) : formatRupiah(totalRevenue)); // Format totalRevenue menjadi Rupiah
    
                setLoading(false);
            } catch (error) {
                console.error("Gagal melakukan permintaan:", error);
                setLoading(false);
            }
        };
    
        fetchData();
    }, [token, isOrderDetailOpen, isTotalRevenueDetailOpen]); 
    
    const toggleOrderDetail = () => {
        setIsOrderDetailOpen(!isOrderDetailOpen);
    };

    const toggleTotalRevenueDetail = () => {
        setIsTotalRevenueDetailOpen(!isTotalRevenueDetailOpen);
    };

    return (
        <div className="grid grid-cols-4 gap-4">
            {loading ? ( 
                <div>Loading...</div>
            ) : ( 
                <>
                    <div className="dashboard-card">
                        <h2>Jumlah Produk:</h2>
                        <div className="count">{productCount}</div>
                    </div>
                    <div className="dashboard-card" onClick={toggleOrderDetail}>
                        <h2>{isOrderDetailOpen ? 'Order Tahunan:' : 'Order Bulanan:'}</h2>
                        <div className="count">{isOrderDetailOpen ? orderCount : orderCount}</div>
                    </div>
                    <div className="dashboard-card" onClick={toggleTotalRevenueDetail}>
                        <h2>{isTotalRevenueDetailOpen ? 'Pendapatan Tahunan:' : 'Pendapatan Bulanan:'}</h2>
                        <div className="count">{totalRevenue}</div>
                    </div>
                    <div className="dashboard-card">
                        <h2>Jumlah Pelanggan:</h2>
                        <div className="count">{customerCount}</div>
                    </div>
                </>
            )}
            <style jsx>{`
                .dashboard-card {
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    cursor: pointer;
                }

                h2 {
                    font-size: 16px;
                    font-weight: bold;
                    color: #333333;
                    margin-bottom: 8px;
                }

                .count {
                    font-size: 24px;
                    font-weight: bold;
                    color: #22C55E;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
