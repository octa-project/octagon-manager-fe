import {Component} from "react";
import {Button} from "@mui/material";
import * as React from "react";
import {Input} from "antd";
import api from "@/src/api";
import SnackBar from "@/src/components/tools/snackAlert";

interface deviceSettings {

    id: number,
    name: string,
    portName: string,
    portType: number,
    paperType: number,
    FooterText: string,
    ipAddress: string,
    leftMargin: number,
    isActive: boolean,
    isDeleted: boolean,
    branchId: number,

}

interface ItemState {
    deviceSettings: deviceSettings;
}

class DeviceSettings extends Component<{}, ItemState> {

    constructor(props: any) {
        super(props);

        this.state = {
            deviceSettings: {
                id: 1,
                name: "",
                portName: "",
                portType: 0,
                paperType: 0,
                FooterText: "",
                ipAddress: "",
                leftMargin: 0,
                isActive: true,
                isDeleted: false,
                branchId: 0,
            }
        }
    }

    componentDidMount() {

        this.getItems();

    }

    saveItems = async (deviceSettings: deviceSettings) => {
        const result = await api.updateDeviceSetting.UpdateDeviceSettings(deviceSettings);
        if (result.data.code == 200) {
            SnackBar.success("Амжилттай хадгаллаа");
            this.getItems();
        }
    }

    getItems = async () => {
        try {
            const result = await api.getDeviceSetting.GetDeviceSettings("1").then(res => {
                const deviceSettings = res.data.data;
                this.setState({deviceSettings})
            });

        console.log()
        } catch (error) {
            console.error(error);
        }
    }

    handleItemTextFieldChange = (field: keyof deviceSettings, value: string | number) => {
        this.setState((prevState) => ({
            deviceSettings: {
                ...prevState.deviceSettings,
                [field]: value,
            },
        }));
    };

    render() {

        const containerStyle = {width: '100%', height: '100%'};
        const {
            deviceSettings
        } = this.state;
        return (


            <div className="h-full">

                <div style={containerStyle}>
                    <div>
                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">ip address</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-4"
                                placeholder="ip address"
                                value={this.state.deviceSettings.ipAddress}
                                onChange={(e) => this.handleItemTextFieldChange("ipAddress", e.target.value)}
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">name</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-12"
                                placeholder="name"
                                value={this.state.deviceSettings.name}
                                onChange={(e) => this.handleItemTextFieldChange("name", e.target.value)}
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">paper type</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-3"
                                placeholder="paper type"
                                value={this.state.deviceSettings.paperType}
                                onChange={(e) => this.handleItemTextFieldChange("paperType", e.target.value)}
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">port name</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-4"
                                placeholder="portName"
                                value={this.state.deviceSettings.portName}
                                onChange={(e) => this.handleItemTextFieldChange("portName", e.target.value)}
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">port type</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-6"
                                placeholder="portType"
                                value={this.state.deviceSettings.portType}
                                onChange={(e) => this.handleItemTextFieldChange("portType", e.target.value)}
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">branch id</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-6"
                                placeholder="branchId"
                                value={this.state.deviceSettings.branchId}
                                onChange={(e) => this.handleItemTextFieldChange("branchId", e.target.value)}
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>
                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">left margin</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2"
                                placeholder="leftMargin"
                                value={this.state.deviceSettings.leftMargin}
                                onChange={(e) => this.handleItemTextFieldChange("leftMargin", e.target.value)}
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                    </div>
                    <div className="w-full mt-2 flex flex-row">
                        <Button className="bg-white border-2">Delete</Button>
                        <Button className="bg-[#6d758f] text-white ml-2" onClick={() => this.saveItems(deviceSettings)}>Save</Button>
                    </div>
                </div>


            </div>
        );
    }


}

export default DeviceSettings;