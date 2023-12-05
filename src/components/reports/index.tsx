"use client"
import { Component } from "react";
import { Button, Divider, Link, TextField, Tooltip } from "@mui/material";
import SaleReport from "./sale";
import IncomeReport from "./income";
import OutComeReport from "./outcome";
import ItemPriceReport from "./itemPrice";
import CashierReport from "./cashier";

class ReportController extends Component {
    state = {
        reportIndex: 0,
    }

    changeReport = (index: number) => {
        this.setState({ reportIndex: index });
    };


    render() {
        const normal = 'font-sans text-base rounded-md w-full h-12 capitalize text-white bg-slate-400 hover:bg-slate-200 text-black';
        const hovered = 'font-sans text-base rounded-md w-full h-12 capitalize text-black bg-slate-50 hover:bg-slate-200';

        return (
            <div className="flex">
                <div className='bg-white flex-initial w-56 h-autp'>
                    <div className="flex-initial">
                        <ul className='py-2'>
                            <li className='py-2 px-4 pt-10'>
                                <Tooltip title="Орлого" placement="left">
                                    <Button
                                        onClick={() => this.changeReport(0)}
                                        className={`${this.state.reportIndex === 0
                                            ? normal
                                            : hovered}`}
                                    >Орлого</Button>
                                </Tooltip>
                            </li>
                            <li className='py-2 px-4 pb-10'>
                                <Tooltip title="Зарлага" placement="left">
                                    <Button
                                        onClick={() => this.changeReport(1)}
                                        className={`${this.state.reportIndex === 1
                                            ? normal
                                            : hovered}`}
                                    >Зарлага</Button>
                                </Tooltip>
                            </li>
                            <Divider variant="middle" />
                            <li className='py-2 px-4 pt-10'>
                                <Tooltip title="Үнийн түүх" placement="left">
                                    <Button
                                        onClick={() => this.changeReport(2)}
                                        className={`${this.state.reportIndex === 2
                                            ? normal
                                            : hovered}`}
                                    >Үнийн түүх</Button>
                                </Tooltip>
                            </li>
                            <li className='py-2 px-4 pb-10'>
                                <Tooltip title="Борлуулалт" placement="left">
                                    <Button
                                        onClick={() => this.changeReport(3)}
                                        className={`${this.state.reportIndex === 3
                                            ? normal
                                            : hovered}`}
                                    >Борлуулалт</Button>
                                </Tooltip>
                            </li>
                            <Divider variant="middle" />
                            <li className='py-2 px-4 pt-10'>
                                <Tooltip title="Касс" placement="left">
                                    <Button
                                        onClick={() => this.changeReport(4)}
                                        className={`${this.state.reportIndex === 4
                                            ? normal
                                            : hovered}`}
                                    >Касс</Button>
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
                </div>
                <Divider orientation="vertical" variant="middle" />
                <div className="flex-initial w-full h-screen">

                    <div className="bg-white p-2 flex-initial w-full ">
                        <div className="grid grid-cols-3 gap-5">
                            <div className="col-span-1">
                                <h1 >Хайх</h1>
                                <TextField className="" variant="standard" />
                            </div>
                            <div className="col-span-2">
                               
                            </div>
                        </div>
                    </div>
                    <div className="flex-initial w-full h-screen">
                        {this.state.reportIndex === 0 ? <IncomeReport /> : null}
                        {this.state.reportIndex === 1 ? <OutComeReport /> : null}
                        {this.state.reportIndex === 2 ? <ItemPriceReport /> : null}
                        {this.state.reportIndex === 3 ? <SaleReport /> : null}
                        {this.state.reportIndex === 4 ? <CashierReport /> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportController;