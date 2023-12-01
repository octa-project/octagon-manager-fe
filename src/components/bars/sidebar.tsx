"use client"
import {
    DescriptionRounded,
    FormatListBulletedOutlined,
    ShoppingCartOutlined
} from '@mui/icons-material'
import Tooltip from '@mui/material/Tooltip'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@mui/material'

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <div>
            <ul className='py-2'>
                <li className='py-2 px-4'>
                    <Tooltip title="Дашборд" placement="left">
                        <Link href='/dashboard'>
                            <Button className={`${pathname === '/dashboard' ? 'w-full h-14 text-white bg-violet-600 text-left hover:bg-violet-400' : 'w-full h-14 text-black bg-violet-50 hover:text-black hover:bg-violet-400'}`}
                             >Дашборд</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='py-2 px-4'>
                    <Tooltip title="Бараа бүртгэл" placement="left">
                        <Link href='/items'>
                            <Button className={`${pathname === '/items' ? 'w-full h-14 text-white bg-violet-600 hover:bg-violet-400' : 'w-full h-14 text-black bg-violet-50 hover:text-black hover:bg-violet-400'}`}
                            >Бараа бүртгэл</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='py-2 px-4'>
                    <Tooltip title="Татаг авалт" placement="left">
                        <Link href='/purchase'>
                            <Button className={`${pathname === '/purchase' ? 'w-full h-14 text-white bg-violet-600 hover:bg-violet-400' : 'w-full h-14 text-black bg-violet-50 hover:text-black hover:bg-violet-400'}`}
                            >Татан авалт</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='py-2 px-4'>
                    <Tooltip title="Тайлан" placement="left">
                        <Link href='/reports'>
                            <Button className={`${pathname === '/reports' ? 'w-full h-14 text-white bg-violet-600 hover:bg-violet-400' : 'w-full h-14 text-black bg-violet-50 hover:text-black hover:bg-violet-400'}`}
                            >Тайлан</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='py-2 px-4'>
                    <Tooltip title="Түүх" placement="left">
                        <Link href='/history'>
                            <Button className={`${pathname === '/history' ? 'w-full h-14 text-white bg-violet-600 hover:bg-violet-400' : 'w-full h-14 text-black bg-violet-50 hover:text-black hover:bg-violet-400'}`}
                            >Түүх</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='py-2 px-4'>
                    <Tooltip title="Тохиргоо" placement="left">
                        <Link href='/settings'>
                            <Button className={`${pathname === '/settings' ? 'w-full h-14 text-white bg-violet-600 hover:bg-violet-400' : 'w-full h-14 text-black bg-violet-50 hover:text-black hover:bg-violet-400'}`}
                            >Тохиргоо</Button>
                        </Link>
                    </Tooltip>
                </li>
            </ul>
        </div>
    )
}
export default Sidebar