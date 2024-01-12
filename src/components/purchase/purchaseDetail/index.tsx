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

interface PurchaseDetailState {
    startDate: string;
    endDate: string;
    data: Purchase;
    nonData: Purchase;
}

class PurchaseDetailController extends Component<{}, PurchaseDetailState> {
    constructor(props: any) {
        super(props);

        this.state = {
            startDate: moment().format("YYYY-MM-DD 00:00:00"),
            endDate: moment().format("YYYY-MM-DD 23:59:59"),
            data:{
                id: "",
                items: [],
                supplierId: "",
                date: "",
                totalAmount: 0,
                totalDiscount: 0,
                totalQty: 0,
                totalCost: 0,
                vat: 0,
                cityTax: 0,
                isPaid: false
            },
            nonData:{
                id: "",
                items: [],
                supplierId: "",
                date: "",
                totalAmount: 0,
                totalDiscount: 0,
                totalQty: 0,
                totalCost: 0,
                vat: 0,
                cityTax: 0,
                isPaid: false
            },
        };
    }

    first: boolean = false;
    componentDidMount() {
        if (this.first) return;
        this.first = true;
    }

    render() {
        const { RangePicker } = DatePicker;
        const dateFormat = "YYYY-MM-DD";
       
        return (
            <div className="flex flex-col">
               
            </div>
        );
    }
}

export default PurchaseDetailController;
