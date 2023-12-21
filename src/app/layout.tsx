"use client"
import React, { ReactNode, useState } from 'react';
import './globals.css';
import Sidebar from '@/src/components/bars/sidebar';
import SidebarContent from '@/src/components/bars/sidebarContext';
import { metadata } from './metadata';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <html lang="en">
      <body>
        <main className="relative">
          <SidebarContent>
            <div className={`bg-[#6d758f] ${collapsed ? 'w-16' : 'w-72'} pt-10`}>
              <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            </div>
            <div className="flex-auto min-h-screen overflow-auto bg-slate-100 relative">{children}</div>
          </SidebarContent>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;