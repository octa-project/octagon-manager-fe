// Sidebar.tsx
import { useState } from 'react';
import Image from 'next/image';
import { Button, Tooltip } from '@mui/material';
import { usePathname } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

interface SidebarItem {
  id: string;
  name: string;
  href: string;
  icon: string;
  nIcon: string;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const pathname = usePathname();
  const sideBarItems: SidebarItem[] = [
    { id: "Dashboard", name: "Дашборд", href: "/dashboard", icon: "/sidebar/dashboardWhite.svg", nIcon: "/sidebar/dashboardGray.svg" },
    { id: "Item", name: "Бараа бүртгэл", href: "/items", icon: "/sidebar/itemWhite.svg", nIcon: "/sidebar/itemGray.svg" },
    { id: "Purchase", name: "Татан авалт", href: "/purchase", icon: "/sidebar/purchaseWhite.svg", nIcon: "/sidebar/purchaseGray.svg" },
    { id: "Report", name: "Тайлан", href: "/reports", icon: "/sidebar/reportWhite.svg", nIcon: "/sidebar/reportGray.svg" },
    { id: "History", name: "Түүх", href: "/history", icon: "/sidebar/historyWhite.svg", nIcon: "/sidebar/historyGray.svg" },
    { id: "Setting", name: "Тохиргоо", href: "/settings", icon: "/sidebar/settingWhite.svg", nIcon: "/sidebar/settingGray.svg" },
    { id: "Branch", name: "Салбар", href: "/branch", icon: "/sidebar/dashboardWhite.svg", nIcon: "/sidebar/dashboardWhite.svg" },
  ];

  return (
    <div>
      <aside className={`sidebar ${collapsed ? 'w-16' : 'w-76'}`}>
        <div className="pl-4 pb-4">
          <Image src={collapsed ? "/sidebar/octaRound.svg" : "/octa.svg"} alt="octa" width={collapsed ? 40 : 150} height={collapsed ? 40 : 48} />
        </div>
        <ul>
          {sideBarItems.map((item, index) => (
            <li key={index} className="p-3">
              <Tooltip title={collapsed ? item.name : ''} arrow placement="right">
                <Button
                  className={`flex flex-row ${pathname === item.href ? 'sideBarSelected' : 'sideBarNoSelected'}`}
                  href={item.href}>
                  <Image
                    src={pathname === item.href ? item.nIcon : item.icon}
                    alt={item.id} width={24} height={24} />
                  {!collapsed && (
                    <div className={`${pathname === item.href ? 'sideBarSelectedText' : 'sideBarNoSelectedText'}`}>
                      {item.name}
                    </div>
                  )}
                </Button>
              </Tooltip>
            </li>
          ))}
        </ul>
        <div className="p-4 w-full">
          <Button onClick={toggleSidebar} className='sideBarCollapsible'>
            {collapsed ? (
              <ArrowForwardIcon /> // Use ArrowForwardIcon for the collapsed state
            ) : (
              <ArrowBackIcon /> // Use ArrowBackIcon for the expanded state
            )}
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
