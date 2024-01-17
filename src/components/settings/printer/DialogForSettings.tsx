import React, {Component, useRef} from 'react';
import {Button, DialogActions, DialogContent, DialogTitle, Dialog,TextField} from "@mui/material";
import api from "@/src/api";

interface Props {
    open: boolean;
    onClose: any;
}


class DialogForSettings  extends Component<Props, PrinterState> {
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
               isActive: false,
               cashierPrinter: true,
               retailDeviceName: "",
           }
        };
    }

    close = () => {
        this.props.onClose();
    };

    handleItemTextFieldChange = (field: keyof Printer, value: string | number) => {
        this.setState((prevState) => ({
            printer: {
                ...prevState.printer,
                [field]: value,
            },
        }));
    };

    updatePrinter = (printer: any) => {
        const result = api.insertDeviceSetting.InsertDeviceSettings(this.state.printer).then(res => {
           if (res.data.code == 200){

           }
        });
    }

    render() {

        const params: TextFieldCustomForPrinter[] = [
            { id: "1", paramName: "name", title: "НЭР" },
            { id: "2", paramName: "retailDeviceName", title: "Төхөөрөмжийн нэр" },
            { id: "3", paramName: "printType", title: "ГАРАЛТЫН ТӨРӨЛ" },
            { id: "4", paramName: "branchId", title: "САЛБАРЫН ДУГААР" },
            { id: "5", paramName: "ipAddress", title: "IP ХАЯГ" },
            { id: "6", paramName: "isActive", title: "ТӨЛӨВ" },
            { id: "7", paramName: "cashierPrinter", title: "ПРИНТ ТӨРӨЛ" },
        ];

        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Картаар хэтэвч цэнэглэх</DialogTitle>
                <DialogContent>

                    <div className="h-full">
                        <div className="flex grid grid-cols-2">
                            <div className="flex flex-col col-span-1 gap-3">
                                {
                                    params.map((value, index) => (
                                        <div key={index} className="w-full">
                                            <div className="text-left text-xs font-semibold pb-1 text-[#6d758f]">
                                                {value.title}
                                            </div>
                                            <TextField
                                                className="w-full"
                                                onChange={(e) =>
                                                    this.handleItemTextFieldChange(value.paramName, e.target.value)
                                                }

                                            />
                                        </div>
                                    ))
                                }
                                <Button className="bg-black text-white w-1/6 hover:" onClick={(e) =>this.updatePrinter(this.state.printer)}>ХАДГАЛАХ</Button>
                                <Button className="bg-black text-white w-1/6 hover:" onClick={this.close}>ХААХ</Button>
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