"use client"
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useUserToken } from '../context/UserTokenContext';
import { useEffect } from 'react';

export default function Page() {
    const router = useRouter();
    const { isLoggedIn, login, logout } = useAuth();
    const { token, setToken } = useUserToken();

    useEffect(()=>{
        console.log("Token is : ", token);
    }, [])

    return (
        <div>
            <p>Selamat datang! <button onClick={logout}>Logout</button></p>
        </div>
    )
}