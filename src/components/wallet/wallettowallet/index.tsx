import React, {Component, SyntheticEvent} from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import styles from "@/src/components/wallet/wallet.module.css";
import api from "@/src/api";
import SnackBar from "@/src/components/tools/snackAlert";

interface Props {
    open: boolean;
    onClose: any;
    phoneNum: any;
}

class WalletToWallet extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }
    amount: string | undefined
    sendPhoneNum: string | undefined
    desc: string | undefined

    sendWalletToWallet = async () => {
        try {
            const body = {
                sender_phone: this.sendPhoneNum,
                receiver_phone: this.props.phoneNum,
                amount: this.amount,
                description: this.desc
            }
            await api.walletToWalletTransaction.walletToWalletTransaction(body).then(res => {
                if (res.status == 200 && res.data.isSuccess) {
                    SnackBar.success("Амжилттай илгээлээ");
                } else {
                    SnackBar.error("Амжилтгүй");
                }
            });

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    };

    close = () => {
        this.props.onClose();
    };


    render() {
        return (
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
        );
    }
}

export default WalletToWallet;
