"use client"
import PurchaseController from "@/src/components/purchase";
import { SnackbarProvider } from "notistack";

const Purchase = () => {
    return (
        <SnackbarProvider>
            <div className="h-full">
                <PurchaseController />
            </div>
        </SnackbarProvider>
    )
}

export default Purchase;