import React, { Component, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import api from "@/src/api";

interface CashierReportModel {

    cards: TransactionReportModel[];
    cashiers: TransactionReportModel[];

    totalAmount: number;
    totalCashAmount: number;
    totalNonCashAmount: number;
    totalCardAmount: number;
    totalAccountAmount: number;

}

interface TransactionReportModel {

    date: Date;
    name: string;
    amount: number;
    transactionType: number;

}


class CashierReport extends Component<{}, AgReportState> {
    constructor(props: any) {
        super(props);

        this.state = {
            columnDefs: [
                { field: 'athlete', headerName: 'aaaaaa', filter: "agTextColumnFilter" },
                { field: 'age', pivot: true },
                { field: 'country' },
                { field: 'year' },
                { field: 'date' },
                { field: 'sport' },
                { field: 'gold' },
                { field: 'silver' },
                { field: 'bronze', aggFunc: 'sum' },
                { field: 'total', aggFunc: 'sum' },
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
        this.getGridItems();
    }

    getCashierReportByBetweenDate = async () => {

        const body = {
            stardDate: "2023-12-05",
            endDate: "2023-12-06"
        }

        const result = await api.report_get_cashier_report_between_date.getCashierReportByBetweenDate(body);

        if (result.data.code === "200") {
            
            

        }


    }

    getGridItems = async () => {
        const response = await fetch('https://www.ag-grid.com/example-assets/olympic-winners.json');
        const result = await response.json();
        this.setState({ rowData: result });
    }

    doubleClick = (rowData: any) => {
        console.log(rowData);
    }

    render() {
        const containerStyle = { width: '100%', height: '100%' };
        const gridStyle = { height: '100%', width: '100%' };

        return (
            <div className="h-full">
                <div className='bg-white flex-initial w-full h-full shadow overflow-auto2'>
                    <div style={containerStyle}>
                        <div className="ag-theme-alpine" style={gridStyle}>
                            <AgGridReact
                                rowData={this.state.rowData}
                                columnDefs={this.state.columnDefs}
                                animateRows={true}
                                rowSelection='multiple'
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

export default CashierReport;
