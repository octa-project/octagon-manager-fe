import {Button, Card} from "@mui/material";
import React, {useState} from "react";
import classNames from 'classnames';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MainSettings from "@/src/components/settings/main";
import DeviceSettings from "@/src/components/settings/device";
import BranchSettings from "@/src/components/settings/branch";
import PrinterSettings from "@/src/components/settings/printer";
import AccessSettings from "@/src/components/settings/access";

const SettingsController = () => {

    const [tabValue, setTabValue] = useState("0");

    const tabChange = (tabIndex: string) => {
        setTabValue(tabIndex);
    };

    const tabClass = (index: string) =>
        classNames(
            'font-sans capitalize font-semibold text-base rounded-lg',
            {
                'bg-[#e2e3e9] text-[#6d758f] hover:bg-[#6d758f] hover:text-white opacity-100':
                    tabValue === index,
                'bg-white text-[#6d758f] hover:bg-[#6d758f] hover:text-white opacity-70':
                    tabValue !== index,
            }
        );

    return (
        <div className="flex flex-col p-5 gap-5 h-full">
            <div className="bg-white h-12 shadow-md rounded-lg">
                <div className="w-full h-full grid grid-cols-5 justify-items items-center gap-5 pl-2 pr-2">
                    <Button onClick={() => tabChange("0")} className={tabClass("0")}>
                        Үндсэн
                    </Button>
                    <Button onClick={() => tabChange("3")} className={tabClass("3")}>
                        Төхөөрөмж
                    </Button>
                    <Button onClick={() => tabChange("2")} className={tabClass("2")}>
                        Эрх
                    </Button>
                    <Button onClick={() => tabChange("4")} className={tabClass("4")}>
                        Салбар
                    </Button>
                    <Button onClick={() => tabChange("1")} className={tabClass("1")}>
                        Принтер
                    </Button>
                </div>
            </div>
            <div className="bg-white h-full shadow-md rounded-lg overflow-y-auto">
                <TabContext value={tabValue}>
                    <TabPanel value={"0"} className="p-4">
                        <MainSettings/>
                    </TabPanel>
                    <TabPanel value={"1"} className="p-4">
                        <PrinterSettings/>
                    </TabPanel>
                    <TabPanel value={"2"} className="p-4">
                        <AccessSettings/>
                    </TabPanel>
                    <TabPanel value={"3"} className="p-4">
                        <DeviceSettings/>
                    </TabPanel>
                    <TabPanel value={"4"} className="p-4">
                        <BranchSettings/>
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );


}

export default SettingsController;