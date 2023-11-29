"use client"
import {
    DescriptionRounded,
    FormatListBulletedOutlined,
    ShoppingCartOutlined
} from '@mui/icons-material'
import Tooltip from '@mui/material/Tooltip'
import {usePathname} from 'next/navigation'
import Link from 'next/link'

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <div>
            <ul className='text-center w-28 py-2'>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Борлуулалт" placement="left">
                        <Link className={`${pathname === '/' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                              href='/'>
                            <div className='mb-1'><ShoppingCartOutlined className='text-3xl'/></div>
                            <div className='text-xs'>Борлуулалт</div>
                        </Link>
                    </Tooltip>
                </li>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Борлуулалтын түүх" placement="left">
                        <Link
                            className={`${pathname === '/sales_history' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                            href='/sales_history'>
                            <div className='mb-1'><FormatListBulletedOutlined className='text-3xl'/></div>
                            <div className='text-xs'>Борлуулалт түүх</div>
                        </Link>
                    </Tooltip>
                </li>
                <li className='uppercase py-2 px-4'>
                    <Tooltip title="Тайлан" placement="left">
                        <Link
                            className={`${pathname === '/reports' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                            href='/reports'>
                            <div className='mb-1'><DescriptionRounded className='text-3xl'/></div>
                            <div className='text-xs'>Тайлан</div>
                        </Link>
                    </Tooltip>
                </li>
            </ul>
        </div>
    )
}
export default Sidebar