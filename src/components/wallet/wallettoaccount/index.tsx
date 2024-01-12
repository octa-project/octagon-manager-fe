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

class WalletToAccount extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    amount: string | undefined
    account: string | undefined
    desc: string | undefined
    handleClose = (event: SyntheticEvent<Element, Event>, reason: string) => {
        if (reason === 'backdropClick')
            return
    };
    close = () => {
        this.props.onClose();
    };
    sendWalletToBank = async () => {
        try {
            console.log(this.amount)
            console.log(this.account)
            console.log(this.props.phoneNum)
            console.log(this.desc)
            const body = {
                account: this.account,
                account_name: "M bank",
                bank_id: "991000",
                phone_number: this.props.phoneNum,
                amount: this.amount,
                description: this.desc
            }
            await api.walletToAccountTransaction.walletToAccountTransaction(body).then(res => {
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


    render() {
        return (
            <Dialog onClose={this.handleClose} open={this.props.open}>
                <DialogTitle>Хувийн дансруу зарлага хийх</DialogTitle>
                <DialogContent>
                    <div className="flex">
                        <button  className={styles.btn}>
                            <img className='rounded-lg flex items-center'
                                 src="/img/golomt.png"
                                 width="200"
                                 alt="Credit Scoring"></img>
                            <p className="font-light">Голомт банк</p>
                        </button>
                        <button className={styles.btn}>
                            <img className='rounded-lg flex items-center'
                                 src="/img/khan.png"
                                 width="200"
                                 alt="Credit Scoring"></img>
                            <p className="font-light">Хаан банк</p>
                        </button>
                        <button className={styles.btn}>
                            <img className='rounded-lg flex items-center'
                                 src="/img/mbank.png"
                                 width="200"
                                 alt="Credit Scoring"></img>
                            <p className="font-light">М банк</p>
                        </button>
                        <button className={styles.btn}>
                            <img className='rounded-lg flex items-center'
                                 src="/img/tdb.png"
                                 width="200"
                                 alt="Credit Scoring"></img>
                            <p className="font-light">Худалдаа хөгжлийн банк </p>
                        </button>
                    </div>
                    <div className="mt-16">
                        <div className="flex items-center justify-center m-2">
                            <TextField
                                id="outlined-password-input"
                                label="Дансны дугаар"
                                type="number"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    this.account = event.target.value
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-center m-2">
                            <TextField
                                id="outlined-password-input"
                                label="Дансны нэр"
                                type="text"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    //this.amount = event.target.value
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
                                    this.setState({amount: event.target.value})
                                    this.desc = event.target.value
                                }}
                            />
                        </div>
                    </div>


                </DialogContent>


                <Button onClick={this.sendWalletToBank}>Гүйлгээ хийх</Button>
                <DialogActions>
                    <Button onClick={this.close}>Хаах</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default WalletToAccount;
