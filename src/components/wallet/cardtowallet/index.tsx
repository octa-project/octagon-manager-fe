import React, {Component, SyntheticEvent} from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import styles from "@/src/components/wallet/wallet.module.css";
import api from "@/src/api";
import SnackBar from "@/src/components/tools/snackAlert";
import Grid from "@mui/system/Unstable_Grid";
import Carousel from "react-material-ui-carousel";
import {CarouselItem} from "react-material-ui-carousel/dist/components/CarouselItem";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

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
        return ( this.props.open &&
            <>
                <Grid container spacing={3} justifyContent={"center"}>
                    <Grid xs={12}>
                        <Typography variant={"h5"} textAlign={"center"}>
                            Картаар хэтэвч цэнэглэх
                        </Typography>
                    </Grid>
                        <Grid xs={12} display={"flex"} justifyContent={"flex-end"}>
                            <IconButton size={"small"} color={"primary"} onClick={this.props.onClose}>
                                <CloseIcon/>
                            </IconButton>
                        </Grid>
                        <Grid xs={6}>
                            <Carousel swipe navButtonsAlwaysVisible={true} animation={"slide"} autoPlay={false}>
                                {this.props.data.map((data) => (
                                    <div
                                        className={`mb-2 bg-white shadow-5 shadow-black rounded-2xl text-center left-0 w-full`}>
                                        <div
                                            className={"absolute left-[50%] top-[20%] -translate-x-[50%] -translate-y-[50%] rounded bg-opacity-50 bg-black-2 text-white p-1.5"}>
                                            <p className="font-normal text-lg"> {data.card_number}</p>
                                            {/*<p> {data.card_bank_name}</p>*/}
                                        </div>
                                        <img src={"/creditCards/card1.png"} alt={"card"}
                                             className={"w-full pointer-events-none rounded"}/>
                                    </div>
                                ))}
                            </Carousel>
                        </Grid>
                        <Grid xs={12}/>
                        <Grid xs={12} md={3}>
                            <div className="flex items-center justify-center m-2">
                                <TextField

                                    id="outlined-password-input"
                                    label="Дүн"
                                    type="number"
                                    size={"small"}
                                    fullWidth
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        this.setState({amount: event.target.value})
                                        this.amount = event.target.value
                                    }}
                                />
                            </div>
                            <div className="flex items-center justify-center m-2">
                                <Button variant={"contained"} color={"primary"} size={"small"} fullWidth onClick={this.sendCardToWallet} className={"mt-3"}>Илгээх</Button>
                            </div>
                        </Grid>
                    </Grid>
            </>
        );
    }
}

export default CardToWallet;
