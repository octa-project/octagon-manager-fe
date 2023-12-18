'use client'
import {Component} from "react";
import {Button} from "@mui/material";
import * as React from "react";
import {Input} from "antd";
import api from "@/src/api";

interface DeviceSettingsModel {

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


class DeviceSettings extends Component<{}, AgReportState> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {

        this.getItems();

    }

    getItems = async () => {
        try {
            const result = await api.getDeviceSetting.GetDeviceSettings("1");
            if (result.data.code === "200") {

                result.data.data.map((device: any) => {
                    const {
                        id,
                        name,
                        portName,
                        portType,
                        paperType,
                        FooterText,
                        ipAddress,
                        leftMargin,
                        isActive,
                        isDeleted,
                        branchId
                    } = device;

                    return {
                        id,
                        name,
                        portName,
                        portType,
                        paperType,
                        FooterText,
                        ipAddress,
                        leftMargin,
                        isActive,
                        isDeleted,
                        branchId
                    }
                });

            }
        }
        catch (error){
            console.error(error);
        }
    }
    async render() {

        const containerStyle = {width: '100%', height: '100%'};


        return (

            <div className="h-full">

                <div style={containerStyle}>
                    <div>
                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">ip address</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2 ml-2"
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">name</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2"
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">paper type</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2"
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">port name</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2"
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">port type</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2"
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">branch id</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2"
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>
                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">left margin</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2"
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                    </div>
                    <div className="w-full mt-2 flex flex-row">
                        <Button className="bg-white border-2">Delete</Button>
                        <Button className="bg-[#6d758f] text-white ml-2">Save</Button>
                    </div>
                </div>


            </div>
        );
    }


}

export default DeviceSettings;