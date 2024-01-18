"use client"
import DashboardController from "@/src/components/dashboard";
import { SnackbarProvider } from "notistack";

const dashboard = () => {
  return (
    <SnackbarProvider>
      <div>
        <DashboardController />
      </div>
    </SnackbarProvider>
  )
}

export default dashboard;