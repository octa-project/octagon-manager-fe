import Avatar from "@mui/material/Avatar"
import { LogoutOutlined, PersonOutlineOutlined } from '@mui/icons-material'
import { Button, IconButton, Link } from "@mui/material"
import moment from "moment"
import { Component, useEffect, useState } from "react";
import Image from "next/image";

const Topbar = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const formattedDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    return (
        <div className='flex-row w-full bg-[#6d758f] p-3 opacity-80'>
            <div className="grid grid-cols-5">
                <div className="headerText col-span-2">Demo manager</div>
                <div className="headerText col-span-2">{formattedDateTime}</div>

                <div className="col-span-1">
                    <div className="flex flex-row justify-end gap-6">
                        <Button className="headerButton flex items-center">
                            <span className="mr-2">Борлуулалт</span>
                            <Image src="/header/sale.svg" alt="SVG Image" width={20} height={20} />
                        </Button>
                        <Button className="headerButton">
                            <Image src="/header/bell.svg" alt="SVG Image" width={20} height={20} />
                        </Button>
                        <Button className="headerButton ml-auto"> {/* Set margin-left to auto */}
                            <Image src="/header/signOut.svg" alt="SVG Image" width={20} height={20} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Topbar
