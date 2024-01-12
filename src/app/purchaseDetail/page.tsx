"use client"
import PurchaseDetailController from "@/src/components/purchase/purchaseDetail";
import { SnackbarProvider } from "notistack";

const Purchase = () => {
    return (
        <SnackbarProvider>
            <div>
                <PurchaseDetailController />
            </div>
        </SnackbarProvider>
    )
}

export default Purchase;