"use client"
import SettingsController from "@/src/components/settings";
import { SnackbarProvider } from "notistack";

const Settings = () => (
    <SnackbarProvider>
        <div className='bg-[#f8f7f5] h-full'>
            <SettingsController />
        </div>
    </SnackbarProvider>
)

export default Settings;