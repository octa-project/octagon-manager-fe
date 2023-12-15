"use client";
import { Card, TextField, Typography } from "@mui/material";
import { Component } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Image from "next/image";
import { pink } from "@mui/material/colors";
import { LineChart } from "@mui/x-charts/LineChart";
import ChooseCard from "./chooseCard";
import TopSales from "./topSales";
import TopdaysSales from "./todaysSales";
import TotalProfit from "./totalProfit";
import TotalSales from "./totalSales";
import api from "@/src/api";
import { Dashboard } from "@mui/icons-material";

interface DashboardControllerState {
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
  loading: boolean;
  error: string;
  dashboard: Dashboard;
  dashboardDataWeekly: DashboardDataWeekly;
  days: number[];
}

interface Dashboard {
  total_income: number;
  month_profit: number;
  day_income: number;
}

interface DashboardDataWeekly {
  totalIncome: number;
  qty: number;
  weekDay: number;
}

class DashboardController extends Component<{}, DashboardControllerState> {
  constructor(props: any) {
    super(props);

    this.state = {
      topLeft: 1,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0,
      loading: false,
      error: "",
      dashboard: {
        total_income: 0,
        month_profit: 0,
        day_income: 0,
      },
      dashboardDataWeekly: {
        totalIncome: 0,
        qty: 0,
        weekDay: 0,
      },
      days: [],
    };
  }
  chartsParams = {
    margin: { bottom: 20, left: 25, right: 5 },
    height: 300,
  };
  componentDidMount() {
    this.handleCardStates(0, 0, 0, 0);
    this.getDashboard();
    this.getDashboardDataWeekly();
  }
  formatDate = (date: {
    getFullYear: () => any;
    getMonth: () => number;
    getDate: () => any;
    getHours: () => any;
    getMinutes: () => any;
    getSeconds: () => any;
  }) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  getDashboard = async () => {
    try {
      this.setState({ loading: true, error: "" });
      const today = new Date();
      const startDate = this.formatDate(today);
      const result = await api.get_dashboard.getDashboard(startDate);
      if (result.data.code === "200") {
        const responseDashboard: Dashboard = result.data.data;

        console.log(responseDashboard);

        this.setState((prevState) => ({
          ...prevState,
          dashboard: responseDashboard,
        }));
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.setState({ loading: false });
    }
  };
  getDashboardDataWeekly = async () => {
    try {
      this.setState({ loading: true, error: "" });

      const result =
        await api.get_dashboard_data_weekly.getDashboardDataWeekly();

      if (result.data.code === "200") {
        const totalIncomeArray = result.data.data.map(
          (item: { totalIncome: any }) => item.totalIncome
        );
        this.setState({ loading: false, days: totalIncomeArray });
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false, error: "Failed to fetch data" });
    }
  };

  handleCardStates = (tl: number, tr: number, bl: number, br: number) => {
    this.setState({
      topLeft: tl,
      topRight: tr,
      bottomLeft: bl,
      bottomRight: br,
    });
  };

  formatMoney = (amount: number | bigint) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
    }).format(amount);

    return `${formattedAmount} ₮`;
  };

  formatQty = (amount: number | bigint) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
    }).format(amount);

    return `${formattedAmount}`;
  };

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
                        {this.formatMoney(this.state.dashboard.total_income)}
                      </Typography>
                      <ArrowUpwardIcon color="success" />
                    </Card>
                    <Card className="w-full h-32 shadow-md rounded-lg font-sans text-[#6d758f] text-md items-center justify-center flex flex-col">
                      <Typography className="font-sans text-[#6d758fff] text-md text-center pt-3 align-center">
                        Өнөөдрийн орлого
                      </Typography>
                      <Typography className="font-sans font-bold text-[#6d758fff] text-xl text-center pt-2 align-center">
                        {this.formatMoney(this.state.dashboard.day_income)}
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
                        {this.formatMoney (this.state.dashboard.month_profit)}
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
                        12
                        {/* {this.state.dashboard.month_profit} */}
                      </Typography>
                    </Card>
                  </div>
                  {this.state.topLeft === 0 ? <ChooseCard /> : null}
                  {this.state.topLeft === 1 ? <TopSales /> : null}
                  {this.state.topLeft === 2 ? <TopdaysSales /> : null}
                  {this.state.topLeft === 3 ? <TotalProfit /> : null}
                  {this.state.topLeft === 4 ? <TotalSales /> : null}
                </div>
                <div className="col-span-2 flex flex-col gap-5">
                  <Card className="w-full shadow-md h-72 rounded-lg items-center justify-center flex flex-col">
                    <Typography className="font-sans font-bold text-[#6d758f] text-xl align-top">
                      Борлуулалт
                    </Typography>
                    <LineChart
                      {...this.chartsParams}
                      xAxis={[
                        {
                          id: "Days",
                          data: [
                            "Даваа",
                            "Мягмар",
                            "Лхагва",
                            "Пүрэв",
                            "Баасан",
                            "Бямба",
                            "Ням",
                          ],
                          scaleType: "band",
                        },
                      ]}
                      series={[
                        {
                          data: this.state.days,
                          color: "#6d758f",
                        },
                      ]}
                      width={450}
                      height={250}
                    />
                  </Card>
                  {this.state.topLeft === 0 ? <ChooseCard /> : null}
                  {this.state.topLeft === 1 ? <TopSales /> : null}
                  {this.state.topLeft === 2 ? <TopdaysSales /> : null}
                  {this.state.topLeft === 3 ? <TotalProfit /> : null}
                  {this.state.topLeft === 4 ? <TotalSales /> : null}
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
