"use client"
import HistoryController from "@/src/components/history";
import { SnackbarProvider } from "notistack";

const History = () => {
    return (
        <SnackbarProvider>
            <div>
                <HistoryController />
            </div>
        </SnackbarProvider>
    )
}

export default History;