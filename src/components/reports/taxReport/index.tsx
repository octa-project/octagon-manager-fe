import React, { Component, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Input, InputLabel, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import { DatePicker, Space } from "antd";

interface TaxReportModel {
  startDate: Date;
  endDate: Date;
  datas: TaxReportModel[];
}

class TaxReport extends Component<{}, AgReportState> {
  [x: string]: any;
  constructor(props: any) {
    super(props);
  }

  render() {
    const containerStyle = { width: "100%", height: "100%" };
    const gridStyle = { height: "100%", width: "100%" };
    const { RangePicker } = DatePicker;
    const MyComponent = (props: {
      message:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | React.PromiseLikeOfReactNode
        | null
        | undefined;
    }) => {
      return <div>{props.message}</div>;
    };

    return (
      <div className="grid grid-cols-8 gap-5">
        <div className="col-span-5">
          <div className="flex items-center bg-white h-14 gap-5 w-full rounded-2xl shadow border border-[#cbcbcb]">
            <Input
              className="capitalize text-[#6d758f] w-full h-full rounded-2xl border-none pl-3 pr-8"
              placeholder="Хайх..."
              onChange={(e) => this.handleTextSearch(e.target.value)}
            />
            <Image
              src="/items/search.svg"
              alt="icon"
              width={24}
              height={24}
              className="mr-5 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-row bg-white h-14 w-full rounded-2xl shadow">
          <Select
            className="capitalize text-[#6d758f] w-full rounded-2xl"
            value={10}
          >
            <MenuItem className="" value={10}>
              Салбар-01
            </MenuItem>
            <MenuItem className="" value={20}>
              Салбар-02
            </MenuItem>
            <MenuItem className="" value={30}>
              Салбар-03
            </MenuItem>
          </Select>
        </div>
        <div className="col-span-2 h-14">
            <RangePicker className="w-full h-full rounded-2xl" />
        </div>
      </div>
    );
  }
}

export default TaxReport;
