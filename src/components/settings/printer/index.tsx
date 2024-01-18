import {Button, Card, Skeleton, Switch, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Component, useState} from "react";
import {formatMoney} from "@/src/components/tools/utils";
import * as React from "react";
import api from "@/src/api";
import CustomModal from "@/src/components/settings/printer/Modal";
import DialogForSettings from "@/src/components/settings/printer/DialogForSettings";


class PrinterSettings extends Component<{}, SettingsPrinterState> {

    constructor(props: any) {
        super(props);
        this.state = {
            first: false,
            open: false,
            modalOpen: false,
            modalClose: true,
            secondaryOpen: false,
            selectedPrinter: {
                id: "",
                name: "",
                ownerName: "",
                printType: 0,
                branchId: 0,
                branchName: "",
                active: true,
                retailDeviceName: "",
                ipAddress:"",
                cashierPrinter: true
            },
            nonSelectedPrinter: {
                id: "",
                name: "",
                ownerName: "",
                printType: 0,
                branchId: 0,
                branchName: "",
                active: true,
                retailDeviceName: "",
                ipAddress:"",
                cashierPrinter: true
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


    getPrinters = () => {

    }

    getList = async () => {
        const result = api.getDeviceListByBranch.GetDeviceSettingsListByBranch(1).then(res => {
            this.setState({printersData: res.data.data}, () => {

            });
        })
    }

    getListForOrder = async () => {
        const result = api.getDeviceListByBranchForOrder.GetDeviceSettingsListByBranchForOrder(1).then(res => {
            this.setState({printersSearchData: res.data.data}, () => {


            });
        })
    }


    cashierPrinterOnclickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.getList().then(r => {

        });
        console.log("sda")
        this.setState({open: true}, () => {
            this.setState({secondaryOpen: false})
            console.log(this.state.open)
        });

    }

    purchasePrinterOnclickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.getListForOrder().then(r => {
            console.log(r)
        });
        console.log("sdaw")
        this.setState({secondaryOpen: true}, () => {
            this.setState({open: false})
            console.log(this.state.open)
        });

    }

    deletePrinter = (id: any) => {
        const result = api.deleteDeviceSettings.DeleteDeviceSettings(id).then(res => {
           this.getList().then(r =>{
               if (this.state.printersData.length == 0){
                   this.setState({open:false})
               }
           })
        });
    }

     openModal = () => {
         this.setState({modalOpen:true})
    };

     closeModal = () => {
         this.setState({modalOpen:false})
    };

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
                            <div className="grid grid-cols-2">
                                <div className="flex flex-col col-span-1">
                                    <div className="flex flex-row grid grid-cols-3">
                                        <div className="NormalText col-span-1">
                                            Кассын принтер
                                        </div>
                                        <Switch     checked={this.state.open}
                                                    onChange={this.cashierPrinterOnclickHandler}
                                                    className="SelectedSwitch col-span-1"/>
                                        {/*<Button className="secondaryButton col-span-1"*/}
                                        {/*        onClick={this.cashierPrinterOnclickHandler}>*/}
                                        {/*    харах*/}
                                        {/*</Button>*/}
                                    </div>
                                    <div className="flex flex-row grid grid-cols-3">
                                        <div className="NormalText col-span-1">
                                            Захилагын принтер
                                        </div>
                                        <Switch checked={this.state.secondaryOpen}
                                                onChange={this.purchasePrinterOnclickHandler}
                                                className="SelectedSwitch col-span-1"/>
                                        {/*<Button className="secondaryButton col-span-1 "*/}
                                        {/*        onClick={this.purchasePrinterOnclickHandler}>*/}
                                        {/*    харах*/}
                                        {/*</Button>*/}
                                    </div>
                                </div>
                        </div>
                        <div className="flex flex-col">
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
                                            <TableCell
                                                className="font-sans text-white font-semibold">Үйлдэлүүд</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.printersData.length > 0 ? (
                                            this.state.printersData.map((row: any) => (
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
                                                        className="font-sans text-[#8a91a5] ">{row.retailDeviceName}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.name}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.branchId}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">
                                                        <Switch defaultChecked={row.active} className="SelectedSwitch col-span-1">

                                                        </Switch>
                                                    </TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">
                                                        <Button
                                                            onClick={()=>this.deletePrinter(row.id)}
                                                        >Устгах</Button></TableCell>

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
                                            <TableCell className="font-sans text-white font-semibold">Үйлдэлүүд</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.printersSearchData.length > 0 ? (
                                            this.state.printersSearchData.map((row: any) => (
                                                <TableRow key={row.id}>
                                                    {/* <TableCell align="center">
                                  <IconButton className="w-8 h-8"
                                  // onClick={() => this.handleEditClick(row)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </TableCell> */}

                                                    <TableCell
                                                        className="font-sans  text-[#8a91a5] ">{row.id}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.retailDeviceName}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.name}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.branchId}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] ">{row.ownerName}</TableCell>
                                                    <TableCell
                                                        className="font-sans text-[#8a91a5] "><Button
                                                    >Устгах</Button></TableCell>
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
                                                        <TableCell><Skeleton variant="rounded" height={20}/></TableCell>
                                                    </TableRow>
                                                )}
                                            </>
                                        )}
                                    </TableBody>
                                </Table>)}

                                <Button className="bg-red text-white w-1/6 hover:" onClick={()=>this.openModal()}>

                                    Нэмэх</Button>
                                <DialogForSettings   open={this.state.modalOpen}
                                                     onClose={ this.closeModal}>

                                </DialogForSettings>

                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default PrinterSettings;