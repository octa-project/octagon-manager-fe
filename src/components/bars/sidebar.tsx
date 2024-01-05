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
          <Image src={collapsed ? "/sidebar/octaRound.svg" : "/octa.svg"} alt="octa"
            width={collapsed ? 40 : 150} height={collapsed ? 40 : 40} />
        </div>
        <div className='flex flex-col justify-start items-center'>
          <div className="flex flex-row w-full items-center ">
            <Button className="bg-white ml-2 mr-2 flex flex-row items-center rounded-b w-full">
              <Image className="ml-4 " src="/sidebar/defaultProfilePic.png" alt="profile picture" width={50} height={50}></Image>
             <div className="flex flex-col items-center">
               <p className="justify-end mr-16 ml-10 text-#6D758F">Name</p>
               <p className="justify-end mr-16 ml-10 text-#6D758FB2 text-xs">role</p>
             </div>
              <Image className="justify-end mr-5" src="/sidebar/downArrow.svg" alt="SVG Image" width={20} height={20}></Image>
            </Button>
          </div>
          {sideBarItems.map((item, index) => (
            <div key={index} className="p-2 w-full">
              <Tooltip title={collapsed ? item.name : ''} arrow placement={collapsed ? 'right' : 'right-end'}>
                <Button
                  className={`flex flex-row ${pathname === item.href ? 'sideBarSelected' : 'sideBarNoSelected'} 
                  ${collapsed ? '' : 'justify-start'}`}
                  href={item.href}
                >
                  <Image
                    src={pathname === item.href ? item.nIcon : item.icon}
                    alt={item.id}
                    width={24}
                    height={24}
                  />
                  {!collapsed && (
                    <div className={`${pathname === item.href ? 'sideBarSelectedText' : 'sideBarNoSelectedText'}`}>
                      {item.name}
                    </div>
                  )}
                </Button>
              </Tooltip>
            </div>
          ))}
        </div>
        <div className="w-full p-2">
          <Button onClick={toggleSidebar} className='sideBarCollapsible'>
            {collapsed ? (<ArrowForwardIcon />) : (<ArrowBackIcon />)}
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
