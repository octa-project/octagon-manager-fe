"use client"
import WalletController from "@/src/components/wallet";
import {SnackbarProvider} from "notistack";
const wallet = () => {
    return (
        <SnackbarProvider>
            <WalletController/>
        </SnackbarProvider>

    )
}

export default wallet;