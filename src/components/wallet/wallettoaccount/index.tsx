import React, {Component} from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {Button, IconButton, TextField, Typography} from "@mui/material";
import api from "@/src/api";
import SnackBar from "@/src/components/tools/snackAlert";
import Grid from "@mui/system/Unstable_Grid";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import style from "../wallet.module.css";
import {classesList} from "ag-grid-react/lib/reactUi/utils";
import Carousel from "react-material-ui-carousel";

interface Props {
    open: boolean;
    onClose: any;
    phoneNum: any;
}

class WalletToAccount extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state={
            selectedItem:null
        }
    }

    getBankList = () => {
        return [
            [
                {id:1, src:"/img/golomt.png"},
                {id:2, src:"/img/khan.png"},
                {id:3, src:"/img/mbank.png"},
            ],
            [
                {id:4, src:"/img/tdb.png"}
                ]
        ]
    }

    amount: string | undefined
    account: string | undefined
    desc: string | undefined

    setSelectedItem = (id: number) => this.setState({selectedItem:id})
    sendWalletToBank = async () => {
        try {
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
        const {selectedItem}:any = this.state
        const {setSelectedItem} = this
        return (
        this.props.open &&
        <>
            <Grid container spacing={3} justifyContent={"center"}>
                <Grid xs={12} display={"flex"} justifyContent={"flex-end"}>
                    <IconButton size={"small"} color={"primary"} onClick={this.props.onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Grid xs={12}>
                    <Typography variant={"h5"} textAlign={"center"}>
                        Хувийн данс руу зарлага хийх
                    </Typography>
                </Grid>
                <Grid xs={12} md={6}>
                    <Carousel swipe navButtonsAlwaysVisible={true} animation={"slide"} autoPlay={false}>

                            {
                                this.getBankList().map(e=> {
                                    return <div className={"flex justify-center"}>
                                        {e.map(x => <button
                                            className={classesList(style.bankIcon, (x.id == selectedItem ? style.selected : ""))}
                                            onClick={() => setSelectedItem(x.id)}>
                                            <img className='flex items-center'
                                                 src={x.src}
                                                 alt="Credit Scoring"/>
                                        </button>)}
                                    </div>

                                })
                            }
                    </Carousel>
                </Grid>
                <Grid xs={12} md={3} display={"flex"} justifyContent={"center"}>
                    <TextField size={"small"}
                               color={"primary"}
                               label="Дансны дугаар"
                               type="number"
                               fullWidth
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   this.account = event.target.value
                               }}
                    />
                </Grid>
                <Grid xs={12} md={3} display={"flex"} justifyContent={"center"}>
                    <TextField size={"small"}
                               label="Дансны нэр"
                               type="text"
                               fullWidth
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   //this.amount = event.target.value
                               }}
                    />
                </Grid>
                <Grid xs={12} md={3} display={"flex"} justifyContent={"center"}>
                    <TextField size={"small"}
                               label="Гүйлгээний дүн"
                               type="number"
                               fullWidth
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   this.amount = event.target.value
                               }}
                    />
                </Grid>
                <Grid xs={12} md={3} display={"flex"} justifyContent={"center"}>
                    <TextField size={"small"}
                               rows={3}
                               multiline
                               fullWidth
                               label="Гүйлгээ утга"
                               type="text"
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   this.setState({amount: event.target.value})
                                   this.desc = event.target.value
                               }}
                    />
                </Grid>
                <Grid xs={12} md={3}>
                    <div className="flex items-center justify-center">
                        <Button variant={"contained"} color={"primary"} size={"small"} fullWidth
                                onClick={this.sendWalletToBank} className={"mt-3"}>Гүйлгээ хийх</Button>
                    </div>
                </Grid>
            </Grid>
        </>

    )
        ;
    }
}

export default WalletToAccount;
