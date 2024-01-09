import { Button, Card, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import PurchaseCard from "./purchaseGard";
import classNames from 'classnames';

const PurchaseController = () => {

    const [filterValue, setFilterValue] = useState("0");
    const [startDate, setStartDateValue] = useState(moment().format("YYYY-MM-DD 00:00:00"));
    const [endDate, setEndDateValue] = useState(moment().format("YYYY-MM-DD 23:59:59"));
    const [purchases, setPurchases] = useState<Purchase[]>([]);

    const { RangePicker } = DatePicker;
    const dateFormat = "YYYY-MM-DD";

    useEffect(() => {
        fetchSamplePurchases();
    }, []);

    const fetchSamplePurchases = () => {
        const samplePurchases: Purchase[] = [
            {
                id: "1",
                items: [
                    { id: "1", name: "Product A", barcode: "123456789", qty: 5, costPrice: 1000.0 },
                    { id: "2", name: "Product B", barcode: "987654321", qty: 3, costPrice: 5000.0 },
                ],
                suplierId: "S1",
                suplierName: "Supplier A",
                date: "2023-01-01",
                time: "10:30",
                totalAmount: 150.25,
            },
            {
                id: "2",
                items: [
                    { id: "1", name: "Product A", barcode: "123456789", qty: 5, costPrice: 1000.0 },
                    { id: "2", name: "Product B", barcode: "987654321", qty: 3, costPrice: 5000.0 },
                ],
                suplierId: "S2",
                suplierName: "Supplier B",
                date: "2023-01-02",
                time: "14:45",
                totalAmount: 280.75,
            },
            {
                id: "3",
                items: [
                    { id: "1", name: "Product A", barcode: "123456789", qty: 5, costPrice: 1000.0 },
                    { id: "2", name: "Product B", barcode: "987654321", qty: 3, costPrice: 5000.0 },
                ],
                suplierId: "S2",
                suplierName: "Supplier B",
                date: "2023-01-02",
                time: "14:45",
                totalAmount: 280.75,
            },
            {
                id: "4",
                items: [
                    { id: "1", name: "Product A", barcode: "123456789", qty: 5, costPrice: 1000.0 },
                    { id: "2", name: "Product B", barcode: "987654321", qty: 3, costPrice: 5000.0 },
                ],
                suplierId: "S2",
                suplierName: "Supplier B",
                date: "2023-01-02",
                time: "14:45",
                totalAmount: 280.75,
            },
        ];
        setPurchases(samplePurchases);
    };

    const handleFilterChange = (value: string) => {
        setFilterValue(value);
    };

    const handleTextSearch = (text: string) => {
        // const lowercaseText = text.toLowerCase();

        // const filterData = (data: any[]) => {
        //   if (text === '') {
        //     return data;
        //   } else {
        //     return data.filter((item) =>
        //       Object.values(item).some((value) =>
        //         typeof value === 'string' && value.toLowerCase().includes(lowercaseText)
        //       )
        //     );
        //   }
        // };

        // switch (this.state.tabValue) {
        //   case '0':
        //     this.setState({ rowSearchItemCodeData: filterData(this.state.rowItemCodeData) });
        //     break;
        //   case '1':
        //     this.setState({ rowSearchData: filterData(this.state.rowData) });
        //     break;
        //   case '2':
        //     this.setState({ rowSearchItemCodeSkuData: filterData(this.state.rowItemCodeSkuData) });
        //     break;
        //   default:
        //     break;
        // }
    };

    const handleSearchDate = (dates: any, dateStrings: any[]) => {
        setStartDateValue(dateStrings[0] + " 00:00:00");
        setEndDateValue(dateStrings[1] + " 23:59:59");
    };

    const getPurchases = async () => {

    };

    return (

        <div className="flex flex-col p-3 h-full">
            <div className="grid grid-cols-6 gap-5 h-full">
                <div className="col-span-1 bg-white flex flex-col h-full"> {/* Add flex and flex-col */}
                    {/* Content for the first column */}
                </div>
                <div className="flex flex-col col-span-5 gap-3">
                    <div className="grid grid-cols-6 gap-3">
                        <div className="col-span-3">
                            <div className="flex items-center bg-white h-10 w-full rounded shadow border border-[#cbcbcb]">
                                <Input
                                    className="text-[#6d758f] w-full h-full rounded border-none"
                                    placeholder="Хайх..."
                                    onChange={(e) =>
                                        handleTextSearch(e.target.value)
                                    }
                                />
                                <Image
                                    src="/items/search.svg"
                                    alt="icon"
                                    width={24}
                                    height={24}
                                    className="mr-3 cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div
                                className="flex flex-row bg-white h-10 w-full rounded shadow">
                                <Select
                                    className="capitalize text-[#6d758f] w-full rounded"
                                    IconComponent={() => (
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <Image
                                                src="/items/filter.svg"
                                                alt="filter"
                                                width={24}
                                                height={24}
                                            />
                                        </div>
                                    )}
                                    value={filterValue}
                                    onChange={(event) => handleFilterChange(event.target.value as string)} >
                                    <MenuItem value={"0"}>Бүгд</MenuItem>
                                    <MenuItem value={"1"}>Төлсөн</MenuItem>
                                    <MenuItem value={"2"}>Төлөөгүй</MenuItem>
                                </Select>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <RangePicker
                                className="bg-white h-10 w-full rounded shadow border border-[#cbcbcb]"
                                defaultValue={[
                                    dayjs(startDate, dateFormat),
                                    dayjs(endDate, dateFormat),
                                ]}
                                format={dateFormat}
                                onChange={handleSearchDate}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3">
                        <div className="col-span-4">
                            <Button className="thirdButton w-4/12" >ШИНЭЭР ОРЛОГО БҮРТГЭХ</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {purchases.map((purchase) => (
                            <PurchaseCard key={purchase.id} purchase={purchase} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );


}

export default PurchaseController;