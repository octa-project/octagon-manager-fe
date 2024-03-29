import React, { Component, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import api from "@/src/api";
import apiSale from "@/src/api/apiSale";
import { DatePicker } from "antd";

interface OutcomeReportModel {
  startDate: Date;
  endDate: Date;
  totalSalesAmount: number;
  totalSalesQty: number;
  sales: SaleModel[];
  loading: boolean;
  getSale: getSale[];
  formatDate: Date;
}

interface SaleModel {
  id: number;
  date: Date;
  totalQty: number;
  totalAmount: number;
  isPaid: boolean;
  isDeleted: boolean;
  branchId: number;
  createdUserId: number;
}

interface getSale {
  createdDate: Date;
  lastModifiedDate: Date;
  id: number;
  date: Date;
  totalQty: number;
  totalAmount: number;
  paidTotalAmount: number;
  isPaid: boolean;
  isDeleted: boolean;
  branchId: number;
  createdUserId: number;
}
interface AgReportState {
  mounted: boolean;
  startDate: string;
  endDate: string;
  columnDefs: any[];
  defaultColDef: any;
  rowData: any[];
}

class SaleReport extends Component<{}, AgReportState> {
  [x: string]: any;
  constructor(props: any) {
    super(props);

    this.state = {
      mounted: true,
      columnDefs: [
        { field: "id", headerName: "№" },
        { field: "createdDate", headerName: "Огноо" },
        { field: "item", headerName: "Барааны нэр" },
        { field: "totalQty", headerName: "Нийт тоо" },
        { field: "totalAmount", headerName: "Нийт дүн" },
        // { field: "date", headerName: "Борлуулсан цаг" },
        // { field: "paidTotalAmount", headerName: "Нийт төлсөн дүн" },
        // { field: "isPaid", headerName: "Төлсөн эсэх" },
        // { field: "isDeleted", headerName: "Устгасан" },
        // // { field: 'branchId', headerName: 'Нийт дүн' },
        // { field: "createdUserId", headerName: "Ажилтан" },
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
    };
  }

  componentDidMount() {
    if (this.state.mounted) {
      this.getSale();
    }
  }

  handleSearchDate = (dates: any, dateStrings: any[]) => {
    console.log("Selected Range:", dates, dateStrings);
    this.setState({
      startDate: dateStrings[0]+' 00:00:00',
      endDate: dateStrings[1]+' 23:59:59'
    });
  };

  getSale = async () => {
    try {
      const result = await api.saleGetMany.GetMany(
        this.state.startDate,
        this.state.endDate
      );
      if (result.data.isSuccess) {
        this.setState({ rowData: result.data.data });
        this.setState({ mounted: false });
      }
    } catch (error) {}
  };

  render() {
    const containerStyle = { width: "100%", height: "100%" };
    const gridStyle = { height: "100%", width: "100%" };
    const { RangePicker } = DatePicker
    const dateFormat = "YYYY-MM-DD"

    return (
      <div className="h-full">
        <div className="bg-white flex-initial w-full h-full shadow overflow-auto">
          <div style={containerStyle}>
            <div className="ag-theme-alpine" style={gridStyle}>
              <AgGridReact
                rowData={this.state.rowData}
                columnDefs={this.state.columnDefs}
                animateRows={true}
                rowSelection="multiple"
                defaultColDef={this.state.defaultColDef}
                enableRangeSelection={true}
                enableFillHandle={true}
                autoGroupColumnDef={this.state.autoGroupColumnDef}
                ensureDomOrder={true}
                sideBar={true}
                onRowDoubleClicked={(e) => this.doubleClick(e.data)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SaleReport;
