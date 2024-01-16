"use client"
import {SnackbarProvider} from "notistack";
import React from "react";
import {Alert, Container, Divider, Link, Snackbar, Typography} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Swal from 'sweetalert2'

const Elements = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const showAlert = (type:number) => {
        switch(type){
            case 1:{
                Swal.fire({
                    title: "success",
                    text: "success",
                    icon: "success"
                })
            }break;
            case 2:{
                Swal.fire({
                    title: "warning",
                    text: "warning",
                    icon: "warning"
                })
            }break;
            case 3:{
                Swal.fire({
                    title: "confirm dialog",
                    showDenyButton: true,
                    confirmButtonText: "yes text",
                    denyButtonText: `no text`
                })
            }break;
            case 4:{
                Swal.fire({
                    title: "error",
                    text: "error",
                    icon: "error"
                })
            }break;
        }
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Typography variant={"h4"}>Дэлгэрэнгүйг эндээс </Typography>
                    <Link href={"https://mui.com/material-ui/all-components/"} target={"_blank"} >https://mui.com/material-ui/all-components/</Link>
                </Grid>
                <Grid xs={12}>
                    <Divider/>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    {"import Grid from \"@mui/system/Unstable_Grid\";"}
                    <Typography variant={"h4"}>Ерөнхий Grid System (material ui ын Grid ашиглана)</Typography>
                    <Typography variant={"h5"}>Эхний ээлжинд Material UI Grid логик ашигдаад явсан дээр байх</Typography>
                    <Typography variant={"h6"}>Нэг эгнээг 12 урттай гэж ойлгоод хуваалтуудаа хийчих</Typography>
                </Grid>
                <Grid xs={12}>
                    <Paper>xs=12</Paper>
                </Grid>
                <Grid xs={11} xsOffset={1}>
                    <Paper>xs=11</Paper>
                </Grid>
                <Grid xs={10} xsOffset={2}>
                    <Paper>xs=10</Paper>
                </Grid>
                <Grid xs={9} xsOffset={3}>
                    <Paper>xs=9</Paper>
                </Grid>
                <Grid xs={8} xsOffset={4}>
                    <Paper>xs=8</Paper>
                </Grid>
                <Grid xs={7} xsOffset={5}>
                    <Paper>xs=7</Paper>
                </Grid>
                <Grid xs={6} xsOffset={6}>
                    <Paper>xs=6</Paper>
                </Grid>
                <Grid xs={5} xsOffset={7}>
                    <Paper>xs=5</Paper>
                </Grid>
                <Grid xs={4} xsOffset={8}>
                    <Paper>xs=4</Paper>
                </Grid>
                <Grid xs={3} xsOffset={9}>
                    <Paper>xs=3</Paper>
                </Grid>
                <Grid xs={2} xsOffset={10}>
                    <Paper>xs=2</Paper>
                </Grid>
                <Grid xs={1} xsOffset={11}>
                    <Paper>xs=1</Paper>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid xs={12}>
                    {"import Grid from \"@mui/system/Unstable_Grid\";"}
                    <Typography variant={"h4"}>Ерөнхий Grid System (material ui ын Grid ашиглана)</Typography>
                </Grid>
                <Grid xs={12}>
                    <Paper>xs=12</Paper>
                </Grid>
                <Grid xs={8}>
                    <Paper>xs=8</Paper>
                </Grid>
                <Grid xs={4}>
                    <Paper>xs=4</Paper>
                </Grid>
                <Grid xs={4}>
                    <Paper>xs=4</Paper>
                </Grid>
                <Grid xs={8}>
                    <Paper>xs=8</Paper>
                </Grid>
                <Grid xs={12}>
                    <Divider/>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid xs={12}>
                    {"import Button from \"@mui/material/Button\";"}
                    <Typography variant={"h4"}>Ерөнхий Buttons</Typography>
                    <Typography variant={"h4"}>Ерөнхий Grid System (material ui ын Grid ашиглана)</Typography>
                    <Typography variant={"h5"}>Эхний ээлжинд Material UI Grid логик ашигдаад явсан дээр байх</Typography>
                    <Typography variant={"h6"}>Нэг эгнээг 12 урттай гэж ойлгоод хуваалтуудаа хийчих</Typography>
                </Grid>
                <Grid xs={12}>
                    <Paper>
                        <Button variant="text">Text</Button>
                        <Button variant="contained">Contained</Button>
                        <Button variant="outlined">Outlined</Button>
                    </Paper>
                </Grid>
                <Grid xs={12}>
                    <Paper>

                        <Button variant="contained">Contained</Button>
                        <Button variant="contained" disabled>
                            Disabled
                        </Button>
                        <Button variant="contained" href="#contained-buttons">
                            Link
                        </Button>

                    </Paper>
                </Grid>
                <Grid xs={12}>
                    <Paper>

                        <Button variant="outlined">Primary</Button>
                        <Button variant="outlined" disabled>
                            Disabled
                        </Button>
                        <Button variant="outlined" href="#outlined-buttons">
                            Link
                        </Button>

                    </Paper>
                </Grid>
                <Grid xs={12}>
                    <Paper>

                        <Button color="secondary">Secondary</Button>
                        <Button variant="contained" color="success">
                            Success
                        </Button>
                        <Button variant="outlined" color="error">
                            Error
                        </Button>

                    </Paper>
                </Grid>
                <Grid xs={12}>
                    <Paper>

                        <div>
                            <Button size="small">Small</Button>
                            <Button size="medium">Medium</Button>
                            <Button size="large">Large</Button>
                        </div>
                        <div>
                            <Button variant="outlined" size="small">
                                Small
                            </Button>
                            <Button variant="outlined" size="medium">
                                Medium
                            </Button>
                            <Button variant="outlined" size="large">
                                Large
                            </Button>
                        </div>
                        <div>
                            <Button variant="contained" size="small">
                                Small
                            </Button>
                            <Button variant="contained" size="medium">
                                Medium
                            </Button>
                            <Button variant="contained" size="large">
                                Large
                            </Button>
                        </div>

                    </Paper>
                </Grid>
                <Grid xs={12}>
                    <Divider/>
                </Grid>
                <Grid xs={12}>
                    <Paper>

                        <Alert severity="success">This is a success Alert.</Alert>
                        <Alert severity="info">This is an info Alert.</Alert>
                        <Alert severity="warning">This is a warning Alert.</Alert>
                        <Alert severity="error">This is an error Alert.</Alert>

                        <Alert variant="filled" severity="success">This is a filled success Alert.</Alert>
                        <Alert variant="filled" severity="info">This is a filled info Alert.</Alert>
                        <Alert variant="filled" severity="warning">This is a filled warning Alert.</Alert>
                        <Alert variant="filled" severity="error">This is a filled error Alert.</Alert>

                        <Alert variant="outlined" severity="success">This is an outlined success Alert.</Alert>
                        <Alert variant="outlined" severity="info">This is an outlined info Alert.</Alert>
                        <Alert variant="outlined" severity="warning">This is an outlined warning Alert.</Alert>
                        <Alert variant="outlined" severity="error">This is an outlined error Alert.</Alert>

                    </Paper>
                </Grid>
                <Grid xs={12}>
                    <Divider/>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid xs={12}>
                    {"import Paper from \"@mui/material/Paper\";"}
                    <Typography variant={"h4"}>Ерөнхий Card Box </Typography>
                </Grid>
                <Grid xs={12}>
                    <Paper elevation={2} className={"p-2.5 rounded"}>
                        Default box Style
                        use this

                        Энэ box style iig deelinhdee ashiglaval zugeershuu custom yum baga bichne
                    </Paper>
                </Grid>
                <Grid xs={12}>
                    <Divider/>
                </Grid>
            </Grid>


            <Grid container spacing={2}>
                <Grid xs={12}>
                    {"import Swal from 'sweetalert2'"}
                    <Typography variant={"h4"}>Ерөнхий Alert Box </Typography>
                    <Typography variant={"h4"}>Service duudla shaardlagatai bol alert eer haruulah geh met</Typography>
                </Grid>
                <Grid xs={12}>
                    <Button variant={"contained"} size={"small"} color={"success"} onClick = {()=>showAlert(1)}>Alert success </Button>
                    <Button variant={"contained"} size={"small"} color={"warning"} onClick = {()=>showAlert(2)}>Alert warning </Button>
                    <Button variant={"contained"} size={"small"} color={"secondary"} onClick = {()=>showAlert(3)}>Alert confirm </Button>
                    <Button variant={"contained"} size={"small"} color={"error"} onClick = {()=>showAlert(4)}>Alert danger </Button>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid xs={12}>
                    {"import Swal from 'sweetalert2'"}
                    <Typography variant={"h4"}>Ерөнхий Notification AKA Snackbar Component </Typography>
                    <Typography variant={"h4"}>Ерөнхий Grid System (material ui ын Grid ашиглана)</Typography>
                    <Typography variant={"h4"}>eniig component bolgoj ashiglaj bolno odoo hiisen baigaa snackbar aar soliyo gevel</Typography>
                </Grid>
                <Grid xs={12}>
                    <Button variant="outlined" onClick={handleClick}>
                        Open success snackbar
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            This is a success message!
                        </Alert>
                    </Snackbar>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Elements;