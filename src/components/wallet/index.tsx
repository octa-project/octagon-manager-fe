"use client"
import React, {Component} from "react";
import styles from './wallet.module.css';
import {Card, Dialog, IconButton, Tooltip, Typography} from "@mui/material";
import Image from 'next/image'
import PaymentIcon from '@mui/icons-material/Payment';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import api from "@/src/api";
import Transaction from "@/src/components/wallet/transaction";
import CardWeb from "@/src/components/wallet/cardweb";
import CardToWallet from "@/src/components/wallet/cardtowallet";
import WalletToAccount from "@/src/components/wallet/wallettoaccount";
import WalletToWallet from "@/src/components/wallet/wallettowallet";
import Invoice from "@/src/components/wallet/invoice";
import {currencyFormatter} from "@/src/utils";
import Paper from "@mui/material/Paper";
import Grid from "@mui/system/Unstable_Grid";

interface Card {
    card_bank_id: number;
    card_bank_name: string;
    card_number: any;
    is_active: any;
}

interface Dialog {
    cardWeb: boolean;
    bankDialog: boolean;
    walletDialog: boolean;
    invoiceDialog: any;
    branchDialog: boolean;
    accBalance: boolean;
    url: any
    cardList: Card[]
}

class WalletController extends Component<{}, Dialog> {

    constructor(props: {}) {
        super(props);
        this.state = {
            walletDialog: false,
            bankDialog: false,
            branchDialog: false,
            invoiceDialog: false,
            accBalance: false,
            cardWeb: false,
            url: null,
            cardList: []
        };
    }

    phoneNumber = "88001403"

    componentDidMount() {
        this.getBalance()
        this.getCardList()
    }

