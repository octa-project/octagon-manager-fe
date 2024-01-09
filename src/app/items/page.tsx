"use client"
import ItemController from "@/src/components/items";
import { SnackbarProvider } from "notistack";

const items = () => {
  return (
    <SnackbarProvider>
      <div>
        <ItemController />
      </div>
    </SnackbarProvider>
  )
}

export default items;