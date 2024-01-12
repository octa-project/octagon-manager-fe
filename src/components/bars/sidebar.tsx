import React, { Component, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import DropdownUser from "@/src/components/Header/DropdownUser";
import { DashboardIcon, HistoryIcon, ItemIcon, ReportIcon, SettingIcon } from "@/src/components/Icons/MenuIcons";
import {Button, Tooltip} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

interface IMenuItem {
    id: number,
    label: string
    link: string
    icon: any,
}

interface profileInfo {

    id: number,
    email: string,
    phoneNumber: string,
    imagePath: string,
    firstName: string,
    lastName: string,
    userClientId: string,
    role: string,

}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen } : SidebarProps) => {

    const pathname = usePathname();

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);
    const menuItems: IMenuItem[] = [
        { id: 1, label: "Дашборд", link: "/dashboard", icon: <DashboardIcon fill={"inherit"} />, },
        { id: 2, label: "Бараа бүртгэл", link: "/items", icon: <ItemIcon fill={"inherit"} />, },
        { id: 3, label: "Татан авалт", link: "/purchase", icon: <ItemIcon fill={"inherit"} />, },
        { id: 5, label: "Тайлан", link: "/reports", icon: <ReportIcon fill={"inherit"} />, },
        { id: 6, label: "Түүх", link: "/history", icon: <HistoryIcon fill={"inherit"} />, },
        { id: 7, label: "Тохиргоо", link: "/settings", icon: <SettingIcon fill={"inherit"} />, },
        { id: 4, label: "Салбар", link: "/branch", icon: <ItemIcon fill={"inherit"} />, },
    ];
    let storedSidebarExpanded = "true";
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === "true"
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ key }: KeyboardEvent) => {
            if (!sidebarOpen || key !== "Escape") return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded");
        } else {
            document.querySelector("body")?.classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden duration-300 ease-linear bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="flex items-center justify-between gap-2 px-6 my-2 h-8">
                <Link href="/" className={"h-full w-full relative"}>
                    <Image
                        src={"/assets/images/octa.svg"}
                        width={0}
                        height={0}
                        alt={"logo"}
                        style={{ height: '100%', width: '50%', minWidth: "100px" }}
                    />
                </Link>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block text-white lg:hidden"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <div className="mt-5 pt-4 px-4">
                    <div>
                        <DropdownUser />
                    </div>
                </div>
                <nav className="mt-5 py-4 px-4">
                    {/* <!-- Menu Group --> */}
                    <div>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            {menuItems.map(({ id, icon, link, label }) => {
                                let isHighlight = pathname.includes(link);
                                return <li key={id}>
                                    <Link
                                        href={link}
                                        className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-normal duration-300 ease-in-out dark:hover:bg-meta-4 hover:bg-white hover:text-graydark hover:fill-graydark ${isHighlight ? " bg-white text-graydark dark:bg-meta-4 fill-graydark" : "text-white fill-white"
                                        }`}
                                    >
                                        {icon}
                                        {label}
                                    </Link>
                                </li>
                            })}
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
