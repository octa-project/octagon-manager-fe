"use client"
import { Button, Divider, TextField, Tooltip } from "@mui/material";
import { Component } from "react";
import SaleHistory from "./saleHistory";

class HistoryController extends Component {
    state = {
        historyIndex: 0,
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
                            <Tooltip title="Борлуулалын түүх" placement="left">
                                <Button
                                    onClick={() => this.changeReport(0)}
                                    className={`${this.state.historyIndex === 0
                                        ? normal
                                        : hovered}`}
                                >Борлуулалын түүх</Button>
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
                    {this.state.historyIndex === 0 ? <SaleHistory /> : null}
                    {/* {this.state.reportIndex === 1 ? <OutComeReport /> : null}
                    {this.state.reportIndex === 2 ? <ItemPriceReport /> : null}
                    {this.state.reportIndex === 3 ? <SaleReport /> : null}
                    {this.state.reportIndex === 4 ? <CashierReport /> : null} */}
                </div>
            </div>
        </div>
    )
}
}
export default HistoryController;

