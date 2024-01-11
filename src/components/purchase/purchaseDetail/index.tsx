import React, { Component, Fragment } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import apiSale from "@/src/api/apiSale";
import { DatePicker, Input } from "antd";
import Image from "next/image";
import dayjs from "dayjs";
import moment from "moment";
import { Button, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import api from "@/src/api";
import items from '../../../app/items/page';
import { formatMoney } from "../../tools/utils";

interface PurchaseDetailState {
    startDate: string;
    endDate: string;
    data: Purchase;
    nonData: Purchase;
    suppliers: Supplier[];
    branches: string[];
    types: string[];
}

interface ChooseCardProps {
    purchase: Purchase;
}

class PurchaseDetailController extends Component<ChooseCardProps, PurchaseDetailState> {
    constructor(props: ChooseCardProps) {
        super(props);
        this.state = {
            startDate: moment().format("YYYY-MM-DD 00:00:00"),
            endDate: moment().format("YYYY-MM-DD 23:59:59"),
            data: {
                id: "0",
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
            nonData: {
                id: "0",
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
            suppliers: [],
            branches: [],
            types: [],
        };
    }

    first: boolean = false;
    componentDidMount() {
        if (this.first) return
        this.first = true
        this.getSuppliers()
        if (this.state.data.id !== "0") {

        }

    }

    handleSupplier = (value: string) => {
        this.setState((prevState) => ({
            data: {
                ...prevState.data,
                supplierId: value
            }
        }));
    };

    getSuppliers = async () => {
        try {
            const result = await api.supplier_getMany.getMany();
            if (result.data.code === "200") {
                const supplierData: any[] = result.data.data;

                const mappedSuppliers: Supplier[] = supplierData.map((value) => {
                    const supplier: Supplier = {
                        id: value.id.toString(),
                        code: value.code,
                        name: value.name,
                        email: value.email,
                        phone: value.phone,
                        taxNumber: value.taxNumber,
                    };
                    return supplier;
                });
                this.setState({ suppliers: mappedSuppliers });
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            // Any cleanup code can be added here
        }
    };

    getPurchase = async () => {

    };

    handleTextSearch = () => {
        // if (inputValue) {
        //     const lowercaseText = inputValue.toLowerCase();
        //     // Add your logic for text search here
        // }
    };

    render() {
        const { RangePicker } = DatePicker;
        const dateFormat = "YYYY-MM-DD";

        return (
            <div className="flex flex-col gap-5">
                <div> Орлогын бүртгэл</div>
                <div className="flex flex-col grid grid-cols-2">
                    <div className="flex flex-col col-span-1 gap-3">
                        <div className="flex flex-row gap-3">
                            <div className="w-36">Орлогын огноо</div>
                            <DatePicker className="h-8 w-44 bg-white" />
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="w-36">Салбар</div>
                            <Select className="h-8 w-44 bg-white" value={this.state.data?.supplierId}
                                onChange={(e) =>
                                    this.handleSupplier(e.target.value)
                                }>
                                {this.state.branches.map((value) => (
                                    <MenuItem
                                    // key={value.id} value={value.id}
                                    >
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-1 gap-3">
                        <div className="flex flex-row gap-3">
                            <div className="w-36" >Нийлүүлэгч</div>
                            <Select className="h-8 w-44 bg-white" value={this.state.data?.supplierId}
                                onChange={(e) =>
                                    this.handleSupplier(e.target.value)
                                }>
                                {this.state.suppliers.map((value) => (
                                    <MenuItem key={value.id} value={value.id}>
                                        {value.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="w-36">Төрөл</div>
                            <Select className="h-8 w-44 bg-white" value={this.state.data?.supplierId}
                                onChange={(e) =>
                                    this.handleSupplier(e.target.value)
                                }>
                                {this.state.types.map((value) => (
                                    <MenuItem
                                    // key={value.id} value={value.id}
                                    >
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="flex flex-rows p-3 gap-3">
                            <div>
                                Баркод уншуулах
                            </div>
                            <div className="flex items-center bg-white h-10 w-3/12 rounded shadow border border-[#cbcbcb]">
                                <Input
                                    // ref={this.inputRef}
                                    className="text-[#6d758f] w-full h-full rounded border-none"
                                    placeholder="Хайх..."
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            this.handleTextSearch();
                                        }
                                    }}
                                />
                                <Image
                                    src="/items/search.svg"
                                    alt="icon"
                                    width={24}
                                    height={24}
                                    className="mr-3 cursor-pointer"
                                />
                            </div>
                            <Button className="thirdButton w-32" >ЦЭВЭРЛЭХ</Button>
                        </div>
                        <Table size="small">
                            <TableHead className="bg-[#8a91a5] h-14">
                                <TableRow>
                                    <TableCell className="font-sans text-white font-semibold">№</TableCell>
                                    <TableCell className="font-sans text-white font-semibold">БАРКОД</TableCell>
                                    <TableCell className="font-sans text-white font-semibold">НЭР</TableCell>
                                    <TableCell className="font-sans text-white font-semibold">ХӨНГӨЛӨЛТ</TableCell>
                                    <TableCell className="font-sans text-white font-semibold">ТОО</TableCell>
                                    <TableCell className="font-sans text-white font-semibold" align="right">ЗАРАХ ҮНЭ</TableCell>
                                    <TableCell className="font-sans text-white font-semibold" align="right">АВАХ ҮНЭ</TableCell>
                                    <TableCell className="font-sans text-white font-semibold" align="right">НИЙТ АВАХ ҮНЭ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.data.items.map((row) => (
                                    <TableRow key={row.id}>
                                        {/* <TableCell align="center">
                                  <IconButton className="w-8 h-8"
                                  // onClick={() => this.handleEditClick(row)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </TableCell> */}
                                        <TableCell className="font-sans text-[#8a91a5] ">{row.id}</TableCell>
                                        <TableCell className="font-sans text-[#8a91a5] ">{row.barcode}</TableCell>
                                        <TableCell className="font-sans text-[#8a91a5] ">{row.itemName}</TableCell>
                                        <TableCell className="font-sans text-[#8a91a5] ">{row.discount}</TableCell>
                                        <TableCell className="font-sans text-[#8a91a5] ">{row.qty}</TableCell>
                                        <TableCell className="font-sans text-[#8a91a5] " align="right" >{formatMoney(row.sellPrice)}</TableCell>
                                        <TableCell className="font-sans text-[#8a91a5] " align="right" >{formatMoney(row.costPrice)}</TableCell>
                                        <TableCell className="font-sans text-[#8a91a5] " align="right" >{formatMoney(row.costPrice)}</TableCell>
                                    </TableRow>
                                )
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default PurchaseDetailController;
