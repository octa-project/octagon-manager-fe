"use client"
import SettingsController from "@/src/components/settings";
import { SnackbarProvider } from "notistack";

const Settings = () => (
    <div className='screen'>
        <SettingsController/>
    </div>
)

export default Settings;