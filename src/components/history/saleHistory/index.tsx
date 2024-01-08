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
import api from "@/src/api";

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
        { field: "id", headerName: "№" },
        { field: "createdDate", headerName: "Огноо" },
        { field: "itemName", headerName: "Барааны нэр" },
        { field: "totalQty", headerName: "Нийт тоо" },
        { field: "totalAmount", headerName: "Нийт дүн" },
        // { field: "paidTotalAmount", headerName: "Нийт төлсөн дүн" },
        //{ field: "isPaid", headerName: "Төлсөн эсэх" },
        //{ field: "date", headerName: "Төлсөн цаг" },
        //{ field: "isDeleted", headerName: "Устгасан" },
        // { field: 'branchId', headerName: 'Нийт дүн' },
        //{ field: "createdUserId", headerName: "Ажилтан" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 200,
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
    if (this.first) return;
    this.first = true;
    this.getSale();
  }

  getSale = async () => {
    try {
      const startDate = moment(this.state.startDate).format("YYYY-MM-DD HH:mm:ss");
      const endDate = moment(this.state.endDate).format("YYYY-MM-DD HH:mm:ss");  

      const result = await api.saleGetMany.GetMany(
        startDate,
        endDate
      );
      if (result.data.code === "200") {
        this.setState({ rowData: result.data.data });
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
    const { rowData } = this.state;
    const containerStyle = { width: "100%", height: "100%" }
    const gridStyle = { height: "100%", width: "100%" }
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
              <Button className="button" onClick={this.getSale}>
                ШҮҮХ
              </Button>
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
        <div className="ag-theme-alpine" style={gridStyle}>
              <AgGridReact
                domLayout="autoHeight"
                rowData={rowData}
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
              />
            </div>
        </div>
      </div>
    );
  }
}

export default SaleHistoryController;
