"use client"
import WalletController from "@/src/components/wallet";
import { SnackbarProvider } from "notistack";
const wallet = () => {
    return (
        <SnackbarProvider>
            <div>
                <WalletController />
            </div>
        </SnackbarProvider>
    )


}

export default wallet;