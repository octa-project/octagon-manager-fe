import React, {
  Component,
  ReactElement,
  Ref,
  forwardRef,
  useState,
} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  AppBar,
  Box,
  Button,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Card, DatePicker, Divider, Input, List } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { dark } from "@mui/material/styles/createPalette";
import apiPdfGenerator from "../../../api/apiPdfGenerator";
import api from "@/src/api";
import { Transition, TransitionProps } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import apiReport from "@/src/api/apiReport";
import SnackBar from "@/src/components/tools/snackAlert";


interface SaleReportState {
  startDate: string;
  endDate: string;
  reports: number[];
  rowSearchData: any[];
  rowData: any[];
  open: boolean;
  reportFile: any
}

class SaleReportController extends Component<{}, SaleReportState> {
  constructor(props: any) {
    super(props);

    this.state = {
      startDate: moment().format("YYYY-MM-DD 00:00:00"),
      endDate: moment().format("YYYY-MM-DD 23:59:59"),
      reports: [1, 2, 3, 4],
      rowData: [],
      rowSearchData: [],
      open: false,
      reportFile: ''
    };
  }

  // getPdf = async () => {
  //   try {
  //     const result = await apiPdfGenerator("").GetPdf();
  //     if (result.data.code === "200") {
  //       this.setState({ rowData: result.data.data });
  //     }
  //   } catch (error) {}
  // };

  getHtml = async () => {
    try {
      const response = await fetch("file:///D:/Jasper/saleReport.html");
      const html = await response.text();
      setHtmlContent(html);
      this.handleDialog(true);
    } catch (error) {
      console.error("Error fetching HTML:", error);
    }
  };

  loadHtmlContent = () => {
    const filePath = "file:///D:/Jasper/saleReport.html";
  
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch HTML: ${response.status}`);
        }
        return response.text();
      })
      .then(htmlContent => {
        this.setState({ htmlContent });
      })
      .catch(error => {
        console.error("Error fetching HTML:", error);
      });
  };

  handleSearchDate = (dates: any, dateStrings: any[]) => {
    this.setState({
      startDate: dateStrings[0] + " 00:00:00",
      endDate: dateStrings[1] + " 23:59:59",
    });
  };
  handleTextSearch = (text: string) => {
    const lowercaseText = text.toLowerCase();

    if (text === "") {
      this.setState({ rowSearchData: this.state.rowData });
    } else {
      const filteredRowData = this.state.rowData.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === "string") {
            const lowercaseValue = value.toLowerCase();
            return lowercaseValue.includes(lowercaseText);
          }
          return false;
        });
      });

      this.setState({ rowSearchData: filteredRowData });
    }
  };

  handleDialog = (value: boolean) => {
    this.getReportFile();
    //const result = await api.getReportFile.getReportFile();
    this.setState({ open: value });
  };




  getReportFile = async () => {
    try {
      const result = await api.getReportFile.getReportFile();
      this.setState({ reportFile: result });

      console.log(this.state.reportFile);

      // if (result.data.code === "200") {
      //   this.setState({ rowData: result.data.data });
      // }
    } catch (error) {}
  };

  render() {
    const { RangePicker } = DatePicker;
    const dateFormat = "YYYY-MM-DD";

    const Transition = forwardRef(function Transition(
      props: TransitionProps & {
        children: ReactElement;
      },
      ref: Ref<unknown>
    ) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    return (
      <div className="h-full flex flex-col gap-3">
        <div className="grid grid-cols-8 gap-5">
          <div className="col-span-4">
            <div className="flex items-center bg-white h-10 gap-5 w-full rounded shadow border border-[#cbcbcb]">
              <Input
                className="capitalize text-[#6d758f] w-full h-full rounded-2xl border-none pl-3 pr-8"
                placeholder="Хайх..."
                onChange={(e) => this.handleTextSearch(e.target.value)}
              />
              <Image
                src="/items/search.svg"
                alt="icon"
                width={24}
                height={24}
                className="mr-5 cursor-pointer"
              />
            </div>
          </div>
          <div className="col-span-2 flex flex-row bg-white h-10 w-full rounded shadow">
            <Select
              className="capitalize text-[#6d758f] w-full rounded"
              value={10}
            >
              <MenuItem className="font-sans" value={10}>
                Салбар-01
              </MenuItem>
              <MenuItem className="font-sans" value={20}>
                Салбар-02
              </MenuItem>
              <MenuItem className="font-sans" value={30}>
                Салбар-03
              </MenuItem>
            </Select>
          </div>
          <div className="col-span-2 h-10">
            <RangePicker
              className="text-xl h-10 shadow w-full"
              defaultValue={[
                dayjs(this.state.startDate, dateFormat),
                dayjs(this.state.endDate, dateFormat),
              ]}
              format={dateFormat}
              onChange={this.handleSearchDate}
            />{" "}
          </div>
        </div>

        {this.state.open ? (
          <div className="flex flex-col bg-white w-full h-full p-2">
            <div className="flex flex-row justify-end">
              <Button
                variant="outlined"
                onClick={() => this.handleDialog(false)}
                className="w-24"
              >
                ХААХ
              </Button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: this.state.reportFile.data }}></div> 
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {this.state.reports.map((report, index) => (
              <Card key={index} className="col-span-1 w-full shadow">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 18 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    БОРЛУУЛАЛТЫН ТАЙЛАН
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={async () => {
                      this.handleDialog(true);
                      this.getHtml();
                    }}
                  >
                    Дэлгэрэнгүй
                  </Button>
                  {/* Other content */}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SaleReportController;
function setHtmlContent(html: string) {
  throw new Error("Function not implemented.");
}
