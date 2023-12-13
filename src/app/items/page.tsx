"use client"
import ItemController from "@/src/components/items";
import { SnackbarProvider } from "notistack";

const items = () => {
  return (
    <SnackbarProvider>
      <div className='bg-[#f8f7f5]'>
        <ItemController />
      </div>
    </SnackbarProvider>
  )
}

export default items;