import React, { Component, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Result } from "postcss";
import apiSale from "@/src/api/apiSale";
import api from "@/src/api";

interface OutcomeReportModel {
  startDate: Date;
  endDate: Date;
  totalSalesAmount: number;
  totalSalesQty: number;

  sales: SaleHistroyModel[];
}
interface ItemSale {
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

interface SaleHistroyModel {
  id: number;
  date: Date;
  totalQty: number;
  totalAmount: number;
  isPaid: boolean;
  isDeleted: boolean;
  branchId: number;
  createdUserId: number;
}

class SaleHistoryController extends Component<{}, AgReportState> {
  constructor(props: any) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "id", headerName: "№" },
        { field: "createdDate", headerName: "Огноо" },
        { field: "itemName", headerName: "Барааны нэр" },
        { field: "totalQty", headerName: "Нийт тоо" },
        { field: "totalAmount", headerName: "Нийт дүн" },
        { field: "paidTotalAmount", headerName: "Нийт төлсөн дүн" },
        //{ field: "isPaid", headerName: "Төлсөн эсэх" },
        //{ field: "date", headerName: "Төлсөн цаг" },
        //{ field: "isDeleted", headerName: "Устгасан" },
        // { field: 'branchId', headerName: 'Нийт дүн' },
        //{ field: "createdUserId", headerName: "Ажилтан" },
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
    this.getSales();
  }

   formatDate = (date: { getFullYear: () => any; getMonth: () => number; getDate: () => any; getHours: () => any; getMinutes: () => any; getSeconds: () => any; }) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} 00:00:00`;
  };

  getSales = async () => {
    try {
        const today = new Date();
        const startDate = this.formatDate(today);
        
        // Set endDate and add 1 month in the specified format
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);
        const newEndDate = this.formatDate(endDate);
        

      const result = await api.saleGetMany.GetMany(startDate, newEndDate);

      if (result.data.code === "200") {
        this.setState({ rowData: result.data.data });
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      // Handle error
    } finally {
    }
  };

  // doubleClick = (rowData: any) => {
  //     console.log(rowData);
  // }

  render() {
    const containerStyle = { width: "100%", height: "100%" };
    const gridStyle = { height: "100%", width: "100%" };

    return (
      <div className="flex">
        <div className="bg-white flex-initial w-full h-screen p-2">
          <div style={containerStyle}>
            <div className="ag-theme-alpine" style={gridStyle}>
              <AgGridReact //@ts-ignore
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
                //onRowDoubleClicked={(e) => this.doubleClick(e.data)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SaleHistoryController;
