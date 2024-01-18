"use client"
import ItemController from "@/src/components/items";
import { SnackbarProvider } from "notistack";

const items = () => {
  return (
      <div>
          <ItemController/>
      </div>
  )
}

export default items;