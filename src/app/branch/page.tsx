"use client"
import BranchController from "@/src/components/branch";
import { SnackbarProvider } from "notistack";

const branch = () => {
    return (
        <SnackbarProvider>
            <div>
                <BranchController />
            </div>
        </SnackbarProvider>
    )
}

export default branch;