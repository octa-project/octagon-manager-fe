import { Button, Card } from "@mui/material";
import { Component } from "react";
import useState from 'react';

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
                                <div className="grid grid-cols-3 gap-5">
                                    <div className="col-span-2">
                                            aaaaa
                                    </div>
                                    <div>
                                            aaaaaaaaaaa
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div >
                            <Card className="p-4">
                                aaa2
                            </Card>
                        </div>
                    </div>

                </div>
                <div>

                </div>
            </div>
        )
    }
}

export default DashboardController;