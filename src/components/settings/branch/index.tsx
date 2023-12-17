import {Component} from "react";
import {Input} from "antd";
import {Button} from "@mui/material";
import * as React from "react";

class BranchSettings extends Component<{}, AgReportState>{
    render() {
        const containerStyle = { width: '100%', height: '100%' };
        return(

            <div className="h-full">

                <div style={containerStyle}>

                    <div >
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
                            <div className="capitalize text-[#6d758f] mt-2">merchant id</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2"
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">tax number</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2"
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">phone</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2"
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">email</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2"
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">address</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2"
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>
                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">longitude</div>
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 ml-2"
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f] mt-2">latitude</div>
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

export default BranchSettings;