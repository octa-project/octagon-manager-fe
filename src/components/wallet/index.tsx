"use client"
import React, {Component, SyntheticEvent} from "react";
import styles from './wallet.module.css';
import {Box, Button, Card, DialogActions, DialogTitle, IconButton, TableBody, Tooltip, Dialog} from "@mui/material";
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
import {Stack} from "@mui/system";

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

    saveCard = async () => {
        try {
            await api.saveCard.saveCard(this.phoneNumber).then(res => {
                if (res.status == 200 && res.data.isSuccess) {
                    //      this.cardList = res.data.data
                    console.log("res ", res)
                }
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
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
        if (value === 2) {
            this.setState({bankDialog: true});
        }

        if (value === 4) {
            this.setState({invoiceDialog: true});
        }

        if (value === 5) {
            this.getWeb()
            this.setState({cardWeb: true})
        }

        /*

               if (value === 4) {
                   this.setState({branchDialog: true});
               }
               if (value === 5) {
                   this.setState({invoiceDialog: true});
               }*/
    };

    closeHandle = (value: number) => {
        if (value === 1) {
            this.setState({walletDialog: false});
        }
        if (value === 2) {
            this.setState({bankDialog: false});
        }

        if (value === 4) {
            this.setState({invoiceDialog: false});
        }
        if (value === 5) {
            this.saveCard()
            this.setState({cardWeb: false});
        }
        /* else if (value === 3) {
            this.setState({bankDialog: false});
        } else if (value === 4) {
            this.setState({branchDialog: false});
        } else if (value === 5) {
            this.setState({invoiceDialog: false});
        }*/
    };

    render() {
        return (
            <div className="p-3">
                <div className="bg-white shadow rounded-lg">
                    <div className="flex items-center gap-2 p-3">
                        <div className=" font-bold w-9/12 text-2xl">PayGate Хэтэвч /{this.phoneNumber}/</div>
                        <div>
                            <button className={styles.comp}>
                                <p className="font-light"> Үлдэгдэл</p>
                                <p className="font-light"> {currencyFormatter(this.state.accBalance)}</p>
                            </button>
                        </div>
                        <div>
                            <button className={styles.loan}>
                                <p className="font-light"> Боломжит зээлийн дүн</p>
                                <p className="font-light"> 500,000₮</p>
                            </button>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-8/12 p-6">
                            <div className="flex ">
                                <div className="w-5/12">
                                    Орлого хийх
                                    <div className="flex">
                                        <button className={styles.btn} onClick={() => this.openHandle(1)}>
                                            <PaymentIcon color="action" sx={{fontSize: 50}}></PaymentIcon>
                                            <p className="font-light"> Картаар цэнэглэх</p>
                                            <CardToWallet
                                                open={this.state.walletDialog}
                                                onClose={() => this.closeHandle(1)}
                                                data={this.state.cardList}
                                                phoneNum={this.phoneNumber}
                                            />
                                        </button>
                                        <button className={styles.btn}>
                                            <CurrencyExchangeOutlinedIcon color="action"
                                                                          sx={{fontSize: 50}}></CurrencyExchangeOutlinedIcon>
                                            <p className="font-light"> Зээлээр цэнэглэх</p>
                                        </button>
                                    </div>
                                </div>
                                <div className="w-7/12">
                                    Зарлага гаргах
                                    <div className="flex">
                                        <button className={styles.btn} onClick={() => this.openHandle(2)}>
                                            <PaymentsOutlinedIcon color="action"
                                                                  sx={{fontSize: 50}}></PaymentsOutlinedIcon>
                                            <p className="font-light"> Хувийн дансруу</p>
                                            <WalletToAccount
                                                open={this.state.bankDialog}
                                                onClose={() => this.closeHandle(2)}
                                                phoneNum={this.phoneNumber}
                                            />
                                        </button>
                                        <button className={styles.btn} onClick={() => this.openHandle(3)}>
                                            <CachedOutlinedIcon color="action" sx={{fontSize: 50}}></CachedOutlinedIcon>
                                            <p className="font-light"> Салбар хооронд</p>
                                            {/*     <WalletToWallet
                                                open={this.state.branchDialog}
                                                onClose={() => this.closeHandle(4)}
                                                url={this.state.url}
                                            />*/}
                                        </button>
                                        <button className={styles.btn} onClick={() => this.openHandle(4)}>
                                            <DocumentScannerOutlinedIcon color="action"
                                                                         sx={{fontSize: 50}}></DocumentScannerOutlinedIcon>
                                            <p className="font-light"> Нэхэмжлэл</p>
                                            <Invoice
                                                open={this.state.invoiceDialog}
                                                onClose={() => this.closeHandle(4)}
                                            />
                                            {/*  <Dialog onClose={} open={this.state.invoiceDialog}>
                                                <DialogTitle> {this.state.invoiceDialog}</DialogTitle>
                                                <DialogActions>
                                                    <Button onClick={()=>this.handleClose(this.state.invoiceDialog,"backdropClick")}>Хаах</Button>
                                                </DialogActions>
                                            </Dialog>*/}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                Гүйлгээний дэлгэрэнгүй
                            </div>
                            <div className="ag-theme-alpine" style={{height: 500, width: '100%'}}>
                                <Transaction phoneNumber={this.phoneNumber}/>
                            </div>
                        </div>

                        <div className="w-4/12 bg-slate-100 rounded-lg m-6 p-3">
                            <div>
                                <Tooltip title="Карт нэмэх">
                                    <IconButton onClick={() => this.openHandle(5)}>
                                        <AddCircleIcon color="primary" fontSize="large"/>
                                    </IconButton>
                                </Tooltip>
                                <CardWeb
                                    open={this.state.cardWeb}
                                    onClose={() => this.closeHandle(5)}
                                    url={this.state.url}
                                />
                                Картын жагсаалт
                                {this.state.cardList.map((data) => (
                                    <div className=" mb-2 bg-white shadow rounded-2xl text-center max-h-16">
                                        <div>
                                            <p className=" font-bold"> {data.card_number}</p>
                                        </div>
                                        <div>
                                            <p> {data.card_bank_name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>

                            </div>
                            <div>
                                Credit Scoring
                                <div className="justify-center">
                                    <Image className='rounded-lg'
                                           src="/img/cs.png"
                                           width={400}
                                           height={300}
                                           alt="Credit Scoring"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WalletController;