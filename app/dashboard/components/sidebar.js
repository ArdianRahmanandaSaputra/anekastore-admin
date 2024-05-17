"use client"
import { useAuth } from '@/app/context/AuthContext';
import { useUserToken } from '@/app/context/UserTokenContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const router = useRouter();
    const { isLoggedIn, login, logout } = useAuth();
    const { token, setToken } = useUserToken();
 
    const handleLogout = () => {
        console.log(token)
        logout(token).then(
            () => {
                setToken('');
                router.replace('/login');
            }
        );
    }

    return(
        <>
            {isLoggedIn || 1 ? (
                <div className="flex flex-col flex-wrap bg-white border-r px-6 w-64 h-full">
                    <div className="flex flex-col mt-5">
                        <Link href={`/dashboard/categories`} className='py-3 mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500'>
                            Kategori
                        </Link>
                        <Link href={`/dashboard/products`} className='py-3 mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500'>
                            Produk
                        </Link>
                        <Link href={`/dashboard/customer`} className='py-3 mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500'>
                            Pelanggan
                        </Link>
                        <Link href={`/dashboard/order`} className='py-3 mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500'>
                            Pesanan
                        </Link>
                        <Link href={`/dashboard/payment`} className='py-3 mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500'>
                            Pembayaran
                        </Link>
                        <Link href={`/dashboard/report`} className='py-3 mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500'>
                            Laporan Penjualan
                        </Link>
                        <button onClick={handleLogout} className='text-start py-3 mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500'>
                            Logout
                        </button>
                    </div>
                </div>
                ) : (
                    router.push('/')
                )
            }
        </>
        
    )
}

export default Sidebar;