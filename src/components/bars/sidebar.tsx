"use client"
import {
    DescriptionRounded,
    FormatListBulletedOutlined,
    ShoppingCartOutlined
} from '@mui/icons-material'
import Tooltip from '@mui/material/Tooltip'
import {usePathname} from 'next/navigation'
import Link from 'next/link'
import { Button } from '@mui/material'

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <div>
            <ul className='text-center w-28 py-2'>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Дашборд" placement="left">
                        <Link className={`${pathname === '/' ? 'text-black' : 'text-slate-400 hover:text-white'}`}
                              href='/'>
                            {/*<div className='mb-1'><ShoppingCartOutlined className='text-3xl'/></div>*/}
                            {/*<div className='text-xs'>Дашборд</div>*/}
                            <Button className="bg-[#97f676]" variant="contained">Дашборд</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Бараа бүртгэл" placement="left">
                        <Link
                            className={`${pathname === '/item_manager' ? 'text-black' : 'text-slate-400 hover:text-white'}`}
                            href='/item_manager'>
                            {/*<div className='mb-1'><ShoppingCartOutlined className='text-3xl'/></div>*/}
                            {/*<div className='text-xs'>Бараа бүртгэл</div>*/}
                            <Button className="bg-[#97f676]" variant="contained">Бараа бүртгэл</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Татаг авалт" placement="left">
                        <Link
                            className={`${pathname === '/purchase' ? 'text-black' : 'text-slate-400 hover:text-white'}`}
                            href='/purchase'>
                            {/*<div className='mb-1'><FormatListBulletedOutlined className='text-3xl'/></div>*/}
                            {/*<div className='text-xs'>Татан авалт</div>*/}
                            <Button className="bg-[#97f676]" variant="contained">Татан авалт</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Тайлан" placement="left">
                        <Link
                            className={`${pathname === '/reports' ? 'text-black' : 'text-slate-400 hover:text-white'}`}
                            href='/reports'>
                            {/*<div className='mb-1'><DescriptionRounded className='text-3xl'/></div>*/}
                            {/*<div className='text-xs'>Тайлан</div>*/}
                            <Button className="bg-[#97f676]" variant="contained">Тайлан</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Түүх" placement="left">
                        <Link
                            className={`${pathname === '/history' ? 'text-black' : 'text-slate-400 hover:text-white'}`}
                            href='/history'>
                            {/*<div className='mb-1'><DescriptionRounded className='text-3xl'/></div>*/}
                            {/*<div className='text-xs'>Түүх</div>*/}
                            <Button className="bg-[#97f676]" variant="contained">Түүх</Button>
                        </Link>
                    </Tooltip>
                </li>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Тайлан" placement="left">
                        <Link
                            className={`${pathname === '/settings' ? 'text-black' : 'text-slate-400 hover:text-white'}`}
                            href='/settings'>
                            {/*<div className='mb-1'><DescriptionRounded className='text-3xl'/></div>*/}
                            {/*<div className='text-xs'>Тохиргоо</div>*/}
                            <Button className="bg-[#97f676]" variant="contained">Тохиргоо</Button>
                        </Link>
                    </Tooltip>
                </li>
            </ul>
        </div>
    )
}
export default Sidebar