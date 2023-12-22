"use client"
import ReportController from "@/src/components/reports";
import { SnackbarProvider } from "notistack";


const Reports = () => (
    <SnackbarProvider>
        <div className='bg-[#f8f7f5] h-full'>
            <ReportController />
        </div>
    </SnackbarProvider>
)

export default Reports;