"use client"

// import { useRouter } from 'next/navigation';
// import { useAuth } from "../context/AuthContext";
// import Navbar from "./components/navbar";
// import Sidebar from "./components/sidebar";
// import { useEffect } from "react";
// import Content from "./components/content";

// export default function DashboardLayout({ children }) {
//     const { isLoggedIn, login, logout } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         console.log(isLoggedIn)
//         if (!isLoggedIn) {
//             router.push('/login')
//         }
//     }, []);

//     return (
//         <>
//             <style jsx>{`
//                 .grid-container {
//                     display: grid;
//                     grid-template-columns: auto 1fr; 
//                     grid-template-rows: auto; 
//                     height: 100vh;
//                 }

//                 .sidebar {
//                     overflow-y: auto;
//                 }

//                 .content {
//                     overflow-y: auto;
//                 }
//             `}</style>
//             <Navbar />
//             <div className="grid-container">
//                 <Sidebar className="sidebar" />
//                 <Content className="content">{children}</Content>
//             </div>
//         </>
//     );
// }

import { useRouter } from 'next/navigation';
import { useAuth } from "../context/AuthContext";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import { useEffect } from "react";
import Content from "./components/content";

export default function DashboardLayout({ children }) {
    const { isLoggedIn, login, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log(isLoggedIn)
        if (!isLoggedIn) {
            router.push('/login')
        }
    }, []);

    return (
        <>
            <style jsx>{`
                .grid-container {
                    display: grid;
                    grid-template-columns: auto 1fr; 
                    grid-template-rows: auto; 
                    height: 100vh;
                }

                .sidebar {
                    overflow-y: auto;
                    height: 100%;
                }

                .content {
                    overflow-y: auto;
                    height: 100%;
                }
            `}</style>
            <Navbar />
            <div className="grid-container">
                <Sidebar className="sidebar" />
                <Content className="content">{children}</Content>
            </div>
        </>
    );
}
