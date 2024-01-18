"use client"
import PurchaseController from "@/src/components/purchase";
import { SnackbarProvider } from "notistack";

const Purchase = () => {
    return (
        <div className="h-full">
            <PurchaseController/>
        </div>
    )
}

export default Purchase;