import Avatar from "@mui/material/Avatar"
import {LogoutOutlined, PersonOutlineOutlined} from '@mui/icons-material'
import {IconButton, Link} from "@mui/material"
import moment from "moment"
import {Component, useEffect, useState} from "react";
import Image from "next/image";

const Topbar = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const formattedDateTime = currentDateTime.toLocaleString();
    return (
        <div className='flex flex-row bg-white text-indigo-800 p-3'>
            <span className="text-[#6D758F] mr-2">Demo manager</span>

                <p className="ml-10">Current Time: {formattedDateTime}</p>

            <div className="flex flex-row justify-end ml-80">
                <Image className=" ml-80 " src="/items/sales.svg" alt="SVG Image" width={120} height={60}></Image>
                <Image className="ml-5 mr-5" src="/items/logout.svg" alt="SVG Image" width={20} height={20}></Image>
                <Image className=" mr-20 items-end" src="/items/notification-bell.svg" alt="SVG Image" width={20} height={20}></Image>

            </div>

            {/*<div>*/}
            {/*    <div className='flex flex-row gap-3'>*/}

            {/*        <strong className='leading-none'>Болорчимэг</strong>*/}

            {/*    </div>*/}
            {/*    <div className='text-center py-[5px]'>*/}
            {/*        <span className='text-gray-500'>Manager:</span> <strong>Салбар 1</strong>*/}
            {/*    </div>*/}
            {/*    <div className='flex flex-row items-center gap-3 mr-1'>*/}
            {/*        <div className='flex flex-row'>{moment().format("YYYY/MM/DD H:m")}</div>*/}
            {/*        <Link href="http://localhost:3001" >*/}
            {/*            <IconButton className="rounded-lg bg-gray-100 text-gray-500 hover:bg-indigo-500 hover:text-white"><PersonOutlineOutlined sx={{ fontSize: 18 }} /></IconButton>*/}
            {/*        </Link>*/}
            {/*        <IconButton className="rounded-lg bg-gray-100 text-gray-500 hover:bg-rose-500 hover:text-white mr-5"><LogoutOutlined sx={{ fontSize: 18 }} /></IconButton>*/}
            {/*    </div>*/}
            {/*</div>*/}


        </div>
    )
}
export default Topbar
