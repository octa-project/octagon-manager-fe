import { Button, Card } from "@mui/material";
import React, { useState } from "react";
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

    const [tabValue, setTabValue] = useState("4");

    const tabChange = (tabIndex: string) => {
        setTabValue(tabIndex);
    };

    const tabs: TabHeaders[] = [
        { id: "main", name: "ҮНДСЭН", index: "0" },
        { id: "device", name: "ТӨХӨӨРӨМЖ", index: "1" },
        { id: "access", name: "ЭРХ", index: "2" },
        { id: "branch", name: "САЛБАР", index: "3" },
        { id: "printer", name: "ПРИНТЕР", index: "4" },
    ];

    return (
        <div className="flex flex-col p-5 gap-5 h-full">
            <div className="bg-white h-14 shadow-lg rounded-lg">
                <div className="w-full h-14 grid grid-cols-5 justify-items items-center gap-5 px-2">
                    {tabs.map((item, index) => (
                        <div key={item.index} onClick={() => tabChange(item.index)}
                            className={tabValue === item.index ? "topBarSelected" : "topBarNoSelected"}>
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white h-full shadow-md rounded-lg overflow-y-auto">
                <TabContext value={tabValue}>
                    <TabPanel value={"0"} className="p-4">
                        <MainSettings />
                    </TabPanel>
                    <TabPanel value={"1"} className="p-4">
                        <DeviceSettings />
                    </TabPanel>
                    <TabPanel value={"2"} className="p-4">
                        <AccessSettings />
                    </TabPanel>
                    <TabPanel value={"3"} className="p-4">
                        <BranchSettings />
                    </TabPanel>
                    <TabPanel value={"4"} className="p-4">
                        <PrinterSettings />
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );


}

export default SettingsController;