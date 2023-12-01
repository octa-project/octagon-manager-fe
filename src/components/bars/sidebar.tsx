"use client"
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import Tooltip from '@mui/material/Tooltip'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button, MenuItem, Typography, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Sidebar = () => {
    const pathname = usePathname()
    const normal = 'font-sans text-base rounded-md w-full h-12 capitalize text-white bg-violet-400 hover:bg-violet-200';
    const hovered = 'font-sans text-base rounded-md w-full h-12 capitalize text-black bg-violet-50  hover:text-white hover:bg-violet-200';


    const createHandleMenuClick = (menuItem: string) => {
        return () => {
            console.log(`Clicked on ${menuItem}`);
        };
    };

    return (
        <div>
            <div>
                <Dropdown >
                    <div className='px-4'>
                        <MenuButton className='w-full h-20 py-4 px-4 bg-white border-b border-violet-100'>
                            <div className='grid grid-cols-4 gap-8'>
                                <div className='col-span-3'>
                                    <Typography className='text-lg text-left' component="div">
                                        Салбар: Дэлгүүр 1
                                    </Typography>
                                    <Typography className='text-xs text-left pt-2' color="text.secondary" gutterBottom>
                                        Ө.Золжаргал
                                    </Typography>
                                </div>
                                <div>
                                    <IconButton>
                                        <ArrowDropDownIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </MenuButton>
                        <Menu slots={{}}>
                            <MenuItem onClick={createHandleMenuClick('Profile')}>Profile</MenuItem>
                            <MenuItem onClick={createHandleMenuClick('Language settings')}>
                                Language settings
                            </MenuItem>
                            <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
                        </Menu>
                    </div>
                </Dropdown>
            </div>
            <ul className='py-2 pt-28'>
                <li className='py-2 px-4'>
                    <Tooltip title="Дашборд" placement="left">
                        <Link href='/dashboard'>
                            <Button className={`${pathname === '/dashboard'
                                ? normal
                                : hovered}`}
                            >Дашборд</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='py-2 px-4'>
                    <Tooltip title="Бараа бүртгэл" placement="left">
                        <Link href='/items'>
                            <Button className={`${pathname === '/items'
                                ? normal
                                : hovered}`}
                            >Бараа бүртгэл</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='py-2 px-4'>
                    <Tooltip title="Татаг авалт" placement="left">
                        <Link href='/purchase'>
                            <Button className={`${pathname === '/purchase'
                                ? normal
                                : hovered}`}
                            >Татан авалт</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='py-2 px-4'>
                    <Tooltip title="Тайлан" placement="left">
                        <Link href='/reports'>
                            <Button className={`${pathname === '/reports'
                                ? normal
                                : hovered}`}
                            >Тайлан</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='py-2 px-4'>
                    <Tooltip title="Түүх" placement="left">
                        <Link href='/history'>
                            <Button className={`${pathname === '/history'
                                ? normal
                                : hovered}`}
                            >Түүх</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='py-2 px-4'>
                    <Tooltip title="Тохиргоо" placement="left">
                        <Link href='/settings'>
                            <Button className={`${pathname === '/settings'
                                ? normal
                                : hovered}`}
                            >Тохиргоо</Button>
                        </Link>
                    </Tooltip>
                </li>
            </ul>
        </div>
    )
}
export default Sidebar