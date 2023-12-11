"use client";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import Tooltip from "@mui/material/Tooltip";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Button,
  MenuItem,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import { Dashboard } from "@mui/icons-material";

const Sidebar = () => {
  const pathname = usePathname();
  const selected =
    "font-sans text-base rounded-xl w-full h-10 capitalize text-[#6d758f] bg-[#f8f7f5] hover:bg-violet-200";
  const notselected =
    "font-sans text-base rounded-xl w-full h-10 capitalize text-white bg-[#6d758f]  hover:text-white hover:bg-violet-200";

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <div>
      <div>
        <Image
          src="/octa.svg"
          alt="octa logo"
          className="p-5"
          width={150}
          height={48}
        />
        <Dropdown>
          <div className="px-4 pt-5">
            <MenuButton className="font-sans rounded-md w-full h-16 py-4 px-4 bg-white text-white">
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-1">
                  <Avatar alt="Remy Sharp" className="w-7 h-7" />
                </div>
                <div className="col-span-3">
                  <Typography
                    className="font-sans text-[#6d758f] text-xs text-left pt"
                    gutterBottom
                  >
                    Б.Төгөлдөр
                  </Typography>
                  <Typography
                    className="font-sans text-[#6d758f] text-xs text-left pt"
                    gutterBottom
                  >
                    Менежер эрх
                  </Typography>
                </div>
                <div className="col-span-1">
                  <IconButton className="">
                    <KeyboardArrowDownIcon className="text-[#6d758f]" />
                  </IconButton>
                </div>
              </div>
            </MenuButton>
            <Menu slots={{}}></Menu>
          </div>
        </Dropdown>
      </div>
      <ul className="py-2 pt-4">
        <li className="py-2 px-4">
          <Tooltip title="Дашборд" placement="left">
            <Link href="/dashboard">
              <Button
                className={`${
                  pathname === "/dashboard" ? selected : notselected
                }`}
                startIcon={
                    pathname === "/dashboard" ?
                  <Image
                    src="/dashboardgray.svg"
                    alt="dashboardgray"
                    width={24}
                    height={24}
                  />
                  : 
                  <Image
                    src="/dashboardwhite.svg"
                    alt="dashboardwhite"
                    width={24}
                    height={24}
                  />
                }
              >
                Дашборд
              </Button>
            </Link>
          </Tooltip>
        </li>
        <li className="py-2 px-4">
          <Tooltip title="Бараа бүртгэл" placement="left">
            <Link href="/items">
              <Button
                className={`${pathname === "/items" ? selected : notselected}`}
                startIcon={
                    pathname === "/items" ?
                  <Image
                    src="/itemgray.svg"
                    alt="itemgray"
                    width={24}
                    height={24}
                  />
                  : 
                  <Image
                    src="/itemwhite.svg"
                    alt="itemwhite"
                    width={24}
                    height={24}
                  />
                }
              >
                Бараа бүртгэл
              </Button>
            </Link>
          </Tooltip>
        </li>
        {/* <li className='py-2 px-4'>
                    <Tooltip title="Татаг авалт" placement="left">
                        <Link href='/purchase'>
                            <Button className={`${pathname === '/purchase'
                                ? selected
                                : notselected}`}
                            >Татан авалт</Button>
                        </Link>
                    </Tooltip>
                </li> */}
        <li className="py-2 px-4">
          <Tooltip title="Тайлан" placement="left">
            <Link href="/reports">
              <Button
                className={`${
                  pathname === "/reports" ? selected : notselected
                }`}
                startIcon={
                    pathname === "/reports" ?
                  <Image
                    src="/reportgray.svg"
                    alt="reportgray"
                    width={24}
                    height={24}
                  />
                  : 
                  <Image
                    src="/reportwhite.svg"
                    alt="reportwhite"
                    width={24}
                    height={24}
                  />
                }
              >
                Тайлан
              </Button>
            </Link>
          </Tooltip>
        </li>
        <li className="py-2 px-4">
          <Tooltip title="Түүх" placement="left">
            <Link href="/history">
              <Button
                className={`${
                  pathname === "/history" ? selected : notselected
                }`}
                startIcon={
                    pathname === "/history" ?
                  <Image
                    src="/historygray.svg"
                    alt="historygray"
                    width={24}
                    height={24}
                  />
                  : 
                  <Image
                    src="/historywhite.svg"
                    alt="historywhite"
                    width={24}
                    height={24}
                  />
                }
              >
                Түүх
              </Button>
            </Link>
          </Tooltip>
        </li>
        <li className="py-2 px-4">
          <Tooltip title="Тохиргоо" placement="left">
            <Link href="/settings">
              <Button
                className={`${
                  pathname === "/settings" ? selected : notselected
                }`}
                startIcon={
                    pathname === "/settings" ?
                  <Image
                    src="/settinggray.svg"
                    alt="settinggray"
                    width={24}
                    height={24}
                  />
                  : 
                  <Image
                    src="/settingwhite.svg"
                    alt="settingwhite"
                    width={24}
                    height={24}
                  />
                }
              >
                Тохиргоо
              </Button>
            </Link>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
