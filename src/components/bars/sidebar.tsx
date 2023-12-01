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
            <ul className='text-left py-2'>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Дашборд" placement="left">
                        <Link className={`${pathname === '/dashboard' ? 'text-black' : 'text-slate-400 hover:text-white'}`} href='/dashboard'>
                            <Button className="w-full h-14 bg-[#97f676] text-black text-left" variant="contained">Дашборд</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Бараа бүртгэл" placement="left">
                        <Link
                            className={`${pathname === '/item_manager' ? 'text-black' : 'text-slate-400 hover:text-white'}`} href='/items'>
                            <Button className="w-full h-14 bg-[#97f676] text-black" variant="contained">Бараа бүртгэл</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Татаг авалт" placement="left">
                        <Link
                            className={`${pathname === '/purchase' ? 'text-black' : 'text-slate-400 hover:text-white'}`} href='/purchase'>
                            <Button className="w-full h-14 bg-[#97f676] text-black" variant="contained">Татан авалт</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Тайлан" placement="left">
                        <Link
                            className={`${pathname === '/reports' ? 'text-black' : 'text-slate-400 hover:text-white'}`} href='/reports'>
                            <Button className="w-full h-14 bg-[#97f676] text-black" variant="contained">Тайлан</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Түүх" placement="left">
                        <Link
                            className={`${pathname === '/history' ? 'text-black' : 'text-slate-400 hover:text-white'}`} href='/history'>
                            <Button className="w-full h-14 bg-[#97f676] text-black" variant="contained">Түүх</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Тайлан" placement="left">
                        <Link
                            className={`${pathname === '/settings' ? 'text-black' : 'text-slate-400 hover:text-white'}`} href='/settings'>
                            <Button className="w-full h-14 bg-[#97f676] text-black" variant="contained">Тохиргоо</Button>
                        </Link>
                    </Tooltip>
                </li>
            </ul>
        </div>
    )
}
export default Sidebar