import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MovingIcon from '@mui/icons-material/Moving';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import {
  AssuredWorkloadSharp,
  Logout,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Component, ReactNode } from "react";
import AddIcon from "@mui/icons-material/Add";
import { green, orange, pink, red } from '@mui/material/colors';

interface CardControllerState {
    anchorEl: HTMLElement | null;
  }

class ChooseCard extends Component<{}, CardControllerState> {
  constructor(props: any) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  componentDidMount() {}

  getdatas = () => {};

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
      <div>
        <Card className="w-full h-52 shadow-md rounded-lg items-center justify-center flex flex-col">
          <IconButton
            onClick={this.handleClick}
            className="h-14 w-14 bg-[#e8eaedff] shadow-lg hover:bg-[#6d758fff]"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AddIcon className="text-[#6d758fff] hover:text-white" />
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
              <LocalFireDepartmentIcon sx={{ color: orange[600] }}/> Өндөр боруулалттай 10 Бараа
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              <ArrowOutwardIcon sx={{ color: green[800] }} /> Сарын өндөр боруулалттай 10 Бараа
            </MenuItem>
            <Divider />
            <MenuItem onClick={this.handleClose}>
              <ListItemIcon>
                <AttachMoneyIcon sx={{ color: green[800] }} fontSize="small" />
              </ListItemIcon>
              Өдрийн орлого
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              <ListItemIcon>
                <AutoGraphIcon sx={{ color: green[800] }} fontSize="small" />
              </ListItemIcon>
              Сарын нийт ашиг
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              <ListItemIcon>
                <LocalShippingIcon sx={{ color: red[800] }} fontSize="small" />
              </ListItemIcon>
              Дуусаж буй барааны жагсаалт
            </MenuItem>
          </Menu>
          <Typography className=" text-[#6d758f] text- text-center pt-6 align-bottom">
            Та өөрийн хэрэгцээнд зохицуулан хүссэн датагаа харах боложтой
          </Typography>
        </Card>
      </div>
    );
  }
}

export default ChooseCard;
