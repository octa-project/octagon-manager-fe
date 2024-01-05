import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import apiSale from "@/src/api/apiSale";
import { DatePicker, Input } from "antd";
import Image from "next/image";
import dayjs from "dayjs";
import moment from "moment";
import { Button } from "@mui/material";

interface AgReportState {
  startDate: string;
  endDate: string;
  columnDefs: any[];
  defaultColDef: any;
  autoGroupColumnDef: any;
  rowData: any[];
  rowSearchData: any[]; // Added rowSearchData to the state
}

class SaleHistoryController extends Component<{}, AgReportState> {
  constructor(props: any) {
    super(props);

    this.state = {
      startDate: moment().format("YYYY-MM-DD 00:00:00"),
      endDate: moment().format("YYYY-MM-DD 23:59:59"),
      columnDefs: [
        {
          field: "athlete",
          headerName: "aaaaaa",
          filter: "agTextColumnFilter",
        },
        { field: "age", pivot: true },
        { field: "country" },
        { field: "year" },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze", aggFunc: "sum" },
        { field: "total", aggFunc: "sum" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        cellDataType: false,
        resizable: true,
        sortable: true,
        enablePivot: true,
        filter: true,
        enableRowGroup: true,
        enableValue: true,
      },
      autoGroupColumnDef: {
        minWidth: 200,
      },
      rowData: [],
      rowSearchData: [], // Initialize rowSearchData
    };
  }

  first: boolean = false;
  componentDidMount() {
    if (this.first) return
    this.first = true
    this.getSale()
  }

  formatDate = (date: {
    getFullYear: () => any;
    getMonth: () => number;
    getDate: () => any;
    getHours: () => any;
    getMinutes: () => any;
    getSeconds: () => any;
  }) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  getSale = async () => {
    try {
      const result = await apiSale("saleHistory").GetMany(
        this.state.startDate,
        this.state.endDate
      );
      if (result.data.code === "200") {
        this.setState({ rowData: result.data.data });
        this.setState({ mounted: false });
      }
    } catch (error) {
      // Handle error
    }
  };

  handleSearchDate = (dates: any, dateStrings: any[]) => {
    this.setState({
      startDate: dateStrings[0] + " 00:00:00",
      endDate: dateStrings[1] + " 23:59:59",
    });
  };

  handleTextSearch = (text: string) => {
    const lowercaseText = text.toLowerCase();

    if (text === "") {
      this.setState({ rowSearchData: this.state.rowData });
    } else {
      const filteredRowData = this.state.rowData.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === "string") {
            const lowercaseValue = value.toLowerCase();
            return lowercaseValue.includes(lowercaseText);
          }
          return false;
        });
      });

      this.setState({ rowSearchData: filteredRowData });
    }
  };

  render() {
    const { RangePicker } = DatePicker;
    const dateFormat = "YYYY-MM-DD";

    return (
      <div className="flex flex-col">
        <div className="flex-row">
          <div className="grid grid-cols-4">
            <div className="col-span-1">
              <RangePicker
                className="text-xl h-8 shadow w-full"
                defaultValue={[
                  dayjs(this.state.startDate, dateFormat),
                  dayjs(this.state.endDate, dateFormat),
                ]}
                format={dateFormat}
                onChange={this.handleSearchDate}
              />
            </div>
            <div className="col-span-1 pl-5">
              <Button className="button">ШҮҮХ</Button>
            </div>
            <div className="col-span-2">
              <div className="flex items-center bg-white h-8 w-full rounded-md shadow border border-[#cbcbcb]">
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
          </div>
        </div>
        <div className="bg-white flex-initial w-full h-full pt-2">
          <div style={{ width: "100%", height: "100%" }}>
            <div
              className="ag-theme-alpine"
              style={{ height: "100%", width: "100%" }}
            >
              <AgGridReact
                rowData={this.state.rowData}
                columnDefs={this.state.columnDefs}
                animateRows={true}
                rowSelection="single"
                defaultColDef={this.state.defaultColDef}
                enableRangeSelection={true}
                enableFillHandle={true}
                autoGroupColumnDef={this.state.autoGroupColumnDef}
                ensureDomOrder={true}
                sideBar={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SaleHistoryController;
