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
    "font-sans text-left rounded-xl w-4/5 h-10 capitalize text-[#6d758f] bg-[#f8f7f5] hover:bg-violet-200";
  const notselected =
    "font-sans text-left rounded-xl w-4/5 h-10 capitalize text-white bg-[#6d758f]  hover:text-white hover:bg-violet-200";
  const selectedText =  "font-sans text-left pl-3 capitalize text-[#6d758f] hover:text-white";
  const nonselectedText = "font-sans text-left pl-3 capitalize text-white hover:text-white";


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
      <div className="flex flex-col justify-center items-center pt-5 gap-5">
        <div className={`flex flex-row justify-left pl-4 ${pathname === "/dashboard" ? selected : notselected}`}>
          {pathname === "/dashboard" ? (
            <Image
              src="/dashboardgray.svg"
              alt="dashboardgray"
              width={24}
              height={24}
            />
          ) : (
            <Image
              src="/dashboardwhite.svg"
              alt="dashboardwhite"
              width={24}
              height={24}
            />
          )}
          <Button href="/dashboard" className={`${pathname === "/dashboard" ? selectedText : nonselectedText}`}>
            Дашборд
          </Button>
        </div>
        <div className={`flex flex-row justify-left pl-4 ${pathname === "/items" ? selected : notselected}`}>
          {pathname === "/items" ? (
            <Image
            src="/itemgray.svg"
            alt="itemgray"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src="/itemwhite.svg"
            alt="itemwhite"
            width={24}
            height={24}
          />
        )}
          <Button href="/items" className={`${pathname === "/items" ? selectedText : nonselectedText}`}>
          Бараа бүртгэл
          </Button>
        </div>
        <div className={`flex flex-row justify-left pl-4 ${pathname === "/reports" ? selected : notselected}`}>
          {pathname === "/reports" ? (
            <Image
            src="/reportgray.svg"
            alt="reportgray"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src="/reportwhite.svg"
            alt="reportwhite"
            width={24}
            height={24}
          />
          )}
          <Button href="/reports" className={`${pathname === "/reports" ? selectedText : nonselectedText}`}>
            Тайлан
          </Button>
        </div>
        <div className={`flex flex-row justify-left pl-4 ${pathname === "/history" ? selected : notselected}`}>
          {pathname === "/history" ? (
            <Image
            src="/historygray.svg"
            alt="historygray"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src="/historywhite.svg"
            alt="historywhite"
            width={24}
            height={24}
          />
          )}
          <Button href="/history" className={`${pathname === "/history" ? selectedText : nonselectedText}`}>
            Түүх
          </Button>
        </div>
        <div className={`flex flex-row justify-left pl-4 ${pathname === "/settings" ? selected : notselected}`}>
          {pathname === "/settings" ? (
            <Image
            src="/settinggray.svg"
            alt="settinggray"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src="/settingwhite.svg"
            alt="settingwhite"
            width={24}
            height={24}
          />
          )}
          <Button href="/settings" className={`${pathname === "/settings" ? selectedText : nonselectedText}`}>
            Тохиргоо
          </Button>
        </div>
      </div></div>
  );
};
export default Sidebar;
