import {
  Button,
  Card,
  IconButton,
  Link,
  MenuItem,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import PurchaseCard from "../purchaseCard";
import classNames from "classnames";
import api from "@/src/api";
import router from "next/router";
import { TabContext, TabPanel } from "@mui/lab";
import { formatMoney } from "../../tools/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import SnackBar from "@/src/components/tools/snackAlert";
import SearchIcon from "@mui/icons-material/Search";

const PurchaseMain = () => {
  const inputBarcode = useRef<any>(null);

  const [searchText, setSearchText] = useState("");
  const [barcodeText, setBarcodeText] = useState("");

  // Purchase List
  const [filterValue, setFilterValue] = useState("0");
  const [tabValue, setTabValue] = useState("0");
  const [filterSupplierValue, setFilterSupplierValue] = useState("0");
  const [startDate, setStartDateValue] = useState(
    moment().format("YYYY-MM-DD 00:00:00")
  );
  const [endDate, setEndDateValue] = useState(
    moment().format("YYYY-MM-DD 23:59:59")
  );
  const [purchaseDate, setPurchaseDateValue] = useState(
    moment().format("YYYY-MM-DD 00:00:00")
  );

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [purchasesData, setPurchasesData] = useState<Purchase[]>([]);

  // Purchase Detail
  const [purchaseDetail, setPurchaseDetail] = useState<Purchase>();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [branches, setBranches] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const [supplier, setSupplier] = useState<Supplier>();

  const dateFormat = "YYYY-MM-DD";
  const { RangePicker } = DatePicker;

  let first: boolean = false;
  useEffect(() => {
    if (first) return;
    first = true;
    getSuppliers().then((res) => console.log(res));
    getPurchases().then((res) => console.log(res));
    setBranches(["Салбар 1"]);
  }, []);

  const handleDetailSupplier = (value: string) => {
    if (purchaseDetail) {
      setPurchaseDetail({
        ...purchaseDetail,
        supplierId: value,
      });
    }
  };

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    if (value === "0") {
      setPurchasesData(purchases);
    } else {
      const filteredData = purchases.filter((t) =>
        value === "1" ? t.isPaid : !t.isPaid
      );
      setPurchasesData(filteredData);
    }
  };

  const handleFilterSupplierChange = (value: string) => {
    setFilterSupplierValue(value);
    if (value === "0") {
      setPurchasesData(purchases);
    } else {
      const filteredData = purchases.filter((t) => t.supplierId === value);
      setPurchasesData(filteredData);
    }
  };

  const handleTabChange = (value: string) => {
    setPurchaseDetail({
      id: 0,
      items: [],
      supplierId: "0",
      branchId: "0",
      createdDate: "",
      totalAmount: 0,
      totalDiscount: 0,
      totalQty: 0,
      totalCost: 0,
      vat: 0,
      cityTax: 0,
      isPaid: false,
      supplierName: "",
    });
    setTabValue(value);
  };

  const handleDelete = (value: PurchaseItem) => {
    if (purchaseDetail) {
      const updatedItems = purchaseDetail.items.filter(
        (item) => item.id !== value.id
      );
      setPurchaseDetail({
        ...purchaseDetail,
        items: updatedItems,
      });
    }
  };

  const handleTextSearch = async () => {
    try {
      const isExist = purchaseDetail?.items.find(
        (t) => t.barcode === barcodeText
      );
      if (isExist) {
        SnackBar.success("Бараа нэмэгдлээ");
        setPurchaseDetail((prevPurchase) => {
          if (prevPurchase) {
            const updatedItems = prevPurchase.items.map((item) =>
              item.barcode === barcodeText
                ? { ...item, qty: item.qty + 1 }
                : item
            );

            return {
              ...prevPurchase,
              items: updatedItems,
            };
          }

          console.error("Invalid purchase data:", prevPurchase);
          return prevPurchase;
        });
      } else {
        // If the item doesn't exist, add a new item
        const result: ItemCode = await getItem(barcodeText);
        if (result) {
          const convertedPurchaseItem: PurchaseItem = {
            barcode: result.barcode,
            itemName: result.name,
            sellPrice: result.sellPrice,
            costPrice: result.costPrice,
            discount: 0,
            qty: 1,
            id: ((purchaseDetail?.items?.length || 0) + 1).toString(),
            purchaseId: "",
          };

          setPurchaseDetail((prevPurchase) => {
            if (prevPurchase) {
              const updatedItems = [
                ...prevPurchase.items,
                convertedPurchaseItem,
              ];
              return {
                ...prevPurchase,
                items: updatedItems,
              };
            }
            console.error("Invalid purchase data:", prevPurchase);
            return prevPurchase;
          });
        }
      }
      setSearchText("");
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTextSearch();
      setBarcodeText("");
    }
  };

  const handleQtyChange = (itemId: string, newQty: string) => {
    const parsedQty = parseInt(newQty, 10);

    if (parsedQty < 0) {
      SnackBar.error("Бараа хасах утга-руу орох боломжгүй");
      return;
    }

    setPurchaseDetail((prevPurchase) => {
      if (prevPurchase) {
        const updatedItems = prevPurchase.items.map((item) =>
          item.id === itemId ? { ...item, qty: parsedQty } : item
        );

        return {
          ...prevPurchase,
          items: updatedItems,
        };
      }

      // Handle the case where prevPurchase is null or undefined
      // SnackBar.warning('Invalid purchase data:', prevPurchase);
      return prevPurchase;
    });
  };

  const handleSearchDate = (dates: any, dateStrings: any[]) => {
    setStartDateValue(dateStrings[0] + " 00:00:00");
    setEndDateValue(dateStrings[1] + " 23:59:59");
  };

  const handleCardDetailClick = (purchase: Purchase) => {
    setPurchaseDetail(purchase);
    setTabValue("1");
  };

  const handleCardPayClick = (purchaseId: number) => {
    alert(`Button clicked for purchase ID: ${purchaseId}`);
  };

  const handlePayClick = (value: boolean) => {
    changePurchasePaidStatus(value);
  };

  const getPurchases = async () => {
    try {
      const result = await api.purchase_getMany.getMany();
      if (result.data.code === "200") {
        const purchaseData: any[] = result.data.data;

        const mappedPurchases: Purchase[] = purchaseData.map((item) => {
          const supplierName = suppliers.find((t) => t.id === item.id)?.name;

          const purchase: Purchase = {
            id: item.id.toString(),
            items: item.purchaseItems.map((itemData: any) => {
              const purchaseItem: PurchaseItem = {
                id: itemData.id.toString(),
                barcode: itemData.barcode,
                itemName: itemData.itemName,
                sellPrice: itemData.sellPrice,
                costPrice: itemData.costPrice,
                purchaseId: itemData.purchaseId.toString(),
                discount: itemData.discount,
                qty: itemData.qty,
              };
              return purchaseItem;
            }),
            supplierId: item.supplierId.toString(),
            supplierName: supplierName || "---",
            createdDate: item.createdDate,
            totalAmount: item.totalAmount,
            totalDiscount: item.totalDiscount,
            totalQty: item.totalQty,
            totalCost: item.totalCost,
            vat: item.vat,
            cityTax: item.cityTax,
            isPaid: item.isPaid,
            branchId: "1",
          };
          return purchase;
        });

        setPurchases(mappedPurchases);
        setPurchasesData(mappedPurchases);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Any cleanup code can be added here
    }
  };

  const getSuppliers = async () => {
    try {
      const result = await api.supplier_getMany.getMany();
      if (result.data.code === "200") {
        const supplierData: any[] = result.data.data;

        const mappedSuppliers: Supplier[] = supplierData.map((value) => {
          const supplier: Supplier = {
            id: value.id.toString(),
            code: value.code,
            name: value.name,
            email: value.email,
            phone: value.phone,
            taxNumber: value.taxNumber,
          };
          return supplier;
        });
        setSuppliers(mappedSuppliers);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Any cleanup code can be added here
    }
  };

  const handleDateChange = (date: any, dateString: string) => {
    setPurchaseDetail((prevPurchase) => {
      if (prevPurchase) {
        return {
          ...prevPurchase,
          date: dateString,
        };
      }

      // Handle the case where prevPurchase is null or undefined
      console.error("Invalid purchase data:", prevPurchase);
      return prevPurchase;
    });
  };

  const changePurchasePaidStatus = async (value: boolean) => {
    try {
      const result = await api.purchase_getMany.getMany();
      if (result.data.code === "200") {
        const purchaseData: any[] = result.data.data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Any cleanup code can be added here
    }
  };

  const getSupplierName = (id: string) => {
    return suppliers.find((t) => t.id === id)?.name;
  };

  const getItem = async (value: string) => {
    try {
      const result =
        await api.itemCode_get_by_barcode.itemCodeGetItemCodeByBarcode(value);

      if (result.data.code === "200") {
        SnackBar.success("Шинэ :" + result.data.data.name);
        return result.data.data;
      } else {
        SnackBar.warning("Алдаа гарлаа:" + result.data.message);
      }
    } catch (error) {
      // Handle error
      SnackBar.warning("Алдаа гарлаа:" + error);
    }
  };

  const saveUpdatePurchase = async (): Promise<boolean> => {
    try {
      debugger;
      const localPurchase = purchaseDetail;

      const purchaseItems = localPurchase?.items.map((itemData: any) => {
        const purchaseItem: PurchaseItem = {
          id: itemData.id.toString(),
          barcode: itemData.barcode,
          itemName: itemData.itemName,
          sellPrice: itemData.sellPrice,
          costPrice: itemData.costPrice,
          purchaseId: localPurchase?.id.toString(),
          discount: itemData.discount,
          qty: itemData.qty,
        };
        return purchaseItem;
      });

      const body = {
        ...(localPurchase?.id !== 0 && { id: localPurchase?.id }),
        date: purchaseDate,
        vat: 0,
        cityTax: 0,
        isPaid: true,
        supplierId: purchaseDetail?.supplierId,
        purchaseItems: purchaseItems,
      };
      const result = await api.purchase_saveOne.saveOne(body);
      if (result.data.code === "200") {
        SnackBar.success("Татан авалт амжилттай хийгдлээ");
        handleTabChange("0");
        getPurchases();
        return true;
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      SnackBar.warning("Алдаа гарлаа :" + error);
      return false;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <TabContext value={tabValue}>
        <TabPanel value={"0"} className="h-full">
          <div className="flex flex-col col-span-6 gap-3">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-3">
                <Button
                  className="thirdButton w-full"
                  onClick={() => handleTabChange("1")}
                >
                  ШИНЭЭР ОРЛОГО БҮРТГЭХ
                </Button>
              </div>
              <div className="col-span-4">
                <div className="flex items-center bg-white h-10 w-full rounded shadow border border-[#cbcbcb]">
                  <Input
                    className="text-[#6d758f] w-full h-full rounded border-none"
                    placeholder="Хайх..."
                    // onChange={(e) =>
                    //     handleTextSearch(e.target.value)
                    // }
                  />
                  <Image
                    src="/items/search.svg"
                    alt="icon"
                    width={24}
                    height={24}
                    className="mr-3 cursor-pointer"
                  />
                </div>
              </div>
              <div className="col-span-4">
                <RangePicker
                  className="bg-white h-10 w-full rounded shadow border border-[#cbcbcb]"
                  defaultValue={[
                    dayjs(startDate, dateFormat),
                    dayjs(endDate, dateFormat),
                  ]}
                  format={dateFormat}
                  onChange={handleSearchDate}
                />
              </div>
              <div className="col-span-1">
                <IconButton
                  className="thirdButton w-full"
                  onClick={() => getPurchases()}
                >
                  <SearchIcon className="text-red" />
                </IconButton>
              </div>

              <div className="col-span-5 flex flex-row gap-3">
                <div className="flex flex-col w-full ">
                  <span className="text-sm">Төлбөрийн төрөл</span>
                  <Select
                    className="capitalize text-[#6d758f] w-full rounded h-10"
                    IconComponent={() => (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Image
                          src="/items/filter.svg"
                          alt="filter"
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                    value={filterValue}
                    onChange={(event) =>
                      handleFilterChange(event.target.value as string)
                    }
                  >
                    <MenuItem value={"0"}>Бүгд</MenuItem>
                    <MenuItem value={"1"}>Төлсөн</MenuItem>
                    <MenuItem value={"2"}>Төлөөгүй</MenuItem>
                  </Select>
                </div>
                <div className="flex flex-col w-full ">
                  <span className="text-sm">Нийлүүлэгч</span>
                  <Select
                    className="capitalize text-[#6d758f] w-full rounded h-10"
                    IconComponent={() => (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Image
                          src="/items/filter.svg"
                          alt="filter"
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                    value={filterSupplierValue}
                    onChange={(event) =>
                      handleFilterSupplierChange(event.target.value as string)
                    }
                  >
                    <MenuItem value={"0"}>Бүгд</MenuItem>
                    {suppliers.map((value) => (
                      <MenuItem key={value.id} value={value.id}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            <div className="h-full overflow-auto">
              <div className="grid grid-cols-3 gap-3 h-full">
                {purchasesData.map((purchase) => (
                  <PurchaseCard
                    key={purchase.id}
                    purchase={purchase}
                    onDetailClick={handleCardDetailClick}
                    onPayClick={handleCardPayClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={"1"} className="h-full">
          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between">
              <div>
                {" "}
                <Button onClick={() => handleTabChange("0")}>БУЦАХ</Button>
              </div>
              <div>
                {" "}
                <Button onClick={() => saveUpdatePurchase()}>ХАДГАЛАХ</Button>
              </div>
            </div>
            <div> Орлогын бүртгэл</div>
            <div className="flex flex-col grid grid-cols-2">
              <div className="flex flex-col col-span-1 gap-3">
                <div className="flex flex-row gap-3">
                  <div className="w-36">Орлогын огноо</div>
                  <DatePicker
                    defaultValue={dayjs(purchaseDate, dateFormat)}
                    onChange={handleDateChange}
                    value={dayjs(purchaseDate, dateFormat)}
                    className="h-8 w-44 bg-white"
                    format={dateFormat}
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <div className="w-36">Салбар</div>
                  <Select
                    className="h-8 w-44 bg-white"
                    value={purchaseDetail?.branchId}
                    // onChange={(e) => this.handleSupplier(e.target.value)}
                  >
                    {branches.map((value) => (
                      <MenuItem
                      // key={value.id} value={value.id}
                      >
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-col col-span-1 gap-3">
                <div className="flex flex-row gap-3">
                  <div className="w-36">Нийлүүлэгч</div>
                  <Select
                    className="h-8 w-44 bg-white"
                    value={purchaseDetail?.supplierId}
                    onChange={(e) => handleDetailSupplier(e.target.value)}
                  >
                    {suppliers.map((value) => (
                      <MenuItem key={value.id} value={value.id}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="w-36">Төрөл</div>
                  <Select
                    className="h-8 w-44 bg-white"
                    value={supplier?.id}
                    // onChange={(e) =>}
                  >
                    {types.map((value) => (
                      <MenuItem
                      // key={value.id} value={value.id}
                      >
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="flex flex-col pb-2">
                  <span className="text-sm">Баркод уншуулах</span>
                  <div className="flex items-center bg-white h-10 w-3/12 rounded shadow border border-[#cbcbcb]">
                    <Input
                      ref={inputBarcode}
                      className="text-[#6d758f] w-full h-full rounded border-none"
                      placeholder="Баркод уншуулах..."
                      value={barcodeText}
                      onChange={(e) => setBarcodeText(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Image
                      src="/items/search.svg"
                      alt="icon"
                      width={24}
                      height={24}
                      className="mr-3 cursor-pointer"
                    />
                  </div>
                </div>
                <Table size="small">
                  <TableHead className="bg-[#8a91a5] h-14">
                    <TableRow>
                      <TableCell className="text-white font-semibold">
                        УСТГАХ
                      </TableCell>
                      <TableCell className="text-white font-semibold">
                        №
                      </TableCell>
                      <TableCell className="text-white font-semibold">
                        БАРКОД
                      </TableCell>
                      <TableCell className="text-white font-semibold">
                        НЭР
                      </TableCell>
                      {/* <TableCell className="text-white font-semibold">
                        ХӨНГӨЛӨЛТ
                      </TableCell> */}
                      <TableCell className="text-white font-semibold">
                        ТОО
                      </TableCell>
                      <TableCell
                        className="text-white font-semibold"
                        align="right"
                      >
                        ЗАРАХ ҮНЭ
                      </TableCell>
                      <TableCell
                        className="text-white font-semibold"
                        align="right"
                      >
                        АВАХ ҮНЭ
                      </TableCell>
                      <TableCell
                        className="text-white font-semibold"
                        align="right"
                      >
                        НИЙТ АВАХ ҮНЭ
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {purchaseDetail?.items?.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="center">
                          <IconButton
                            className="w-8 h-8"
                            onClick={() => handleDelete(row)}
                          >
                            <DeleteIcon className="text-red" />
                          </IconButton>
                        </TableCell>
                        <TableCell className=" text-[#8a91a5] ">
                          {row.id}
                        </TableCell>
                        <TableCell className=" text-[#8a91a5] ">
                          {row.barcode}
                        </TableCell>
                        <TableCell className=" text-[#8a91a5] ">
                          {row.itemName}
                        </TableCell>
                        {/* <TableCell className=" text-[#8a91a5] ">
                          {row.discount}
                        </TableCell> */}
                        <TableCell className=" text-[#8a91a5] ">
                          <TextField
                            className="w-2/6"
                            type="number"
                            value={row.qty}
                            onChange={(e) =>
                              handleQtyChange(row.id, e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell className=" text-[#8a91a5] " align="right">
                          {formatMoney(row.sellPrice)}
                        </TableCell>
                        <TableCell className=" text-[#8a91a5] " align="right">
                          {formatMoney(row.costPrice)}
                        </TableCell>
                        <TableCell className=" text-[#8a91a5] " align="right">
                          {" "}
                          {formatMoney(row.costPrice * row.qty)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default PurchaseMain;
