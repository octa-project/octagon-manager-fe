import React, {Component, SyntheticEvent} from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {Button, Dialog, DialogActions} from "@mui/material";

interface Props {
    open: boolean;
    onClose: any;
    url: any;
}

class CardWeb extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }
    handleClose = (event: SyntheticEvent<Element, Event>, reason: string) => {
        if (reason === 'backdropClick')
            return
    };

    close = () => {
        this.props.onClose();
    };


    render() {
        return (
            <Dialog onClose={this.handleClose} open={this.props.open}>
                {this.props.open}
                    <iframe style={{ height: '420px', width: '100%' }} src={this.props.url}></iframe>
                <DialogActions>
                    <Button onClick={this.close}>Хаах</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default CardWeb;
