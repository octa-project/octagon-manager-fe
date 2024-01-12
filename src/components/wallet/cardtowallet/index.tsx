import React, {Component, SyntheticEvent} from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import styles from "@/src/components/wallet/wallet.module.css";
import api from "@/src/api";
import SnackBar from "@/src/components/tools/snackAlert";

interface Card {
    card_bank_id: number;
    card_bank_name: string;
    card_number: any;
    is_active: any;
}

interface Props {
    open: boolean;
    onClose: any;
    phoneNum: any;
    data: Card[]
}

class CardToWallet extends Component<Props> {

    constructor(props: Props) {
        super(props);
        this.state = {
            amount: 0,
        };
    }

    amount: string | undefined
    desc: string | undefined
    cardId: string | undefined
    selected: string | undefined


    close = () => {
        this.props.onClose();
    };

    onSelected = () => {
        this.props.onClose();
    };


    sendCardToWallet = async () => {
        try {
            console.log(this.amount)
            console.log(this.cardId)
            console.log(this.props.phoneNum)
            const body = {
                card_id: "20",
                phone_number: this.props.phoneNum,
                amount: this.amount
            }
            await api.cardToWalletTransaction.cardToWalletTransaction(body).then(res => {
                console.log(res.data)
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
        // @ts-ignore
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Картаар хэтэвч цэнэглэх</DialogTitle>
                <DialogContent>
                        {this.props.data.map((data) => (
                            <div>
                                <Button onClick={()=>this.onSelected()} className="mb-3 bg-white shadow rounded-2xl border-solid border-2 border-indigo-600 text-center  w-80">
                                    <div>
                                        <p className=" font-bold"> {data.card_number} -  {data.card_bank_name}</p>
                                    </div>
                                </Button>
                            </div>
                        ))}
                    <div>
                        <div className="flex items-center justify-center m-2">
                            <TextField
                                id="outlined-password-input"
                                label="Дүн"
                                type="number"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    this.setState({amount: event.target.value})
                                    this.amount = event.target.value
                                }}
                            />
                        </div>
                        {/*            <div className= "flex items-center justify-center">
                            <TextField
                                id="outlined-password-input"
                                label="Гүйлгээний утга"
                                type="text"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    this.setState({amount:event.target.value})
                                    this.desc = event.target.value
                                }}
                            /></div>*/}

                    </div>

                </DialogContent>

                <Button onClick={this.sendCardToWallet}>Илгээх</Button>
                <DialogActions>
                    <Button onClick={this.close}>Хаах</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default CardToWallet;
