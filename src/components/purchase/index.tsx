import { Button, Card } from "@mui/material";
import React, { useState } from "react";
import classNames from "classnames";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MainSettings from "@/src/components/settings/main";
import DeviceSettings from "@/src/components/settings/device";
import BranchSettings from "@/src/components/settings/branch";
import PrinterSettings from "@/src/components/settings/printer";
import AccessSettings from "@/src/components/settings/access";
import PurchaseMain from "./purchaseMain";
import PurchaseOrder from "./purchaseOrder";

const PurchaseController = () => {
  const [tabValue, setTabValue] = useState("0");

  const tabChange = (tabIndex: string) => {
    setTabValue(tabIndex);
  };

  const tabs: TabHeaders[] = [
    { id: "purchase", name: "ТАТАН АВАЛТ", index: "0" },
    { id: "order", name: "ЗАХИАЛГА", index: "1" },
  ];

  return (
    <div className="flex flex-col gap-3 h-screen">
      <div className="bg-white h-14 shadow-lg rounded-lg">
        <div className="w-full h-14 grid grid-cols-5 justify-items items-center gap-5 px-2">
          {tabs.map((item, index) => (
            <div
              key={item.index}
              onClick={() => tabChange(item.index)}
              className={
                tabValue === item.index ? "topBarSelected" : "topBarNoSelected"
              }
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white h-full shadow-md rounded-lg">
        <TabContext value={tabValue}>
          <TabPanel value={"0"} className="p-4 h-full">
            <PurchaseMain />
          </TabPanel>
          <TabPanel value={"1"} className="p-4 h-full">
            <PurchaseOrder />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default PurchaseController;
