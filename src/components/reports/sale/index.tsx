import React, { Component, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";

interface OutcomeReportModel {

    startDate: Date;
    endDate: Date;
    totalSalesAmount: number;
    totalSalesQty: number;

    sales: SaleModel[];

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

class SaleReport extends Component<{}, AgReportState> {
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

    getGridItems = async () => {
        const response = await axios.get('https://www.ag-grid.com/example-assets/olympic-winners.json');
        this.setState({ rowData: response.data });
    }

    doubleClick = (rowData: any) => {
        console.log(rowData);
    }

    render() {
        const containerStyle = { width: '100%', height: '100%' };
        const gridStyle = { height: '100%', width: '100%' };

        return (
            <div className="h-full">
                <div className='bg-white flex-initial w-full h-full shadow overflow-auto'>
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

export default SaleReport;
