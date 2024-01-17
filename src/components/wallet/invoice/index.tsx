import React, {Component, SyntheticEvent} from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import styles from '@/src/components/wallet/wallet.module.css'
import Grid from "@mui/system/Unstable_Grid";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Carousel from "react-material-ui-carousel";
import {classesList} from "ag-grid-react/lib/reactUi/utils";
import style from "@/src/components/wallet/wallet.module.css";

interface Props {
    open: boolean;
    onClose: any;
}

class Invoice extends Component<Props> {

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedItem: null,
        }
    }

    close = () => {
        this.props.onClose();
    };

    getOrgList = () => {
        return [
            [
                {id:1, src:"/img/cola.png"},
                {id:2, src:"/img/apu.png"},
                {id:3, src:"/img/anun.png"},
            ]
        ]
    }

    setSelectedItem = (id: number) => this.setState({selectedItem:id})


    render() {
        const {selectedItem}:any = this.state
        const {setSelectedItem} = this
        return this.props.open &&
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
                            Нэхэмжлэх төлөх
                        </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Carousel swipe navButtonsAlwaysVisible={true} animation={"slide"} autoPlay={false}>

                            {
                                this.getOrgList().map(e=> {
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
                                   label="Нэхэмжлэлийн дүн"
                                   type="number"
                                   fullWidth
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                        />
                    </Grid>
                    <Grid xs={12} md={3} display={"flex"} justifyContent={"center"}>
                        <TextField size={"small"}
                                   rows={3}
                                   multiline
                                   fullWidth
                                   label="Гүйлгээ утга"
                                   type="text"
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}

                        />
                    </Grid>
                    <Grid xs={12} md={3}>
                        <div className="flex items-center justify-center">
                            <Button variant={"contained"} color={"primary"} size={"small"} fullWidth
                                    onClick={this.props.onClose} className={"mt-3"}>Илгээх</Button>
                        </div>
                    </Grid>
                </Grid>
            </>;
    }
}

export default Invoice;
