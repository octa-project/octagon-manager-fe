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

class GridListController extends Component<{}, AgReportState> {
    constructor(props: any) {
        super(props);

        this.state = {
            startDate: moment().format("YYYY-MM-DD 00:00:00"),
            endDate: moment().format("YYYY-MM-DD 23:59:59"),
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

    getPurchases = async () => {
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
        
        return (
            <div className="grid grid-cols-3">

            </div>
        );
    }
}

export default GridListController;
