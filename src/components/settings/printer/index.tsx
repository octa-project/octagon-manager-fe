import {Button, Card, Skeleton, Switch, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Component, useState} from "react";
import {formatMoney} from "@/src/components/tools/utils";
import * as React from "react";


class PrinterSettings extends Component<{}, settingsPrinterState> {

    constructor(props: any) {
        super(props);
        this.state = {
            first: false,
            open: false,
            secondaryOpen: false,
            selectedPrinter: {
                id: "",
                name: "",
                ownerName: "",
                printType: 0,
                branchId: 0,
                branchName: "",
                isActive: false
            },
            nonSelectedPrinter: {
                id: "",
                name: "",
                ownerName: "",
                printType: 0,
                branchId: 0,
                branchName: "",
                isActive: false
            },
            printersData: [],
            printersSearchData: [],
            skeleten: [1, 2, 3, 4, 5, 6]
        };
    }

    first: boolean = false;

    componentDidMount() {
        if (this.first) return
        this.first = true
        this.getPrinters()
    }

    handleValueChange = () => {

    }

    getPrinters = () => {

    }

    cashierPrinterOnclickHandler = () => {
        console.log("sda")
        this.setState({open : true}, ()=>{
            this.setState({secondaryOpen: false})
            console.log(this.state.open)
        });

    }

    purchasePrinterOnclickHandler = () => {
        console.log("sdaw")
        this.setState({secondaryOpen : true}, ()=>{
            this.setState({open: false})
            console.log(this.state.open)
        });

    }

    render() {

        const {
            first,
            open,
            selectedPrinter,
            nonSelectedPrinter,
            printersData,
            printersSearchData,
            skeleten
        } = this.state

        return (


            <div className="h-full">
                <div className="flex flex-col">
                    <div className="grid grid-rows-2">
                        <div className="row-span-1">
                            <div className="grid grid-cols-2">
                                <div className="flex flex-col col-span-1">
                                    <div className="flex flex-row grid grid-cols-3">
                                        <div className="NormalText col-span-1">
                                            Кассын принтер
                                        </div>
                                        <Switch defaultChecked className="SelectedSwitch col-span-1"/>
                                        <Button className="secondaryButton col-span-1"
                                                onClick={this.cashierPrinterOnclickHandler}>
                                            харах
                                        </Button>
                                    </div>
                                    <div className="flex flex-row grid grid-cols-3">
                                        <div className="NormalText col-span-1">
                                            Захилагын принтер
                                        </div>
                                        <Switch defaultChecked className="SelectedSwitch col-span-1"/>
                                        <Button className="secondaryButton col-span-1 "
                                        onClick={this.purchasePrinterOnclickHandler}>
                                            харах
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-span-1">

                                </div>
                            </div>
                        </div>
                        <div className="row-span-1 h-full">
                            <Card className="w-full h-full shadow rounded">
                                {this.state.open && (<Table size="small">
                                    <TableHead className="bg-[#8a91a5] h-14">
                                        <TableRow>
                                            <TableCell className="font-sans text-white font-semibold">№</TableCell>
                                            <TableCell className="font-sans text-white font-semibold">Компьютер
                                                нэр</TableCell>
                                            <TableCell className="font-sans text-white font-semibold">Принтер
                                                нэр</TableCell>
                                            <TableCell className="font-sans text-white font-semibold">Төрөл</TableCell>
                                            <TableCell className="font-sans text-white font-semibold">Төлөв</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.printersSearchData.length > 0 ? (
                                            this.state.printersSearchData.map((row) => (
                                                <TableRow key={row.id}>
                                                    {/* <TableCell align="center">
                                  <IconButton className="w-8 h-8"
                                  // onClick={() => this.handleEditClick(row)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </TableCell> */}
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.id}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.branchName}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.name}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.branchId}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.ownerName}</TableCell>

                                                </TableRow>
                                            ))
                                        ) : (
                                            <>
                                                {skeleten.map((row) =>
                                                    <TableRow key={row}>
                                                        <TableCell><Skeleton variant="rounded" height={20}/></TableCell>
                                                        <TableCell><Skeleton variant="rounded" height={20}/></TableCell>
                                                        <TableCell><Skeleton variant="rounded" height={20}/></TableCell>
                                                        <TableCell><Skeleton variant="rounded" height={20}/></TableCell>
                                                        <TableCell><Skeleton variant="rounded" height={20}/></TableCell>
                                                    </TableRow>
                                                )}
                                            </>
                                        )}
                                    </TableBody>
                                </Table>)}

                                {this.state.secondaryOpen && (<Table size="small">
                                    <TableHead className="bg-[#8a91a5] h-14">
                                        <TableRow>
                                            <TableCell className="font-sans text-white font-semibold">№</TableCell>
                                            <TableCell className="font-sans text-white font-semibold">Компьютер
                                                нэр</TableCell>
                                            <TableCell className="font-sans text-white font-semibold">Принтер
                                                нэр</TableCell>
                                            <TableCell className="font-sans text-white font-semibold">Төрөл</TableCell>
                                            <TableCell className="font-sans text-white font-semibold">test</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.printersSearchData.length > 0 ? (
                                            this.state.printersSearchData.map((row) => (
                                                <TableRow key={row.id}>
                                                    {/* <TableCell align="center">
                                  <IconButton className="w-8 h-8"
                                  // onClick={() => this.handleEditClick(row)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </TableCell> */}
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.id}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.branchName}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.name}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.branchId}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.ownerName}</TableCell>

                                                </TableRow>
                                            ))
                                        ) : (
                                            <>
                                                {skeleten.map((row) =>
                                                    <TableRow key={row}>
                                                        <TableCell><Skeleton variant="rounded" height={20}/></TableCell>
                                                        <TableCell><Skeleton variant="rounded" height={20}/></TableCell>
                                                        <TableCell><Skeleton variant="rounded" height={20}/></TableCell>
                                                        <TableCell><Skeleton variant="rounded" height={20}/></TableCell>
                                                        <TableCell><Skeleton variant="rounded" height={20}/></TableCell>
                                                    </TableRow>
                                                )}
                                            </>
                                        )}
                                    </TableBody>
                                </Table>)}

                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default PrinterSettings;