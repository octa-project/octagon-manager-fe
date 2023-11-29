"use client"
import React, {Component} from "react"
import {TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material"
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import {DescriptionRounded, FormatListBulletedOutlined, ShoppingCartOutlined} from "@mui/icons-material";
import {usePathname} from 'next/navigation'

class Menus extends Component {
    render() {
        const pathname = "/"
        return (
            <div className="flex-initial">
                <ul className='text-center w-28 py-2'>
                    <li className='uppercase py-2 px-4'>
                        <div className='mb-1'><FormatListBulletedOutlined className='text-3xl'/></div>
                        <div className='text-xs'>Борлуулалт түүх</div>
                    </li>
                    <li className='uppercase py-2 px-4'>
                        <div className='mb-1'><FormatListBulletedOutlined className='text-3xl'/></div>
                        <div className='text-xs'>Борлуулалт түүх</div>
                    </li>
                    <li className='uppercase py-2 px-4'>
                        <div className='mb-1'><FormatListBulletedOutlined className='text-3xl'/></div>
                        <div className='text-xs'>Борлуулалт түүх</div>
                    </li>
                    <li className='uppercase py-2 px-4'>
                        <div className='mb-1'><FormatListBulletedOutlined className='text-3xl'/></div>
                        <div className='text-xs'>Борлуулалт түүх</div>
                    </li>
                    <li className='uppercase py-2 px-4'>
                        <div className='mb-1'><FormatListBulletedOutlined className='text-3xl'/></div>
                        <div className='text-xs'>Борлуулалт түүх</div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Menus