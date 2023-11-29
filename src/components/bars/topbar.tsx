import Avatar from "@mui/material/Avatar"
import { LogoutOutlined, PersonOutlineOutlined } from '@mui/icons-material'
import { IconButton, Link } from "@mui/material"
import moment from "moment"

const Topbar = () => {
  return (
    <div className='fixed top-0 left-0 right-0 grid grid-cols-3 z-10 bg-white text-indigo-800 p-3'>
      <div className='flex gap-3'>
        <Avatar
          alt="Болорчимэг"
          src=""
          sx={{ width: 34, height: 34 }} />
        <div className='text-base flex flex-col'>
          <span className='text-gray-500 leading-none'>Касс</span>
          <strong className='leading-none'>Болорчимэг</strong>
        </div>
      </div>
      <div className='text-center py-[5px]'>
        <span className='text-gray-500'>Manager:</span> <strong>Салбар 1</strong>
      </div>
      <div className='flex justify-end items-center gap-3'>
        <div>{moment().format("YYYY/MM/DD H:m")}</div>
        <Link href="http://localhost:3001" >
          <IconButton className="rounded-lg bg-gray-100 text-gray-500 hover:bg-indigo-500 hover:text-white"><PersonOutlineOutlined sx={{ fontSize: 18 }} /></IconButton>
        </Link>
        <IconButton className="rounded-lg bg-gray-100 text-gray-500 hover:bg-rose-500 hover:text-white"><LogoutOutlined sx={{ fontSize: 18 }} /></IconButton>
      </div>
    </div>
  )
}
export default Topbar
