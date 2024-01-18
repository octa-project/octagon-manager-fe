import React, {Component, SyntheticEvent} from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import styles from "@/src/components/wallet/wallet.module.css";
import api from "@/src/api";
import SnackBar from "@/src/components/tools/snackAlert";
import Loader from "@/src/components/common/Loader";

interface Props {
    open: boolean;
    onClose: any;
    phoneNum: any;
}

class WalletToWallet extends Component<Props> {

    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    amount: string | undefined
    sendPhoneNum: string | undefined
    desc: string | undefined
    sendWalletToWallet = async () => {
        try {
            this.setState({loading: true})
            const body = {
                sender_phone: this.props.phoneNum,
                receiver_phone: this.sendPhoneNum,
                amount: this.amount,
                description: this.desc
            }
            await api.walletToWalletTransaction.walletToWalletTransaction(body).then(res => {
                if (res.status == 200 && res.data.isSuccess) {
                    SnackBar.success("Амжилттай илгээлээ");
                    this.setState({loading: false})
                } else {
                    SnackBar.error("Амжилтгүй алдаа гарлаа");
                    this.setState({loading: false})
                }
            });

        } catch (error) {
            console.error("Error fetching data:", error);
            SnackBar.error("Амжилтгүй алдаа гарлаа");
            this.setState({loading: false})
        } finally {
        }
    };

    close = () => {
        this.props.onClose();
    };

    render() {
        return (
            <div>
                {this.state.loading ? (
                    <Loader/>
                ) : (
                    <Dialog onClose={this.close} open={this.props.open}>
                        <DialogTitle>Салбар хооронд</DialogTitle>
                        <DialogContent>
                            <div className="m-2">
                                <div className="flex items-center justify-center m-2">
                                    <TextField
                                        id="outlined-password-input"
                                        label="Утасны дугаар"
                                        type="number"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            this.sendPhoneNum = event.target.value
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-center m-2">
                                    <TextField
                                        id="outlined-password-input"
                                        label="Гүйлгээний дүн"
                                        type="number"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            this.amount = event.target.value
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-center m-2">
                                    <TextField
                                        id="outlined-password-input"
                                        label="Гүйлгээ утга"
                                        type="text"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            this.desc = event.target.value
                                        }}
                                    />
                                </div>
                            </div>
                        </DialogContent>

                        <Button onClick={this.sendWalletToWallet}>Гүйлгээ хийх</Button>
                        <DialogActions>
                            <Button onClick={this.close}>Хаах</Button>
                        </DialogActions>
                    </Dialog>
                )}
            </div>
        );
    }
}

export default WalletToWallet;
