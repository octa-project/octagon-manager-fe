import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import apiSale from "@/src/api/apiSale";
import { DatePicker, Input } from "antd";
import Image from "next/image";
import dayjs from "dayjs";
import moment from "moment";
import {
  Button,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import api from "@/src/api";
import {
  ArrowRight as ArrowRightIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Edit as EditIcon,
  Checklist as ChecklistIcon,
  Add as AddIcon,
  Autorenew as AutorenewIcon,
} from "@mui/icons-material";
import { formatMoney, formatQty, formatDate } from "../../tools/utils";

interface SaleHistoryState {
  startDate: string;
  endDate: string;
  skeleten: number[];
  rowData: Sale[];
  rowSearchData: Sale[]; // Added rowSearchData to the state

  rowItemData: SaleItem[];
  rowSearchItemData: SaleItem[]; // Added rowSearchData to the state
}

class SaleHistoryController extends Component<{}, SaleHistoryState> {
  constructor(props: any) {
    super(props);

    this.state = {
      startDate: moment().format("YYYY-MM-DD 00:00:00"),
      endDate: moment().format("YYYY-MM-DD 23:59:59"),
      skeleten: [1, 2, 3, 4, 5],
      rowData: [],
      rowSearchData: [], 

      rowItemData: [], 
      rowSearchItemData: [], 
    };
  }

  first: boolean = false;
  componentDidMount() {
    if (this.first) return;
    this.first = true;
    this.getSale();
  }

  getSale = async () => {
    try {
      const startDate = moment(this.state.startDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const endDate = moment(this.state.endDate).format("YYYY-MM-DD HH:mm:ss");

      const result = await api.saleGetMany.GetMany(startDate, endDate);
      if (result.data.code === "200") {
        this.setState({ rowData: result.data.data });
        this.setState({ rowSearchData: result.data.data });
      }
    } catch (error) {
      // Handle error
    }
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

  render() {
    const { RangePicker } = DatePicker;
    const dateFormat = "YYYY-MM-DD";
    
    return (
      <div className="flex flex-col">
        <div className="flex-row">
          <div className="grid grid-cols-4">
            <div className="col-span-1">
              <RangePicker
                className="text-xl h-8 shadow w-full"
                defaultValue={[
                  dayjs(this.state.startDate, dateFormat),
                  dayjs(this.state.endDate, dateFormat),
                ]}
                format={dateFormat}
                onChange={this.handleSearchDate}
              />
            </div>
            <div className="col-span-1 pl-5">
              <Button className="button" onClick={this.getSale}>
                ШҮҮХ
              </Button>
            </div>

            <div className="col-span-2">
              <div className="flex items-center bg-white h-8 w-full rounded-md shadow border border-[#cbcbcb]">
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
          </div>
        </div>
        <div className="bg-white flex-initial w-full h-full pt-2">
          <Table>
            <TableHead className="bg-[#8a91a5] h-14">
              <TableRow className="bg-[#8a91a5]">
                <TableCell className=" font-semibold text-white ">
                  <ChecklistIcon />
                </TableCell>
                <TableCell
                  className=" font-semibold text-white "
                  align="center"
                >
                  №
                </TableCell>
                <TableCell
                  className=" font-semibold text-white "
                  align="center"
                >
                  ОГНОО
                </TableCell>
                <TableCell className=" font-semibold text-white " align="left">
                  НИЙТ ТОО
                </TableCell>
                <TableCell className=" font-semibold text-white " align="left">
                  НИЙТ ДҮН
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rowSearchData.length > 0 ? (
                this.state.rowSearchData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">
                      <IconButton
                        className="w-8 h-8"
                        // onClick={() => this.handleItemRowAddClick(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell className=" text-[#8a91a5] ">{row.id}</TableCell>
                    <TableCell className=" text-[#8a91a5] ">
                      {row.formatDate}
                    </TableCell>
                    <TableCell className=" text-[#8a91a5] " align="right">
                      {formatQty(row.qty)}
                    </TableCell>
                    <TableCell className=" text-[#8a91a5] " align="right">
                      {formatMoney(row.sellPrice)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <>
                  {this.state.skeleten.map((row) => (
                    <TableRow key={row}>
                      <TableCell>
                        <Skeleton variant="rounded" height={20} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" height={20} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" height={20} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" height={20} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" height={20} />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default SaleHistoryController;
