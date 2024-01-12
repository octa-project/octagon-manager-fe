"use client";
import "./globals.css";
import React, {useState, useEffect, Suspense} from "react";
import Loader from "@/src/components/common/Loader";
import Header from "@/src/components/Header";
import Sidebar from "@/src/components/bars/sidebar"

export default function RootLayout({children,}: { children: React.ReactNode; }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // just for fancy
    }, []);

    return (
        <html lang="en">
        <body suppressHydrationWarning={true}>
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
                            <div className="bg-[#f8f7f5] mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
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
        </body>
        </html>
    );
}