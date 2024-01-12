import { Component } from "react";
import { Input, Button } from "antd";
import * as React from "react";
import { ToggleButton } from "@mui/lab";
import { MenuItem, TextField } from "@mui/material";
import api from "@/src/api";
import settings from "@/src/components/settings";
import { any } from "prop-types";
import Item from "antd/es/list/Item";
import SnackBar from "@/src/components/tools/snackAlert";



class MainSettingsController extends Component<{}, MainSettingState> {

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
                contractNumber: "",
                city: "",
                address: "",
                phone: ""
            }
        }
    }

    first: boolean = false;
    componentDidMount() {
        if (this.first) return;
        this.first = true;
        this.getSettings();
    }

    handleItemTextFieldChange = (field: keyof MainSettings, value: string | number) => {
        this.setState((prevState) => ({
            mainSettings: {
                ...prevState.mainSettings,
                [field]: value,
            },
        }));
    };

    saveUpdateSettings = async (value: MainSettings) => {
        try {
            const result = await api.updateMainSetting.UpdateMainSettings(value);
            if (result.data.code == 200) {
                SnackBar.success("Амжилттай хадгаллаа");
                this.getSettings();
            }
        } catch (error) {
            SnackBar.warning("Алдаа : " + error);
        }

    }

    getSettings = async () => {
        try {
            const result = await await api.getMainSetting.GetMainSettings("1");
            if (result.data.code == 200) {
                this.setState({ mainSettings: result.data.data })
            }
        } catch (error) {
            SnackBar.warning("Алдаа : " + error);
        }
    }

    render() {
        const {
            mainSettings
        } = this.state;

        const params: TextFieldCustom[] = [
            { id: "1", paramName: "name", title: "НЭР" },
            { id: "2", paramName: "taxNumber", title: "ТАТВАР ТӨЛӨГЧИЙН ДУГААР" },
            { id: "3", paramName: "contractNumber", title: "ГЭРЭЭНИЙ ДУГААР" },
            { id: "4", paramName: "city", title: "ХОТ, АЙМАГ" },
            { id: "5", paramName: "address", title: "ХАЯГ" },
            { id: "6", paramName: "phone", title: "УТАС" },
        ];


        return (

            <div className="h-full">
                <div className="flex grid grid-cols-2">
                    <div className="flex flex-col col-span-1 gap-3">
                        {
                            params.map((value, index) => (
                                <div key={index} className="w-3/6">
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
                        <Button className="bg-black text-white w-1/6 hover:">ХАДГАЛАХ</Button>
                    </div>
                    <div className="flex flex-col col-span-1 gap-3">
                    </div>
                </div>

            </div>
        );
    }


}

export default MainSettingsController;
