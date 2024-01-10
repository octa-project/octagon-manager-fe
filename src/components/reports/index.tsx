"use client"
import {Button, Card} from "@mui/material";
import classNames from 'classnames';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TaxesReport from "./taxReport";
import SaleReport from "./sale";
import IncomeReport from "./incomeReport";
import ItemReport from "./itemReport";
import React, { Component, useState } from 'react';
import SaleReportController from "./saleReport";


const ReportController = () => {

    const [tabValue, setTabValue] = useState("0");

    const tabChange = (tabIndex: string) => {
        setTabValue(tabIndex);
    };



    const tabs: TabHeaders[] = [
        { id: "saleReport", name: "БОРЛУУЛАЛТ", index: "0" },
        { id: "itemReport", name: "БАРАА МАТЕРИАЛ", index: "1" },
        { id: "taxReport", name: "ТАТВАР", index: "2" },
        { id: "incomeReport", name: "ОРЛОГО,ЗАРЛАГА", index: "3" },
        { id: "purchaseHistory", name: "ХОРОГДОЛ", index: "4" },
    ];

    
    return (
        <div className="flex flex-col p-3 gap-5 h-screen">
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
            <div className="h-full overflow-y-auto">
                <TabContext value={tabValue}>
                    <TabPanel value={"0"} className="p-1 h-full">
                        <SaleReportController/>
                    </TabPanel>
                    <TabPanel value={"1"} className="p-4">
                        {/* <PrinterSettings/> */}
                    </TabPanel>
                    <TabPanel value={"2"} className="p-4">
                        {/* <AccessSettings/> */}
                    </TabPanel>
                    <TabPanel value={"3"} className="p-4">
                        {/* <DeviceSettings/> */}
                    </TabPanel>
                    <TabPanel value={"4"} className="p-4">
                        {/* <BranchSettings/> */}
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );
}

export default ReportController;