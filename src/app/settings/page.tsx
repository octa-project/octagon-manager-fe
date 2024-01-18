"use client"
import SettingsController from "@/src/components/settings";
import { SnackbarProvider } from "notistack";

const Settings = () => (
    <SnackbarProvider>
        <div>
            <SettingsController />
        </div>
    </SnackbarProvider>
)

export default Settings;