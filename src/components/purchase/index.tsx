import { Button, Card, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import PurchaseCard from "./purchaseGard";
import classNames from 'classnames';
import api from "@/src/api";

const PurchaseController = () => {

    const [filterValue, setFilterValue] = useState("0");
    const [startDate, setStartDateValue] = useState(moment().format("YYYY-MM-DD 00:00:00"));
    const [endDate, setEndDateValue] = useState(moment().format("YYYY-MM-DD 23:59:59"));
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [purchasesData, setPurchasesData] = useState<Purchase[]>([]);

    const { RangePicker } = DatePicker;
    const dateFormat = "YYYY-MM-DD";

    useEffect(() => {
        getPurchases();
    }, []);

    const handleFilterChange = (value: string) => {
        setFilterValue(value);

        if (value === "0") {
            setPurchasesData(purchases);
        } else {
            const filteredData = purchases.filter((t) => (value === "1" ? t.isPaid : !t.isPaid));
            setPurchasesData(filteredData);
        }
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
        try {
            const result = await api.purchase_getMany.getMany();
            if (result.data.code === "200") {
                const purchaseData: any[] = result.data.data;

                const mappedPurchases: Purchase[] = purchaseData.map((item) => {
                    const purchase: Purchase = {
                        id: item.id.toString(),
                        items: item.purchaseItems.map((itemData: any) => {
                            const purchaseItem: PurchaseItem = {
                                id: itemData.id.toString(),
                                barcode: itemData.barcode,
                                itemName: itemData.itemName,
                                sellPrice: itemData.sellPrice,
                                costPrice: itemData.costPrice,
                                purchaseId: itemData.purchaseId.toString(),
                                discount: itemData.discount,
                                qty: itemData.qty,
                                createdDate: itemData.createdDate,
                                lastModifiedDate: itemData.lastModifiedDate,
                                createdBy: itemData.createdBy,
                                lastModifiedBy: itemData.lastModifiedBy,
                            };
                            return purchaseItem;
                        }),
                        supplierId: item.supplierId.toString(),
                        date: item.date,
                        totalAmount: item.totalAmount,
                        totalDiscount: item.totalDiscount,
                        totalQty: item.totalQty,
                        totalCost: item.totalCost,
                        vat: item.vat,
                        cityTax: item.cityTax,
                        isPaid: item.isPaid,
                    };
                    return purchase;
                });

                setPurchases(mappedPurchases);
                setPurchasesData(mappedPurchases);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            // Any cleanup code can be added here
        }
    };

    return (

        <div className="flex flex-col h-full">
            <div className="grid grid-cols-6 gap-5 h-full">
                {/* <div className="col-span-1 bg-white rounded-lg shadow-lg flex flex-col h-full"> 
                </div> */}
                <div className="flex flex-col col-span-6 gap-3">
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
                    <div className="grid grid-cols-3 gap-3 overflow-auto">
                        {purchasesData.map((purchase) => (
                            <PurchaseCard key={purchase.id} purchase={purchase} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );


}

export default PurchaseController;