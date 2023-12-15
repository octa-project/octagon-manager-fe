"use client"
import { Button, Divider, Input, TextField, Tooltip } from "@mui/material";
import { Component } from "react";
import SaleHistory from "./saleHistory";
import SaleReport from "../reports/sale";

class HistoryController extends Component {
    state = {
        historyIndex: 0,
    }
    changeReport = (index: number) => {
        this.setState({ reportIndex: index });
    };

  render() {
    const normal = 'font-sans text-sm rounded-2xl shadow w-full h-12 text-white bg-slate-400 hover:bg-slate-200 text-black';
    const hovered = 'font-sans text-sm rounded-2xl shadow w-full h-12 text-black bg-slate-50 hover:bg-slate-200';

    return (
        <div className="grid grid-cols-5 gap-3">
        <div className='col-span-1 bg-white shadow-md h-screen'>
            <div className="flex-initial">
                <ul className='py-2'>
                    <li className='py-2 px-4 pt-10'>
                        <Button
                            onClick={() => this.changeReport(0)}
                            className={`${this.state.historyIndex === 0
                                ? normal
                                : hovered}`}>
                            Борлуулалтын түүх</Button>
                    </li>
                    {/* <li className='py-2 px-4 pb-10'>
                        <Button
                            onClick={() => this.changeReport(1)}
                            className={`${this.state.historyIndex === 1
                                ? normal
                                : hovered}`}>
                            Зарлага</Button>
                    </li>
                    <Divider variant="middle" />
                    <li className='py-2 px-4 pt-10'>

                        <Button
                            onClick={() => this.changeReport(2)}
                            className={`${this.state.historyIndex === 2
                                ? normal
                                : hovered}`}>
                            Үнийн түүх</Button>
                    </li>
                    <li className='py-2 px-4 pb-10'>
                        <Button
                            onClick={() => this.changeReport(3)}
                            className={`${this.state.historyIndex === 3
                                ? normal
                                : hovered}`}>
                            Борлуулалт</Button>
                    </li>
                    <Divider variant="middle" />
                    <li className='py-2 px-4 pt-10'>
                        <Button
                            onClick={() => this.changeReport(4)}
                            className={`${this.state.historyIndex === 4
                                ? normal
                                : hovered}`}>
                            Касс</Button>
                    </li> */}
                </ul>
            </div>
        </div>
        <div className="flex flex-col col-span-4">
            <div className="flex h-24 p-3">
                <div className="flex items-center bg-white h-14 w-full rounded-2xl shadow border border-[#cbcbcb]">
                    <Input
                        className="capitalize text-[#6d758f] w-full h-full rounded-2xl border-none pl-3 pr-8"
                        placeholder="Хайх..."
                    />
                    {/* <Image
                        src="/items/search.svg"
                        alt="icon"
                        width={24}
                        height={24}
                        className="mr-5 cursor-pointer"
                    /> */}
                </div>
            </div>
            <div className="h-full p-3">
                {this.state.historyIndex === 0 ? <SaleReport /> : null}
                {/* {this.state.historyIndex === 1 ? <OutComeReport /> : null}
                {this.state.historyIndex === 2 ? <ItemPriceReport /> : null}
                {this.state.historyIndex === 3 ? <SaleReport /> : null}
                {this.state.historyIndex === 4 ? <CashierReport /> : null} */}
            </div>
        </div>
    </div>
)
}
}
export default HistoryController;

