"use client"
import ReportController from "@/src/components/reports";
import { SnackbarProvider } from "notistack";


const Reports = () => (
    <div className='h-full'>
        <ReportController/>
    </div>
)

export default Reports;