import React, {Component} from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {Button, CircularProgress, IconButton, TextField, Typography} from "@mui/material";
import api from "@/src/api";
import SnackBar from "@/src/components/tools/snackAlert";
import Grid from "@mui/system/Unstable_Grid";
import Carousel from "react-material-ui-carousel";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Loader from "@/src/components/common/Loader";
import {values} from "ag-grid-community/dist/lib/utils/generic";

interface Card {
    card_id: any
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
            loading: false
        };
    }

    amount: string | undefined
    cardId: number | undefined

    sendCardToWallet = async () => {
        try {
            const body = {
                card_id: this.cardId,
                phone_number: this.props.phoneNum,
                amount: this.amount
            }
            this.setState({loading: true})
            await api.cardToWalletTransaction.cardToWalletTransaction(body).then(res => {
                if (res.status == 200 && res.data.isSuccess) {
                    SnackBar.success("Амжилттай илгээлээ")
                    this.props.onClose
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

    handleCarouselChange = (index) => {
        this.cardId = this.props.data[index].card_id;
    };

    render() {
        // @ts-ignore
        return (this.props.open &&
            <>{this.state.loading ? (
                <Loader/>
            ) : (
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
                        <Carousel autoPlay={false} navButtonsAlwaysVisible={true} animation={"slide"}
                                  onChange={this.handleCarouselChange}>
                            {this.props.data.map((data) => (
                                <div
                                    className={`mb-2 bg-white shadow-5 shadow-black rounded-2xl text-center left-0 w-full`}>
                                    <div
                                        className={"absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] rounded bg-opacity-50 bg-black-2 text-white p-1.5"}>
                                        <p className="font-normal text-3xl"> {data.card_number}</p>
                                        {/*<p> {data.card_bank_name}</p>*/}
                                    </div>
                                    <img src={"/creditCards/mbankcard.png"} alt={"card"}
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
                            <Button variant={"contained"} color={"primary"} size={"small"} fullWidth
                                    onClick={this.sendCardToWallet} className={"mt-3"}>Илгээх</Button>
                        </div>
                    </Grid>
                </Grid>
            )}
            </>
        );
    }
}

export default CardToWallet;
