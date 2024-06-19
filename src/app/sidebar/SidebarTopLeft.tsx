"use client"

import { useEffect, useState, useMemo } from "react";
import { loadSessionFromLocalStorage } from "../sesions/SesionCookies";
import SidebarLeft from "./SidebarLeft";
import SidebarTop from "./Sidebar";
import { useRouter } from "next/navigation";


export default function SidebarTopLeft() {
    const router = useRouter();

    const [visibleSidebar, setVisibleSidebar] = useState(false);
    useEffect(() => {
        const sesionLocalStorage = loadSessionFromLocalStorage();
        console.log(sesionLocalStorage)
        if (sesionLocalStorage) {
            setVisibleSidebar(true)
            router.refresh()
            router.push('/');
        } else {
            setVisibleSidebar(false)
            router.refresh()
            router.push('/login');
        }
    }, []);

    const sidebarContent = useMemo(() => {
        if (visibleSidebar) {
            return (
                <>
                    <SidebarTop />
                    <SidebarLeft />
                </>
            );
        }
        return null;
    }, [visibleSidebar]);

    return (
        <>
            {sidebarContent}

        </>

    );
}