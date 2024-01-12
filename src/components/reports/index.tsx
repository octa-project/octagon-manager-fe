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


const ReportController = () => {

    const [tabValue, setTabValue] = useState("0");

    const tabChange = (tabIndex: string) => {
        setTabValue(tabIndex);
    };



    const tabClass = (index: string) =>
        classNames(
            'capitalize font-semibold text-base rounded-lg',
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
                <div className="w-full h-full grid grid-cols-4 justify-items items-center gap-5 pl-2 pr-2">
                    
                    <Button onClick={() => tabChange("0")} className={tabClass("0")}>
                        Татвар
                    </Button>
                    <Button onClick={() => tabChange("1")} className={tabClass("1")}>
                        Бараа материал
                    </Button>
                    <Button onClick={() => tabChange("2")} className={tabClass("2")}>
                        Борлуулалт
                    </Button>
                    <Button onClick={() => tabChange("3")} className={tabClass("3")}>
                        Орлого, Зарлага
                    </Button>
                </div>
            </div>
            <div className="bg-white h-full shadow-md rounded-lg overflow-y-auto">
                <TabContext value={tabValue}>
                    <TabPanel value={"0"} className="p-4">
                        <TaxesReport/>
                    </TabPanel>
                    <TabPanel value={"1"} className="p-4">
                        <ItemReport/>
                    </TabPanel>
                    <TabPanel value={"2"} className="p-4">
                        <SaleReport/>
                    </TabPanel>
                    <TabPanel value={"3"} className="p-4">
                        <IncomeReport/>
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );


}

export default ReportController;