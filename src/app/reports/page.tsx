"use client"
import ReportController from "@/src/components/reports";
import { SnackbarProvider } from "notistack";


const Reports = () => (
    <SnackbarProvider>
        <div>
            <ReportController />
        </div>
    </SnackbarProvider>
)

export default Reports;