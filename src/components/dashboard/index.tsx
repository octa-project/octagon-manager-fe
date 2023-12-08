import { Card, Fab, TextField, Typography } from "@mui/material";
import { Component } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Image from "next/image";
import { pink } from "@mui/material/colors";

class DashboardController extends Component {
  state = {};

//   handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   handleClose = () => {
//     setAnchorEl(null);
//   };

  render() {
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
                    {" "}
                    <Fab
                      className="bg-[#6d758fff] h-[#f7f7f5ff]"
                      color="primary"
                      aria-label="add"
                    >
                      <AddIcon />
                    </Fab>
                    <Typography
                      className="font-sans text-[#6d758f] text-md text-center pt-5 align-bottom"
                      gutterBottom
                    >
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
                    <Fab
                      className="bg-[#6d758fff]"
                      color="primary"
                      aria-label="add"
                    >
                      {/* <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                      </IconButton> */}
                      <AddIcon />
                    </Fab>
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
