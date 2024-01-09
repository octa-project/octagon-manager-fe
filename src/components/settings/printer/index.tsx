import { Button, Card, Switch } from "@mui/material";
import { Component } from "react";


class PrinterSettings extends Component<{}, settingsPrinterState>{

    constructor(props: any) {
        super(props);
        this.state = {
            first: false,
            open: false,
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
            printersSearchData: []
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

    render() {
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
                                        <Switch defaultChecked className="SelectedSwitch col-span-1" />
                                        <Button className="secondaryButton col-span-1">
                                            харах
                                        </Button>
                                    </div>
                                    <div className="flex flex-row grid grid-cols-3">
                                        <div className="NormalText col-span-1">
                                            Захилагын принтер
                                        </div>
                                        <Switch defaultChecked className="SelectedSwitch col-span-1" />
                                        <Button className="secondaryButton col-span-1">
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

                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default PrinterSettings;