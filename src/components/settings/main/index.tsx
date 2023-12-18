import {Component} from "react";
import {Input} from "antd";
import * as React from "react";
import {ToggleButton} from "@mui/lab";
import {Button, MenuItem} from "@mui/material";
import api from "@/src/api";
import settings from "@/src/components/settings";
import {any} from "prop-types";

interface mainSettings {

    id: number,
    taxNumber: string,
    name: string,
    isActive: boolean,
    isDeleted: boolean,
    branchId: number,

}

interface ItemState{
    mainSettings: mainSettings;
}

class MainSettings extends Component<{}, ItemState>{

    constructor(props: any) {
        super(props);

        this.state = {
           mainSettings : {
               id: 1,
               taxNumber: "",
               name: "",
               isActive: true,
               isDeleted: false,
               branchId: 1,
           }
        }
    }
    componentDidMount() {
        this.getItems();
    }

    getItems = async () => {
        try {
            const result = await api.getMainSetting.GetMainSettings("1");
            if (result.data.code === "200") {

              const mainSettings = result.data.data.map((mainSettings: {
                  createdDate:any,
                  lastModifiedDate:any,
                  createdBy:any,
                  lastModifiedBy:any,
                  id:any,
                  taxNumber:any,
                  name:any,
                  createdUserId:any,
                  branchId:any,
                  modifiedDate:any,
                  active:any,
                  deleted:any
              }) => ({
                  createdDate:mainSettings.createdDate,
                  lastModifiedDate:mainSettings.lastModifiedDate,
                  createdBy:mainSettings.createdBy,
                  lastModifiedBy:mainSettings.lastModifiedBy,
                  id:mainSettings.id,
                  taxNumber:mainSettings.taxNumber,
                  name:mainSettings.name,
                  createdUserId:mainSettings.createdUserId,
                  branchId:mainSettings.branchId,
                  modifiedDate:mainSettings.modifiedDate,
                  active:mainSettings.active,
                  deleted:mainSettings.deleted
                  })
                );
                this.setState({mainSettings})

            }
        }
        catch (error){
            console.error(error);
        }
    }

    render() {
        const containerStyle = { width: '100%', height: '100%' };



        return (

            <div className="h-full">

                    <div style={containerStyle}>
                        <div className="w-full">

                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 "
                                placeholder="Татвар төлөгчийн дугаар"
                                defaultValue = {this.state.mainSettings.taxNumber}
                            />


                        </div>

                        <div className="w-full">
                            <Input
                                className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 "
                                placeholder="Нэр"
                                defaultValue = {this.state.mainSettings.taxNumber}
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
                            <div className="ml-2"><ToggleButton  value={this.state.mainSettings.isActive} ></ToggleButton></div>
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
