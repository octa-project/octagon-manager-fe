import {
  Avatar,
  Card,
  Divider,
  Fab,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Component } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Image from "next/image";
import { pink } from "@mui/material/colors";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import SavingsIcon from '@mui/icons-material/Savings';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

interface DashboardControllerState {
  anchorEl: HTMLElement | null;
}

class DashboardController extends Component<{}, DashboardControllerState> {
  constructor(props: any) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className="grid grid-cols-5">
        <div className="col-span-4 h-screen bg-[#f7f7f5ff] p-5">
          <div className="grid grid-rows-5">
            {/* <div className="row-span-1 w-full">aaaa</div> */}
            <div className="row-span-5 w-full">
              <div className="grid grid-cols-4 gap-5">
                <div className="col-span-2 flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-8 place-items-start">
                    <Card className="w-full h-32 shadow-md rounded-lg font-sans text-[#6d758f] text-md items-center justify-center flex flex-col">
                      <Typography className="font-sans text-[#6d758fff] text-md text-center pt-5 align-center">
                        Нийт орлого
                      </Typography>
                      <Typography className="font-sans font-bold text-[#6d758fff] text-xl text-center pt-2 align-center">
                        2’350’800₮
                      </Typography>
                      <ArrowUpwardIcon color="success" />
                    </Card>
                    <Card className="w-full h-32 shadow-md rounded-lg font-sans text-[#6d758f] text-md items-center justify-center flex flex-col">
                      <Typography className="font-sans text-[#6d758fff] text-md text-center pt-3 align-center">
                        Өнөөдрийн орлого
                      </Typography>
                      <Typography className="font-sans font-bold text-[#6d758fff] text-xl text-center pt-2 align-center">
                        2’350’800₮
                      </Typography>
                    </Card>
                    <Card className="w-full h-32 shadow-md rounded-lg font-sans text-[#6d758f] text-md items-center justify-center flex flex-col">
                      <Typography className="font-sans text-[#6d758fff] text-md text-center pt-5 align-center">
                        Нийт ашиг /сар/
                      </Typography>
                      <Typography
                        className="ffont-sans font-bold text-[#6d758fff] text-xl text-center pt-2 align-center"
                        gutterBottom
                      >
                        750’800₮
                      </Typography>
                      <ArrowDownwardIcon sx={{ color: pink[500] }} />
                    </Card>
                    <Card className="w-full h-32 shadow-md rounded-lg font-sans text-[#6d758f] text-md items-center justify-center flex flex-col">
                      {" "}
                      Эрэлт ихтэй бараа
                      <Typography
                        className="font-bold text-[#6d758fff] text-xl text-center pt-5 align-center"
                        gutterBottom
                      >
                        112
                      </Typography>
                    </Card>
                  </div>
                  <Card className="w-full h-52 shadow-md rounded-lg items-center justify-center flex flex-col">
                    <IconButton
                      onClick={this.handleClick}
                      className="h-14 w-14 bg-[#6d758fff] shadow-lg hover:bg-[#45433fff]"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <AddIcon className="text-white" />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={this.handleClose}
                      onClick={this.handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem onClick={this.handleClose}>
                        <Avatar /> Нийт орлого
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <Avatar /> Өнөөдрийн орлого
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={this.handleClose}>
                        <ListItemIcon>
                          <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Нийт ашиг /сар/
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Эрэлт ихтэй бараа
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Дуусаж буй барааны жагсаалт
                      </MenuItem>
                    </Menu>
                    <Typography className="font-sans text-[#6d758f] text- text-center pt-5 align-bottom">
                      Та өөрийн хэрэгцээнд зохицуулан хүссэн датагаа харах
                      боломжтой
                    </Typography>
                  </Card>
                  <Card className="w-full h-52 shadow-md rounded-lg ">
                    <Typography className="font-sans text-[#6d758f] text-xl text-center pt-5 align-top">
                      Өндөр борлуулалттай
                    </Typography>
                  </Card>
                </div>
                <div className="col-span-2 flex flex-col gap-5">
                  <Card className="w-full shadow-md h-72 rounded-lg items-center justify-center flex flex-col">
                    <Image
                      src="/board.svg"
                      alt="dashboard logo"
                      className="p-5"
                      width={500}
                      height={4 / 5}
                    />
                  </Card>

                  <Card className="w-full h-52 shadow-md rounded-lg items-center justify-center flex flex-col">
                    <IconButton
                      onClick={this.handleClick}
                      className="h-14 w-14 bg-[#6d758fff] shadow-lg hover:bg-[#45433fff]"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <AddIcon className="text-white" />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={this.handleClose}
                      onClick={this.handleClose}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem onClick={this.handleClose}>
                        <SavingsIcon color="success" align-left /> Нийт
                        орлого
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <AttachMoneyIcon color="success" /> Өнөөдрийн орлого
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={this.handleClose}>
                        <MenuItem>
                          <AutoGraphIcon color="success" align-left />
                        </MenuItem>
                        Нийт ашиг /сар/
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <ListItemIcon>
                          <LocalShippingIcon color="success" />
                        </ListItemIcon>
                        Эрэлт ихтэй бараа
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <ListItemIcon>
                          <SouthWestIcon sx={{ color: pink[500] }}/>
                        </ListItemIcon>
                        Дуусаж буй барааны жагсаалт
                      </MenuItem>
                    </Menu>
                    <Typography className="font-sans text-[#6d758f] text- text-center pt-5 align-bottom">
                      Та өөрийн хэрэгцээнд зохицуулан хүссэн датагаа харах
                      боломжтой
                    </Typography>
                  </Card>

                  <Card className="w-full h-52 shadow-md rounded-lg">
                    <Typography className="font-sans text-[#6d758f] text-xl text-center pt-5 align-top">
                      Дуусаж буй барааны жагсаалт
                    </Typography>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-white">
          <Card className="flex flex-col gap-5 p-5 h-full w-full shadow-2xl ">
            <Image
              src="/cards.svg"
              alt="card logo"
              className="p-5"
              width={300}
              height={48}
            />
            <TextField>aaa</TextField>
            <TextField>aaa</TextField>
            <TextField>aaa</TextField>
            <TextField>aaa</TextField>
            <TextField>aaa</TextField>
          </Card>
        </div>
      </div>
    );
  }
}

export default DashboardController;
