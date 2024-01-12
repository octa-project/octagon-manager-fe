import React, {Component} from "react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {formatDate} from "@/src/components/tools/utils";
import api from "@/src/api";
import {currencyFormatter, currencyFormatterAgGrid} from "@/src/utils";

interface Props {
    phoneNumber: any;
}

class Transaction extends Component<Props, AgReportState> {

    constructor(props: Props) {
        super(props);

        this.state = {
            columnDefs: [
                {field: 'created_date', headerName: 'Огноо', filter: "agTextColumnFilter"},
                {field: 'description', headerName: 'Утга'},
                {field: 'amount', headerName: 'Дүн',  valueFormatter: (params: { value: any; data: { is_income: number } }) => {
                        const isIncome = params.data.is_income === 0;
                        const formattedValue = currencyFormatterAgGrid(params);
                        return isIncome ? `- ${formattedValue}` : `+ ${formattedValue}`;
                    },
                    cellStyle: (params: { data: { is_income: number }; }) => {
                        const isIncome = params.data.is_income === 0
                        return isIncome ? { color: 'red' } : { color: 'green'};
                    },},
                {field: 'balance', headerName: 'Үлдэгдэл', valueFormatter: currencyFormatterAgGrid},
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

    loading = false

    componentDidMount() {
        this.getHistory()
    }

    getHistory = async () => {
        try {
            const endDate = new Date();
            const beginDate = new Date();
            beginDate.setDate(beginDate.getDate() - 30);
            const body = {
                endDate: formatDate(endDate),
                beginDate: formatDate(beginDate),
                phoneNum: this.props.phoneNumber
            }
            await api.getWalletTransactionHistory.getWalletTransactionHistory(body).then(res => {
                if (res.status == 200 && res.data.isSuccess) {
                    this.setState({rowData: res.data.data});
                }
            });

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    };

    render() {
        return (
            <div className="h-full">
                <div className='bg-white flex-initial w-full h-full shadow overflow-auto'>
                    <div style={{height: '100%', width: '100%'}}>
                        <div className="ag-theme-alpine" style={{height: '100%', width: '100%'}}>
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transaction;