    getBalance = async () => {
        try {
            await api.getWalletBalance.getWalletBalance(this.phoneNumber).then(res => {
                if (res.status == 200 && res.data.isSuccess) {
                    this.setState({accBalance: res.data.data})
                }
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    };

    getCardList = async () => {
        try {
            await api.getCardList.getCardList(this.phoneNumber).then(res => {
                if (res.status == 200 && res.data.isSuccess) {
                    this.setState({cardList: res.data.data});
                }
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    };

    saveCard = () => {
        api.saveCard.saveCard(this.phoneNumber).then(res => {
            if (res.status == 200 && res.data.isSuccess) {
                //      this.cardList = res.data.data
                console.log("res ", res)
            }
        });
    };

    getWeb = async () => {
        try {
            const body = {
                redirect_url: "google.com",
                phone_number: this.phoneNumber
            }
            await api.getCardWeb.getCardWeb(body).then(res => {
                if (res.status == 200 && res.data.isSuccess) {
                    this.setState({url: res.data.data.url});
                }
            });

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    };

    openHandle = (value: any) => {
        if (value === 1) {
            this.setState({walletDialog: true});
        }

        /*        if (value === 2) {
                    this.setState({bankDialog: true});
                }*/

        if (value === 3) {
            this.setState({bankDialog: true});
        }

        if (value === 4) {
            this.setState({branchDialog: true});
        }

        if (value === 5) {
            this.getWeb()
            this.setState({invoiceDialog: true})
        }

        if (value === 6) {
            this.setState({cardWeb: true});
        }
    };

    closeHandle = (value: number) => {
        if (value === 1) {
            this.setState({walletDialog: false});
        }
        /*        if (value === 2) {
            this.setState({bankDialog: true});
        }*/
        if (value === 3) {
            this.setState({bankDialog: false});
        }

        if (value === 4) {
            this.setState({branchDialog: false});
        }
        if (value === 5) {
            this.setState({invoiceDialog: false});
        }
        if (value === 6) {
            this.saveCard()
            this.setState({cardWeb: false});
        }
    };

    render() {
        return (
            <Paper elevation={2} className={"p-6"}>
                <Grid container spacing={3}>
                    <Grid xs={12} md={9}>
                        <div className="flex items-center">
                            <div className=" font-bold text-2xl">PayGate Хэтэвч /{this.phoneNumber}/</div>
                        </div>
                    </Grid>
                    <Grid xs={12} md={3}>
                        <div className={"flex justify-between items-center"}>
                            <div className={"w-50 mr-2"}>
                                <div className={"bg-secondary dark:bg-graydark flex flex-col p-2 rounded text-center"}>
                                    <Typography className="font-normal text-sm whitespace-nowrap"> Үлдэгдэл</Typography>
                                    <Typography
                                        className="!font-bold text-center"> {currencyFormatter(this.state.accBalance)}</Typography>
                                </div>
                            </div>
                            <div className={"w-50 ml-2"}>
                                <div className={"bg-success flex flex-col p-2 rounded text-white text-center"}>
                                    <label className="font-normal text-sm whitespace-nowrap"> Боломжит зээлийн дүн</label>
                                    <label
                                        className="font-bold text-center"> {currencyFormatter(this.state.accBalance)}</label>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={12} md={9} className={"relative"}>
                        <div>
                            <Grid container spacing={3}>
                                <Grid xs={6}>
                                    Орлого хийх
                                    <div className="flex">

                                        <button className={styles.btn} onClick={() => this.openHandle(1)}>
                                            <PaymentIcon color="action" sx={{fontSize: 50}}></PaymentIcon>
                                            <label className="font-light"> Картаар цэнэглэх</label>
                                        </button>
                                        <button className={styles.btn}>
                                            <CurrencyExchangeOutlinedIcon color="action"
                                                                          sx={{fontSize: 50}}></CurrencyExchangeOutlinedIcon>
                                            <label className="font-light"> Зээлээр цэнэглэх</label>
                                        </button>
                                    </div>
                                </Grid>
                                <Grid xs={6}>
                                Зарлага гаргах
                                    <div className="flex">
                                        <button className={styles.btn} onClick={() => this.openHandle(3)}>
                                            <PaymentsOutlinedIcon color="action" sx={{fontSize: 50}}></PaymentsOutlinedIcon>
                                            <label className="font-light"> Хувийн дансруу</label>
                                        </button>
                                        <button className={styles.btn} onClick={() => this.openHandle(4)}>
                                            <CachedOutlinedIcon color="action" sx={{fontSize: 50}}></CachedOutlinedIcon>
                                            <label className="font-light"> Салбар хооронд</label>
                                        </button>
                                        <button className={styles.btn} onClick={() => this.openHandle(5)}>
                                            <DocumentScannerOutlinedIcon color="action" sx={{fontSize: 50}}></DocumentScannerOutlinedIcon>
                                            <label className="font-light"> Нэхэмжлэл</label>
                                        </button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <Grid container spacing={3}>
                                <Grid xs={12}>
                                    <div>
                                        Гүйлгээний дэлгэрэнгүй
                                    </div>
                                    <div className="ag-theme-alpine w-full" style={{height: 500}}>
                                        <Transaction phoneNumber={this.phoneNumber}/>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        {(this.state.walletDialog ||
                                this.state.invoiceDialog ||
                                this.state.branchDialog ||
                                this.state.bankDialog) &&
                            <div className={"absolute w-full h-full top-0 left-0 z-[2] backdrop-blur-[20px]"}>
                                <CardToWallet
                                    open={this.state.walletDialog}
                                    onClose={() => this.closeHandle(1)}
                                    data={this.state.cardList}
                                    phoneNum={this.phoneNumber}
                                />
                                <Invoice
                                    open={this.state.invoiceDialog}
                                    onClose={() => this.closeHandle(5)}
                                />
                                <WalletToWallet
                                    open={this.state.branchDialog}
                                    onClose={() => this.closeHandle(4)}
                                    phoneNum={this.phoneNumber}
                                />
                                <WalletToAccount
                                    open={this.state.bankDialog}
                                    onClose={() => this.closeHandle(3)}
                                    phoneNum={this.phoneNumber}
                                />
                            </div>
                        }
                    </Grid>
                    <Grid xs={12} md={3}>
                        <div className={"h-full bg-secondary rounded-3xl p-6 flex flex-col dark:bg-boxdark-2"}>
                            <div>
                                <CardWeb
                                    open={this.state.cardWeb}
                                    onClose={() => this.closeHandle(6)}
                                    url={this.state.url}
                                />
                                <div className={"flex justify-between items-center"}>
                                    <b>Картын жагсаалт</b>
                                    <Tooltip title="Карт нэмэх">
                                        <IconButton onClick={() => this.openHandle(6)} size={"small"}>
                                            <AddCircleIcon color="primary" fontSize="large"/>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                {this.state.cardList.map((data, index) => (
                                    <div className={"relative h-40"}>
                                        <div className={`mb-2 bg-white shadow-5 shadow-black rounded-2xl text-center absolute left-0 w-full`} style={{top:index*(-40)+"%"}}>
                                            <div
                                                className={"absolute left-[50%] top-[20%] -translate-x-[50%] -translate-y-[50%] rounded bg-opacity-50 bg-black-2 text-white p-1.5"}>
                                                <p className="font-normal text-lg"> {data.card_number}</p>
                                                {/*<p> {data.card_bank_name}</p>*/}
                                            </div>
                                            <img src={"/creditCards/card1.png"} alt={"card"} className={"w-full pointer-events-none"}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={"h-full"}>
                                <b>Зөвхөн таньд</b>
                                <div className="relative w-full h-full">
                                    <img src="/img/cs.png" alt={"cscore"} className={"rounded"}/>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default WalletController;