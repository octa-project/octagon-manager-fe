"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { DatePicker, Input } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import api from "@/src/api";
import dynamic from "next/dynamic";
import { Details, DetailsSharp, More } from "@mui/icons-material";
import { Console } from "console";
import ViewListIcon from "@mui/icons-material/ViewList";
import { formatMoney } from "../../tools/utils";
import SnackBar from "@/src/components/tools/snackAlert";

const HistoryController = () => {
  // utils
  const [searchText, setSearchText] = useState("");

  // Payment
  const [payments, setPaymentsValue] = useState<Transaction[]>([]);

  // sale
  const [sale, setSaleValue] = useState<Sale>();
  const [sales, setSalesValue] = useState<SaleHistory[]>([]);
  const [saleItems, setSaleItemsValue] = useState<SaleItem[]>([]);

  let startDate = moment().format("YYYY-MM-DD 00:00:00");
  let endDate = moment().format("YYYY-MM-DD 23:59:59");
  // local Storage
  const [mySale, setMySale] = useState<Sale | null>(null);
  const updateData = (value: Sale) => {
    setMySale(value);
    localStorage.setItem("mySale", JSON.stringify(value));
  };
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleClearButtonClick = () => {
    setSearchText("");
  };
  const filteredSales = sales.filter((row) => {
    const searchTextDigits = searchText.replace(/\D/g, ""); // Remove non-numeric characters from searchText
    const totalAmountDigits = formatMoney(row.totalAmount).replace(/\D/g, ""); // Remove non-numeric characters from totalAmount

    // Check if totalAmount contains the search text
    return totalAmountDigits.includes(searchTextDigits);
  });
  const handleSearchDate = (dates: any, dateStrings: any[]) => {
    (startDate = dateStrings[0] + " 00:00:00"),
      (endDate = dateStrings[1] + " 00:00:00"),
      console.log("onchange:", startDate, endDate);
  };
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (id: number) => {
    getSaleItemsBySaleId(id);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    console.log("adsadadsd");
    setOpenDialog(false);
  };

  const getSalesByDate = async () => {
    try {
      console.log("startDate:", startDate, endDate);
      const result = await api.sale_getMany.getMany(startDate, endDate);
      if (result.data.code === "200") {
        if (result.data.data) {
          const initSales: SaleHistory[] = result.data.data;
          setSalesValue(initSales);
        } else SnackBar.success("data flgf");
      } else {
        SnackBar.error("Алдаа гарлаа : " + result.data.message);
      }
    } catch (error) {
      SnackBar.error("Алдаа гарлаа : " + error);
    }
  };

  const getSaleItemsBySaleId = async (id: number) => {
    try {
      const result = await api.sale_items_getMany_bySaleId.getManyBySaleId(id);
      if (result.data.code === "200") {
        if (result.data.data) {
          const saleItems: SaleItem[] = result.data.data;
          setSaleItemsValue(saleItems);
        } else SnackBar.success("data flgf");
      } else {
        SnackBar.error("Алдаа гарлаа : " + result.data.message);
      }
    } catch (error) {
      SnackBar.error("Алдаа гарлаа : " + error);
    }
  };

  let first: boolean = true;
  useEffect(() => {
    if (first) {
      getSalesByDate();
    }
    first = false;
  }, []);

  // search and create
  const dateFormat = "YYYY-MM-DD";

  const getItemByBarcode = () => {};
  const { RangePicker } = DatePicker;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col w-full h-14">
        <div className="grid grid-cols-10 gap-5">
          <Input
            className="w-full col-span-4"
            placeholder="Төлөх дүнээр Хайх..."
            onChange={handleSearchInputChange}
          />

          <div className="col-span-3 flex flex-row gap-3">
            <RangePicker
              className="w-5/6 h-full"
              defaultValue={[
                dayjs(startDate, dateFormat),
                dayjs(endDate, dateFormat),
              ]}
              onChange={handleSearchDate}
            />
            <Button
              onClick={getSalesByDate}
              variant="contained"
              className="w-1/6"
            >
              ШҮҮХ
            </Button>
          </div>
        </div>
      </div>
      <div className="h-full w-full">
        <div className="grid grid-10"></div>
        <div className="w-full h-full">
          <Table size="small">
            <TableHead className="bg-[#8a91a5] h-10">
              <TableRow>
                <TableCell>
                  <span className="text-white font-sans font-bold">№</span>
                </TableCell>
                <TableCell>
                  <span className="text-white font-sans font-bold">Огноо</span>
                </TableCell>
                <TableCell>
                  <span className="text-white font-sans font-bold">
                    Барааны тоо
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-white font-sans font-bold">
                    Төлөх дүн
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-white font-sans font-bold">
                    Төлсөн дүн
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-white font-sans font-bold">НЭР</span>
                </TableCell>{" "}
                <TableCell align="right">
                  <span className="text-white font-sans font-bold">
                    Бараанууд
                  </span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className=" text-[#8a91a5] ">
                    <span>{filteredSales.indexOf(row) + 1}</span>
                  </TableCell>
                  <TableCell className=" text-[#8a91a5] ">
                    <span>{row.createdDate}</span>
                  </TableCell>
                  <TableCell className=" text-[#8a91a5] ">
                    <span>{row.totalQty}</span>
                  </TableCell>
                  <TableCell className=" text-[#8a91a5] ">
                    <span>{formatMoney(row.totalAmount)}</span>
                  </TableCell>
                  <TableCell className=" text-[#8a91a5] ">
                    <span>{formatMoney(row.totalPaidAmount)}</span>
                  </TableCell>
                  <TableCell className=" text-[#8a91a5] " align="left">
                    {"Zoloo"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      className="w-8 h-8"
                      onClick={() => handleOpenDialog(row.id)}
                      color="primary"
                    >
                      <ViewListIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Борлуулсан бараа</DialogTitle>
            <DialogContent>
              <Table>
                <TableHead className="bg-[#8a91a5] h-10">
                  <TableRow>
                    <TableCell>
                      <span className="text-white font-sans font-bold">№</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-white font-sans font-bold">
                        БАРКОД
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-white font-sans font-bold">
                        НЭР
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-white font-sans font-bold">
                        ЗАРАХ ҮНЭ
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-white font-sans font-bold">
                        ТОО
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-white font-sans font-bold">
                        Дүн
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="overflow-y-auto">
                  {saleItems.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className=" text-[#8a91a5] ">
                        <span>{saleItems.indexOf(row) + 1}</span>
                      </TableCell>
                      <TableCell className=" text-[#8a91a5] ">
                        <span>{row.itemBarcode}</span>
                      </TableCell>
                      <TableCell className=" text-[#8a91a5] ">
                        <span>{row.itemName}</span>
                      </TableCell>
                      <TableCell className=" text-[#8a91a5] ">
                        <span>{formatMoney(row.unitSalePrice)}</span>
                      </TableCell>
                      <TableCell className=" text-[#8a91a5] ">
                        <span>{row.qty}</span>
                      </TableCell>
                      <TableCell className=" text-[#8a91a5] " align="right">
                        {row.totalSalePrice}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Хаах
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default HistoryController;
