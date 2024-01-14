"use client";
import "./globals.css";
import React, {Suspense, useEffect, useState} from "react";
import Loader from "@/src/components/common/Loader";
import Header from "@/src/components/Header";
import Sidebar from "@/src/components/Bars/sidebar"
import {ThemeProvider} from "@mui/system";
import {createTheme} from "@mui/material/styles";
import useLocalStorage from "@/src/hooks/useLocalStorage";
import {ThemeContext} from "../context/GlobalContext";

const themeMuiPalette:any = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#6D758F',
        },
        secondary: {
            main: '#e2e3e9',
        },
        success: {
            main: '#69C759',
        },
        error: {
            main: '#E26250',
        },
        warning: {
            main: '#EF942A',
        },
    },
};

export default function RootLayout({children,}: { children: React.ReactNode; }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [theme, setTheme] = useLocalStorage("color-theme", "light");

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // just for fancy
    }, []);

    useEffect(() => {
        console.log(theme)
    }, [theme]);

    let useMemo = React.useMemo(()=>{
        themeMuiPalette.palette.mode = theme;
        return createTheme(themeMuiPalette);
    },[theme]);
    console.log(useMemo.palette.mode)

    return (
        <html lang="en">
        <body suppressHydrationWarning={true}>
            <ThemeContext.Provider value={{theme:theme, setTheme}}>
                <ThemeProvider theme={useMemo}>
                    <div className="dark:bg-boxdark-2 dark:text-bodydark">
                        {loading ? (
                            <Loader/>
                        ) : (
                            <div className="flex h-screen overflow-hidden">
                                {/* <!-- ===== Sidebar Start ===== --> */}
                                <Sidebar
                                    sidebarOpen={sidebarOpen}
                                    setSidebarOpen={setSidebarOpen}
                                />
                                {/* <!-- ===== Sidebar End ===== --> */}

                                {/* <!-- ===== Content Area Start ===== --> */}
                                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                                    {/* <!-- ===== Header Start ===== --> */}
                                    <Header
                                        sidebarOpen={sidebarOpen}
                                        setSidebarOpen={setSidebarOpen}
                                    />
                                    {/* <!-- ===== Header End ===== --> */}

                                    {/* <!-- ===== Main Content Start ===== --> */}
                                    <main>
                                        <div
                                            className="bg-[#f8f7f5] mx-auto max-w-screen-3xl max-h-full p-4 md:p-6 2xl:p-10">
                                            <Suspense fallback={Loader()}>
                                                {children}
                                            </Suspense>
                                        </div>
                                    </main>
                                    {/* <!-- ===== Main Content End ===== --> */}
                                </div>
                                {/* <!-- ===== Content Area End ===== --> */}
                            </div>
                        )}
                    </div>
                </ThemeProvider>
            </ThemeContext.Provider>
        </body>
        </html>
    );
}