import React, {Component, useRef} from 'react';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Dialog,
    TextField,
    Switch,
    MenuItem,
    Select
} from "@mui/material";
import api from "@/src/api";
import Image from "next/image";

interface Props {
    open: boolean;
    onClose: any;
}


class DialogForSettings  extends Component<Props, PrinterRegisterState> {
    constructor(props: Props) {
        super(props);
        this.state = {
           printer:{
               id: "",
               name: "",
               ownerName: "",
               printType: 0,
               branchId: 1,
               branchName: "",
               ipAddress: "",
               active: false,
               cashierPrinter: false,
               retailDeviceName: "",
           },
            value:"",
            computerName: "",
            printerName: []
        };
    }

    componentDidMount() {
        this.getPrinterList();
        this.getComputerName();
    }

    close = () => {
        this.props.onClose();
    };

    handleItemTextFieldChange = (field: any, value: string | number | boolean) => {
        this.setState((prevState) => ({
            printer: {
                ...prevState.printer,
                [field]: value,
            },
        }));
    };

    handleFilterChange =(value : string)=>{
        this.setState({ value : value }) ;
        this.handleItemTextFieldChange("name", value);
    }

    getPrinterList = ()=>{
        api.getListOfPrinters.GetListOfPrinters().then( res =>{
            this.setState({ printerName: res.data.data.name });
        })
    }

    getComputerName =()=>{
        api.getComputerName.GetComputerName().then(res =>{

            this.setState({computerName: res.data.data});
            this.handleItemTextFieldChange("retailDeviceName" , this.state.computerName);
        })
    }

    updatePrinter = (printer: any) => {
        const result = api.insertDeviceSetting.InsertDeviceSettings(this.state.printer).then(res => {
           if (res.data.code == 200){
                this.close();
           }
        });
    }

    render() {

        const params: TextFieldCustomForPrinter[] = [
            { id: "1", paramName: "name", title: "НЭР" },
            { id: "2", paramName: "retailDeviceName", title: "ТӨХӨӨРӨМЖИЙН НЭР" },
            { id: "3", paramName: "printType", title: "ГАРАЛТЫН ТӨРӨЛ" },
            { id: "4", paramName: "branchId", title: "САЛБАРЫН ДУГААР" },
            { id: "5", paramName: "ipAddress", title: "IP ХАЯГ" },
            { id: "6", paramName: "active", title: "ТӨЛӨВ" },
            { id: "7", paramName: "cashierPrinter", title: "ПРИНТ ТӨРӨЛ" },
        ];

        return (
            <Dialog open={this.props.open}>
                <DialogTitle>ТӨХӨӨРӨМЖ НЭМЭХ</DialogTitle>
                <DialogContent>

                    <div className="h-full">
                        <div className="flex grid grid-cols-2">
                            <div className="flex flex-col col-span-1 gap-3">
                                {/*{*/}
                                {/*    params.map((value, index) => (*/}
                                {/*        <div key={index} className="w-full">*/}
                                {/*            <div className="text-left text-xs font-semibold pb-1 text-[#6d758f]">*/}
                                {/*                {value.title}*/}
                                {/*            </div>*/}
                                {/*            <TextField*/}
                                {/*                className="w-full"*/}
                                {/*                onChange={(e) =>*/}
                                {/*                    this.handleItemTextFieldChange(value.paramName, e.target.value)*/}
                                {/*                }*/}

                                {/*            />*/}
                                {/*        </div>*/}
                                {/*    ))*/}
                                {/*}*/}
                                <div className="w-full">
                                    <div className="text-left text-xs font-semibold pb-1 text-[#6d758f]">
                                        Принтер нэр
                                    </div>
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
                                        value={this.state.value}
                                        onChange={(event) => this.handleFilterChange(event.target.value as string)} >

                                        {this.state.printerName.length > 0 ? (
                                            this.state.printerName.map((row:any) =>(
                                                <MenuItem value={row}>{row}</MenuItem>
                                            ))
                                        ): <MenuItem value={"0"}>None</MenuItem>}
                                    </Select>
                                </div>
                                <div className="w-full">
                                    <div className="text-left text-xs font-semibold pb-1 text-[#6d758f]">
                                        Компьютер нэр
                                    </div>
                                    <TextField className="w-full" defaultValue={this.state.computerName} onChange={(e) =>this.handleItemTextFieldChange('retailDeviceName', e.target.value)}>

                                    </TextField>
                                </div>
                                <div className="w-full">
                                    <div className="text-left text-xs font-semibold pb-1 text-[#6d758f]">
                                        Төрөл
                                    </div>
                                    <TextField type="number" className="w-full" onChange={(e) =>this.handleItemTextFieldChange('printType', e.target.value)}>

                                    </TextField>
                                </div>
                                <div className="w-full">
                                    <div className="text-left text-xs font-semibold pb-1 text-[#6d758f]">
                                        Салбарын дугаар
                                    </div>
                                    <TextField type="number" className="w-full" onChange={(e) =>this.handleItemTextFieldChange('branchId', e.target.value)}>

                                    </TextField>
                                </div>
                                <div className="w-full">
                                    <div className="text-left text-xs font-semibold pb-1 text-[#6d758f]">
                                        IP Хаяг
                                    </div>
                                    <TextField className="w-full" onChange={(e) =>this.handleItemTextFieldChange('ipAddress', e.target.value)}>

                                    </TextField>
                                </div>
                                <div className="w-full">
                                    <div className="text-left text-xs font-semibold pb-1 text-[#6d758f]">
                                        Төлөв
                                    </div>
                                    <Switch className="w-full" value={this.state.printer.active} onChange={(e) =>this.handleItemTextFieldChange('active', !this.state.printer.active)}>

                                    </Switch>
                                </div>
                                <div className="w-full">
                                    <div className="text-left text-xs font-semibold pb-1 text-[#6d758f]">
                                        Принтерын төрөл
                                    </div>
                                    <Switch className="w-full" value={this.state.printer.active} onChange={(e) =>this.handleItemTextFieldChange( 'cashierPrinter', !this.state.printer.cashierPrinter)}>

                                    </Switch>
                                </div>

                                <Button className="bg-black text-white w-1/2 hover:" onClick={(e) =>this.updatePrinter(this.state.printer)}>ХАДГАЛАХ</Button>
                                <Button className="bg-black text-white w-1/2 hover:" onClick={this.close}>ХААХ</Button>
                            </div>
                            <div className="flex flex-col col-span-1 gap-3">
                            </div>
                        </div>
                    </div>

                </DialogContent>

                {/*<Button onClick={this.}>Илгээх</Button>*/}
                {/*<DialogActions>*/}
                {/*    <Button onClick={this.close}>Хаах</Button>*/}
                {/*</DialogActions>*/}
            </Dialog>
        );
    }

}

export default DialogForSettings;