import React, {Component, SyntheticEvent} from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import styles from '@/src/components/wallet/wallet.module.css'

interface Props {
    open: boolean;
    onClose: any;
}

class Invoice extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    handleClose = (event: SyntheticEvent<Element, Event>, reason: string) => {
        if (reason === 'backdropClick')
            return
        this.props.onClose();
    };

    close = () => {
        this.props.onClose();
    };


    render() {
        return (
            <Dialog onClose={this.handleClose} open={this.props.open}>
                <DialogTitle>Нэхэмжлэл</DialogTitle>

                <DialogContent>
                    <div className="flex">
                        <button className={styles.btn}>
                            <img className='rounded-lg flex items-center'
                                 src="/img/cola.png"
                                 width="1527"
                                 alt="Credit Scoring"></img>
                            <p className="font-light">100,000₮</p>
                        </button>
                        <button className={styles.btn}>
                            <img className='rounded-lg flex justify-center'
                                 src="/img/apu.png"
                                 width='auto'
                                 alt="Credit Scoring"></img>
                            <p className="font-light"> 200,000₮</p>
                        </button>
                        <button className={styles.btn}>
                            <img className='rounded-lg flex items-center'
                                 src="/img/anun.png"
                                 width='220'
                                 alt="Credit Scoring"></img>
                            <p className="font-light"> 200,000₮</p>
                        </button>
                    </div>
                    <div >
                        <div className= "flex items-center justify-center m-2" >
                            <TextField
                                id="outlined-password-input"
                                label="Нэхэмжлэлийн дүн"
                                type="password"
                                autoComplete="current-password"
                            />
                        </div>
                        <div className= "flex items-center justify-center">
                            <TextField
                            id="outlined-password-input"
                            label="Гүйлгээний утга"
                            type="password"
                            autoComplete="current-password"
                        /></div>

                    </div>


                </DialogContent>


                <Button onClick={this.close}>Илгээх</Button>


                <DialogActions>
                </DialogActions>
            </Dialog>
        );
    }
}

export default Invoice;
