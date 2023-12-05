import { Button, Card } from "@mui/material";
import { Component } from "react";
import useState from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

class DashboardController extends Component {

    state = {

    }

    render() {
        return (
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <Card className="p-4">
                                <div className="grid grid-cols-4 gap-5">
                                    <div className="col-span-3 ">
                                        Ашиг
                                    </div>
                                    <div>
                                        <AttachMoneyIcon />
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div>
                            <Card className="p-4">
                                <div className="grid grid-cols-4 gap-5">
                                    <div className="col-span-3 ">
                                        aaa

                                    </div>
                                    <div>
                                        <AttachMoneyIcon />
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <Card className="p-4">
                            <div className="grid grid-cols-4 gap-5">
                                <div className="col-span-3 ">
                                    Ашиг

                                </div>
                                <div>
                                    <AttachMoneyIcon />
                                </div>
                            </div>
                        </Card>
                        <Card className="p-4">
                            <div className="grid grid-cols-4 gap-5">
                                <div className="col-span-3 ">
                                    Ашиг

                                </div>
                                <div>
                                    <AttachMoneyIcon />
                                </div>
                            </div>
                        </Card>

                    </div>
                    <Card>
                        aa
                    </Card>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

export default DashboardController;