import * as React from "react";
import {Component} from "react";
import {Input} from "antd";
import {ToggleButton} from "@mui/lab";
import {Button} from "@mui/material";
import api from "@/src/api";
import SnackBar from "@/src/components/tools/snackAlert";

interface mainSettings {

    id: number,
    taxNumber: string,
    name: string,
    isActive: boolean,
    isDeleted: boolean,
    branchId: number,

}

interface ItemState {
    mainSettings: mainSettings;
}

class MainSettings extends Component<{}, ItemState> {

    constructor(props: any) {
        super(props);

        this.state = {
            mainSettings: {
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

    handleItemTextFieldChange = (field: keyof mainSettings, value: string | number) => {
        this.setState((prevState) => ({
            mainSettings: {
                ...prevState.mainSettings,
                [field]: value,
            },
        }));
    };

    saveItems = async (mainSetting: mainSettings) => {
        const result = await api.updateMainSetting.UpdateMainSettings(mainSetting);
        if (result.data.code == 200) {
            SnackBar.success("Амжилттай хадгаллаа");
            this.getItems();
        }
    }


    getItems = async () => {
        try {
            const result = await api.getMainSetting.GetMainSettings("1").then(res => {


                const mainSettings = res.data.data;


                this.setState({mainSettings})
                console.log(this.state.mainSettings.taxNumber)
            });

            // if (result.data.code === "200") {
            //
            //     const mainSettings = result.data.data.map((mainSettings: {
            //             createdDate: any,
            //             lastModifiedDate: any,
            //             createdBy: any,
            //             lastModifiedBy: any,
            //             id: any,
            //             taxNumber: any,
            //             name: any,
            //             createdUserId: any,
            //             branchId: any,
            //             modifiedDate: any,
            //             active: any,
            //             deleted: any
            //         }) => ({
            //             createdDate: mainSettings.createdDate,
            //             lastModifiedDate: mainSettings.lastModifiedDate,
            //             createdBy: mainSettings.createdBy,
            //             lastModifiedBy: mainSettings.lastModifiedBy,
            //             id: mainSettings.id,
            //             taxNumber: mainSettings.taxNumber,
            //             name: mainSettings.name,
            //             createdUserId: mainSettings.createdUserId,
            //             branchId: mainSettings.branchId,
            //             modifiedDate: mainSettings.modifiedDate,
            //             active: mainSettings.active,
            //             deleted: mainSettings.deleted
            //         })
            //     );

            // console.log(mainSettings)


            // }
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const containerStyle = {width: '100%', height: '100%'};
        const {
            mainSettings
        } = this.state;

        return (

            <div className="h-full">

                <div style={containerStyle}>
                    <div className="w-full">

                        <Input
                            className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 "
                            placeholder="Татвар төлөгчийн дугаар"
                            value={this.state.mainSettings.taxNumber}
                            onChange={(e) => this.handleItemTextFieldChange("taxNumber", e.target.value)}
                        />


                    </div>

                    <div className="w-full">
                        <Input
                            className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 "
                            placeholder="Нэр"
                            value={this.state.mainSettings.name}
                            onChange={(e) => this.handleItemTextFieldChange("name", e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <Input
                            className="capitalize text-[#6d758f] w-1/4 h-full rounded-2xl border-2 pl-3 pr-8 mt-2 "
                            placeholder="Салбарын дугаар"
                            onChange={(e) => this.handleItemTextFieldChange("branchId", e.target.value)}
                            value={this.state.mainSettings.branchId}
                        />
                    </div>

                    <div className="w-full mt-2 flex flex-row">
                        <div className="capitalize text-[#6d758f]">Идвэхтэй</div>
                        <div className="ml-2"><ToggleButton value={this.state.mainSettings.isActive}></ToggleButton>
                        </div>
                    </div>
                    <div className="w-full mt-2 flex flex-row mr-2">
                        <Button className="bg-gray-200 border-2">Delete</Button>
                        <Button className="bg-[#6d758f] text-white ml-2"
                                onClick={() => this.saveItems(mainSettings)}>Save</Button>
                    </div>


                </div>
            </div>
        );
    }


}

export default MainSettings;
