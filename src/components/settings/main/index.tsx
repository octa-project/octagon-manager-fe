import {Component} from "react";
import {Input} from "antd";
import * as React from "react";
import {ToggleButton} from "@mui/lab";
import {Button} from "@mui/material";

interface MainSettingsModel {

    id: number,
    taxNumber: string,
    name: string,
    isActive: boolean,
    isDeleted: boolean,
    branchId: number,

}

class MainSettings extends Component<{}, AgReportState>{
    render() {
        const containerStyle = { width: '100%', height: '100%' };
        return(

            <div className="h-full">

                    <div style={containerStyle}>
                        <div className="w-full">
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 "
                                placeholder="Татвар төлөгчийн дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full">
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 "
                                placeholder="Нэр"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 "
                                placeholder="Салбарын дугаар"
                                // onChange={(e) =>
                                //     this.handleTextSearch(e.target.value)
                                // }
                            />
                        </div>

                        <div className="w-full mt-2 flex flex-row">
                            <div className="capitalize text-[#6d758f]">Идвэхтэй</div>
                            <div className="ml-2"><ToggleButton  value={false} ></ToggleButton></div>
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

export default MainSettings;
