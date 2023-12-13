import * as React from "react";
import Button from "@mui/material/Button";
import { Component, Fragment } from "react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  TextField,
  Typography,
  Divider,
  MenuItem,
  Select,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Checkbox,
  Box,
  Collapse,
  Drawer,
} from "@mui/material";
import {
  ArrowRight as ArrowRightIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Edit as EditIcon,
  Checklist as ChecklistIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import api from "@/src/api";
import Image from "next/image";
import { Input } from 'antd';
import Item from "antd/es/list/Item";
import SnackBar from "@/src/components/tools/snackAlert"

class ItemController extends Component<{}, ItemState> {

  //#region Constructer and props
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      error: '',
      selectedItem: {
        id: 0,
        code: '',
        name: '',
        measureName: "",
        itemgroupName: "",
        measureId: 0,
        itemgroupId: 0,
        createdDate: '',
        isActive: false,
        isDeleted: false,
        branchId: 0,
        itemcodes: []
      },
      nonSelectedItem: {
        id: 0,
        code: '',
        name: '',
        measureName: "",
        itemgroupName: "",
        measureId: 0,
        itemgroupId: 0,
        createdDate: '',
        isActive: false,
        isDeleted: false,
        branchId: 0,
        itemcodes: []
      },
      selectedItemCode: {
        id: 0,
        itemId: 0,
        barcode: '',
        name: '',
        sellPrice: 0,
        purchasePrice: 0,
        qty: 1,
        measureId: 0,
        measureName: "",
        createdDate: '',
        isDeleted: false,
      },
      nonSelectedItemCode: {
        id: 0,
        itemId: 0,
        barcode: '',
        name: '',
        sellPrice: 0,
        purchasePrice: 0,
        qty: 1,
        measureId: 0,
        measureName: "",
        createdDate: '',
        isDeleted: false,
      },
      selectedItemGroup: {
        id: 0,
        name: '',
        code: 0,
        parentId: 0,
        color: '',
        isDeleted: false,
        branchId: 0,
      },
      selectedRowId: 0,
      isDrawerOpen: false,
      isFilterOpen: false,
      open: false,
      columnDefs: [
        {
          headerName: "Засах",
          cellRenderer: "buttonRenderer", // Assuming you have a custom buttonRenderer
        },
        { field: "id", headerName: "№", width: 50 },
        { field: "code", headerName: "Баркод" },
        { field: "name", headerName: "Нэр" },
        { field: "measureName", headerName: "Хэмжих нэгж" },
        { field: "itemgroupName", headerName: "Бүлэг" },
        {
          field: "isActive",
          headerName: "Идэвхтэй",
          cellRenderer: "agCheckboxCellRenderer",
          cellRendererParams: {
            checkbox: true,
          },
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: "Баркодууд",
          cellRenderer: "buttonRenderer",
          label: "aa"
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        cellDataType: false,
        resizable: true,
        sortable: true,
        enablePivot: true,
        filter: true,
        enableRowGroup: true,
        enableValue: true,
      },
      autoGroupColumnDef: {
        minWidth: 200,
      },
      rowData: [],
      rowSearchData: [],
      measures: [],
      itemGroups: [],
      selectedRowItemCodes: [],
    };
  }

  componentDidMount() {
    this.getItems();
    this.getMeasures();
    this.getItemGroups();
  }

  //#endregion

  //#region Event

  handleFilterClick = () => {
    this.setState({ isFilterOpen: true });
  };

  handleFilterClose = () => {
    this.setState({ isFilterOpen: false });
  };

  handleItemCodeTextFieldChange = (field: keyof ItemCode, value: string | number) => {
    this.setState((prevState) => ({
      selectedItemCode: {
        ...prevState.selectedItemCode,
        [field]: value,
      },
    }));
  };

  handleItemTextFieldChange = (field: keyof Item, value: string | number) => {
    this.setState((prevState) => ({
      selectedItem: {
        ...prevState.selectedItem,
        [field]: value,
      },
    }));
  };

  handleRowClick = (row: { id: any; itemcodes?: any[] }) => {
    this.setState({ selectedRowId: row.id });
    console.log("Selected Row ID:", row.id);

    // Check if itemcodes is defined before logging its length
    if (row.itemcodes) {
      console.log("itemcodes:", row.itemcodes.length);
    } else {
      console.log("itemcodes is undefined");
    }
  };

  handleUndoRowClick = () => {
    this.setState({ selectedRowId: 0 });
  };

  handleItemRowDoubleClick = (row: Item) => {
    const itemData: Item = row;
    this.setItemState(false, itemData);
  };

  handleItemRowAddClick = (row: ItemCode) => {
    const itemCodeData: ItemCode = row;
    this.setItemCodeState(true, itemCodeData);
  };

  handleTextSearch = (text: string) => {
    const lowercaseText = text.toLowerCase();

    if (text === '') {
      this.setState({ rowSearchData: this.state.rowData });
    } else {
      const filteredRowData = this.state.rowData.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === 'string') {
            const lowercaseValue = value.toLowerCase();
            return lowercaseValue.includes(lowercaseText);
          }
          return false;
        });
      });

      this.setState({ rowSearchData: filteredRowData });
    }
  };

  setItemState = (isOpen: boolean, Item: Item) => {
    this.setState({
      isDrawerOpen: isOpen,
      selectedItem: Item,
    });
  };

  setItemCodeState = (isOpen: boolean, ItemCode: ItemCode,) => {
    this.setState({
      isDrawerOpen: isOpen,
      selectedItemCode: ItemCode,
    });
  };

  onRowSelected = async (event: { api: { getSelectedRows: () => any; }; }) => {
    const selectedRows = event.api.getSelectedRows();
    if (selectedRows.length > 0) {
      const selectedItem = selectedRows[0];
      this.setState({ selectedRowItemCodes: selectedItem.itemcodes });
    }
  };

  //#endregion

  //#region Functions - ( get,set,delete,update )

  getItemGroups = async () => {
    try {
      this.setState({ loading: true, error: '' });

      const result = await api.itemGroup_get_all_itemGroups.getAllItemGroups();

      if (result.data.code === "200") {
        const itemGroups: ItemGroup[] = result.data.data.map((itemGroup: {
          id: any;
          code: any;
          name: any;
          parentId: any;
          color: any;
          createdDate: any;
        }) => ({
          id: itemGroup.id,
          code: itemGroup.code,
          name: itemGroup.name,
          parentId: itemGroup.parentId,
          color: itemGroup.color,
          createdDate: itemGroup.createdDate,
        }));

        console.log(result.data.data)

        this.setState({ itemGroups });
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  getMeasures = async () => {
    try {
      this.setState({ loading: true, error: '' });

      const result = await api.measure_get_all.getMeasures();
      if (result.data.code === "200") {
        const measures: Measure[] = result.data.data.map((measure: { id: any; name: any; code: any; }) => ({
          id: measure.id,
          code: measure.code,
          name: measure.name,
        }));

        console.log(result.data.data)
        this.setState({ measures });
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.setState({ loading: false });
    }
  }

  getItemCodes = async () => {
    try {
      this.setState({ loading: true, error: '' });

      const result = await api.itemCode_get_all_itemcodes.itemCodeGetAllItemCodes();

      if (result.data.code === "200") {
        const rowData: Item[] = result.data.data.map((item: {
          id: any;
          barcode: any;
          name: any;
          sellPrice: any;
          purchasePrice: any;
          qty: any;
          createdDate: any;
          isDeleted: boolean;
        }) => ({
          id: item.id,
          barcode: item.barcode,
          name: item.name,
          sellPrice: item.sellPrice,
          purchasePrice: item.purchasePrice,
          qty: item.qty,
          createdDate: item.createdDate,
          isDeleted: item.isDeleted,
        }));

        this.setState({ rowData });
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  getItems = async () => {
    try {
      this.setState({ loading: true, error: '' });

      const result = await api.item_get_all_items.GetAllItems();

      if (result.data.code === "200") {
        const rowData: Item[] = result.data.data.map((item: any) => {
          const { id, code, name, measureName, itemgroupName, itemgroupId, measureId, isActive, createdDate, itemcodes } = item;

          return {
            id,
            code,
            name,
            measureName,
            itemgroupName,
            itemgroupId,
            measureId,
            isActive,
            createdDate,
            itemcodes: itemcodes.map((itemCode: any) => ({
              id: itemCode.id,
              itemId: itemCode.itemId,
              barcode: itemCode.barcode,
              name: itemCode.name,
              sellPrice: itemCode.sellPrice,
              purchasePrice: itemCode.purchasePrice,
              qty: itemCode.qty,
              measureId: itemCode?.measureId,
              measureName: itemCode?.measureName,
              createdDate: itemCode.createdDate,
              isDeleted: itemCode.isDeleted,
            })),
          };
        });

        console.log(result.data.data);
        this.setState({ rowData });
        this.setState({ rowSearchData: rowData });
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  deleteItem = async (id: number) => {
    try {
      const result = await api.itemCode_delete.itemCodeDeleteItemCodeById(id);

      if (result.data.code === "200") {
        SnackBar.success("Амжилттай устгагдлаа");
        this.getItems();
      }
    } catch (error) {
      SnackBar.error("Алдаа гарлаа :" + error);
    }
  };

  saveUpdateItemCode = async (itemCode: ItemCode) => {
    try {
      this.setState({ loading: true, error: '' });
      const body = {
        ...(itemCode?.id !== 0 && { id: itemCode?.id }),
        itemId: itemCode?.itemId,
        barcode: itemCode?.barcode,
        name: itemCode?.name,
        sellPrice: itemCode?.sellPrice,
        purchasePrice: itemCode?.purchasePrice,
        measureId: itemCode?.measureId,
        qty: itemCode?.qty,
        isDeleted: false,
        branchId: 1,
      };

      if (itemCode?.id === 0) {
        const result = await api.itemCode_save_itemCode.itemCodeSaveItemCode(body);
        if (result.data.code === "200") {
          SnackBar.success("Амжилттай хадгаллаа");
          this.setItemCodeState(false, this.state.nonSelectedItemCode);
          this.getItems();
        } else {
          throw new Error("Failed data");
        }
      } else {
        const result = await api.itemCode_update_itemCode.itemCodeUpdateItemCodes(body);
        if (result.data.code === "200") {
          SnackBar.success("Амжилттай засагдлаа");
          this.setItemCodeState(false, this.state.nonSelectedItemCode);
          this.getItems();
        } else {
          SnackBar.error("Алдаа гарлаа");

        }
      }
    } catch (error) {
      SnackBar.error("Алдаа гарлаа :" + error);
    } finally {
      this.setState({ loading: false });
    }
  };

  saveUpdateItem = async (item: Item) => {
    try {
      this.setState({ loading: true, error: '' });

      const body = {
        ...(item?.id !== 0 && { id: item?.id }),
        code: item?.code,
        name: item?.name,
        itemgroupId: item?.itemgroupId,
        measureId: item?.measureId,
        branchId: 1,
        isActive: true,
        isDeleted: false,
      };

      if (item?.id === 0) {
        const result = await api.item_save.itemSave(body);
        if (result.data.code === "200") {
          SnackBar.success("Амжилттай хадгаллаа");
          this.setItemState(false, this.state.nonSelectedItem);
          this.getItems();
        } else {
          throw new Error("Failed data");
        }
      } else {
        const result = await api.item_update.itemUpdate(body);
        if (result.data.code === "200") {
          SnackBar.success("Амжилттай засагдлаа");
          this.setItemState(false, this.state.nonSelectedItem);
          this.getItems();
        } else {
          throw new Error("Failed data");
        }
      }
    } catch (error) {
      SnackBar.error("Алдаа гарлаа :" + error);
    } finally {
      this.setState({ loading: false });
    }
  };

  saveItemGroup = async (itemGroup: ItemGroup | null) => {
    try {
      this.setState({ loading: true, error: '' });

      const body = {
        name: itemGroup?.name,
        code: itemGroup?.code,
        parentId: itemGroup?.parentId,
        color: "itemGroup?.color",
        isDeleted: false,
        branchId: 1,
      };
      const result = await api.itemGroup_save_itemGroup.saveItemGroup(body);
      if (result.data.code === "200") {
        alert("Амжилттай бүлэг үүслээ");
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Handle error
    } finally {
      this.setState({ loading: false });
    }
  };

  //#endregion

  //#region UIFormat

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

  //#endregion

  render() {

    //#region styles
    const containerStyle = { width: "100%", height: "100%" };
    const gridStyle = { height: "100%", width: "100%" };
    //#endregion

    //#region state
    const {
      rowData,
      rowSearchData,
      columnDefs,
      defaultColDef,
      // gridRef,
      autoGroupColumnDef,
      selectedItem,
      nonSelectedItem,
      selectedItemCode,
      nonSelectedItemCode,
      selectedItemGroup,
      selectedRowId,
      isDrawerOpen,
      isFilterOpen,
      open,
    } = this.state;
    //#endregion

    return (
      <>
        <div className="grid grid-cols-5 gap-3">

          <div className="col-span-1 bg-white shadow-md h-screen">
            <Typography className="font-sans text-center font-semibold pt-2 pb-3 text-[#6d758f] bg-[#f1f2f4]">
              {this.state.selectedItem.id === 0 ? "ШИНЭ БАРАА БҮРТГЭХ" : "БАРАА ЗАСАХ"}
            </Typography>
            <Divider className="bg-[#c5cee0] shadow"></Divider>
            <div className="flex flex-col items-center justify-center h-52">
              <Image
                src="/itemstand.svg"
                alt="octa logo"
                className="p-5"
                width={180}
                height={180}
              />
              <Button
                variant="contained"
                className="font-sans bg-[#6d758e] text-xs text-center capitalize hover:bg-[#6d758e] text-white w-32 h-8"
              >
                ЗУРАГ ОРУУЛАХ
              </Button>
            </div>

            <div className="flex flex-col items-center gap-4 justify-center pt-5">
              {/* <div className="w-9/12">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  Нийлүүлэгч
                </Typography>

                <Select
                  className="w-full"
                >
                  <MenuItem value={10}>Золжаргал</MenuItem>
                  <MenuItem value={20}>Төгөлдөр</MenuItem>
                  <MenuItem value={30}>Үүрээ</MenuItem>
                </Select>
              </div> */}
              <div className="w-9/12">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  БАРААНЫ НЭР {selectedItem.id !== 0 && `(№ ${selectedItem.id})`}
                </Typography>
                <TextField className="w-full" value={selectedItem?.name}
                  onChange={(e) =>
                    this.handleItemTextFieldChange("name", e.target.value)
                  }
                />
              </div>
              <div className="w-9/12">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  БАРКОД
                </Typography>
                <TextField variant="outlined" className="w-full" value={selectedItem?.code}
                  onChange={(e) =>
                    this.handleItemTextFieldChange("code", e.target.value)
                  }
                />
              </div>
              <div className="w-9/12">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  ХЭМЖИХ НЭГЖ
                </Typography>
                <Select className="w-full" value={selectedItem?.measureId}
                  onChange={(e) =>
                    this.handleItemTextFieldChange("measureId", e.target.value)
                  }>
                  {this.state.measures.map((measure) => (
                    <MenuItem key={measure.id} value={measure.id}>
                      {measure.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="w-9/12">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  БАРААНЫ БҮЛЭГ
                </Typography>

                <Select
                  className="w-full" value={selectedItem?.itemgroupId}
                  onChange={(e) =>
                    this.handleItemTextFieldChange("itemgroupId", e.target.value)
                  }>
                  {this.state.itemGroups.map((itemgroup) => (
                    <MenuItem key={itemgroup.id} value={itemgroup.id}>
                      {itemgroup.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              {/* <div className="w-9/12">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  Үнэ
                </Typography>
                <TextField variant="outlined" type="number" className="w-full"
                // value={selectedItem?.sellPrice} 
                />
              </div> */}
              <div className="w-9/12 pt-5">
                <Button
                  variant="contained"
                  className="font-sans bg-[#6d758e] text-base text-center capitalize text-white w-full h-11 hover:bg-[#6d758e]"
                  onClick={() => this.saveUpdateItem(selectedItem)}>
                  ХАДГАЛАХ
                </Button>
              </div>
              <div className="w-9/12">
                <Button
                  className="font-sans text-[#6d758e] text-base text-center capitalize w-full h-8"
                  onClick={() => this.setItemState(false, nonSelectedItem)}>
                  БОЛИХ
                </Button>
              </div>

            </div>
          </div>
          <div className="flex flex-col col-span-4">
            <div className="flex h-24 p-3">
              <div className="flex-initial w-full h-full">
                <div className="grid grid-cols-4 gap-4 pt-5">
                  <div className="col-span-2">
                    <div className="flex items-center bg-white h-14 w-full rounded-2xl shadow border border-[#cbcbcb]">
                      <Input
                        className="capitalize text-[#6d758f] w-full h-full rounded-2xl border-none pl-3 pr-8"
                        placeholder="Хайх..."
                        onChange={(e) =>
                          this.handleTextSearch(e.target.value)
                        }
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
                  <div className="col-span-1">
                    <div
                      className="flex flex-row bg-white h-14 w-full rounded-2xl shadow">
                      <Select
                        className="capitalize text-[#6d758f] w-full rounded-2xl"
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
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </div>
                  </div>
                  <div
                    className="flex flex-row bg-white h-14 w-full rounded-2xl shadow">
                    <Select
                      className="capitalize text-[#6d758f] w-full rounded-2xl">
                      <MenuItem className="font-sans" value={10}>Барааны нэгдсэн сан</MenuItem>
                      <MenuItem className="font-sans" value={20}>Twenty</MenuItem>
                      <MenuItem className="font-sans" value={30}>Thirty</MenuItem>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full p-3">
              <div className="bg-white flex-initial w-full h-full shadow rounded-lg overflow-auto">
                <div className="flex">
                  <Table>
                    <TableHead className="" >
                      <TableRow className="bg-[#8a91a5]">
                        <TableCell className="font-sans font-semibold text-white "><ChecklistIcon /></TableCell>
                        <TableCell className="font-sans font-semibold text-white " align="center">ЗАСАХ</TableCell>
                        <TableCell className="font-sans font-semibold text-white " align="center">НЭМЭХ</TableCell>
                        <TableCell className="font-sans font-semibold text-white " align="left">№</TableCell>
                        <TableCell className="font-sans font-semibold text-white " align="left">КОД</TableCell>
                        <TableCell className="font-sans font-semibold text-white " align="left">НЭР</TableCell>
                        <TableCell className="font-sans font-semibold text-white " align="left">ХЭМЖИХ НЭГЖ</TableCell>
                        <TableCell className="font-sans font-semibold text-white " align="left">БҮЛЭГ</TableCell>
                        <TableCell className="font-sans font-semibold text-white " align="center">БАРААНЫ ТӨРЛҮҮД</TableCell>
                        <TableCell className="font-sans font-semibold text-white " align="center">ТӨЛӨВ</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowSearchData.map((row) => (
                        <Fragment key={row.id}>
                          <TableRow key={row.id} className="h-2">
                            <TableCell className="w-4">
                              <div>
                                <IconButton
                                  onClick={() => selectedRowId === row.id ? this.handleUndoRowClick() : this.handleRowClick(row)}
                                  className={selectedRowId === row.id ? "bg-[#8a91a5]" : "bg-white"}>
                                  {selectedRowId === row.id ? <ArrowDropDownIcon className="text-white" /> : <ArrowRightIcon />}
                                </IconButton>
                              </div>
                            </TableCell>
                            <TableCell className="w-4" align="center">
                              <div>
                                <IconButton onClick={() => this.handleItemRowDoubleClick(row)}>
                                  <EditIcon />
                                </IconButton>
                              </div>
                            </TableCell>
                            <TableCell className="w-4" align="center">
                              <div>
                                <IconButton onClick={() => this.handleItemRowAddClick({
                                  id: 0, itemId: row.id, barcode: '',
                                  name: '', sellPrice: 0, purchasePrice: 0,
                                  qty: 0, measureId: 1, measureName: "", createdDate: '', isDeleted: false,
                                })}>
                                  <AddIcon />
                                </IconButton>
                              </div>
                            </TableCell>
                            <TableCell className="font-sans text-[#8a91a5] font-semibold" align="left">{row.id}</TableCell>
                            <TableCell className="font-sans text-[#8a91a5] font-semibold" align="left">{row.code}</TableCell>
                            <TableCell className="font-sans text-[#8a91a5] font-semibold" align="left">{row.name}</TableCell>
                            <TableCell className="font-sans text-[#8a91a5] font-semibold" align="left">{row.measureName}</TableCell>
                            <TableCell className="font-sans text-[#8a91a5] font-semibold" align="left">{row.itemgroupName}</TableCell>
                            <TableCell className="font-sans text-[#8a91a5] font-semibold" align="center">{`( ${row.itemcodes.length} )`}</TableCell>
                            <TableCell className="font-sans w-6" align="center">
                              <Checkbox defaultChecked={row.isActive} disabled />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={10} className="p-0 m-0 bg-[#f1f2f4]">
                              <Collapse in={selectedRowId === row.id && row.itemcodes && row.itemcodes.length > 0} timeout="auto" unmountOnExit className="p-3 w-full">
                                <Typography className="font-sans font-semibold text-[#8a91a5] text-left text-base">
                                  БАРААНЫ ТӨРЛҮҮД
                                </Typography>
                                <Box className="w-full bg-white">
                                  <Table className="w-full">
                                    <TableHead className="bg-[#8a91a5]">
                                      <TableRow>
                                        <TableCell className="font-sans text-white font-semibold" align="center">ЗАСАХ</TableCell>
                                        <TableCell className="font-sans text-white font-semibold">БАРКОД</TableCell>
                                        <TableCell className="font-sans text-white font-semibold">НЭР</TableCell>
                                        <TableCell className="font-sans text-white font-semibold">ХЭМЖИХ НЭГЖ</TableCell>
                                        <TableCell className="font-sans text-white font-semibold" align="right">ЗАРАХ ҮНЭ</TableCell>
                                        <TableCell className="font-sans text-white font-semibold" align="right">АВАХ ҮНЭ</TableCell>
                                        <TableCell className="font-sans text-white font-semibold" align="right">ТОО</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {selectedRowId === row.id && row.itemcodes && row.itemcodes.length > 0 &&
                                        (row.itemcodes.map((itemCode) => (
                                          <TableRow key={itemCode.id}>
                                            <TableCell align="center" >
                                              <IconButton className="w-8 h-8"
                                                onClick={() => this.handleItemRowAddClick(itemCode)}>
                                                <EditIcon />
                                              </IconButton>
                                            </TableCell>
                                            <TableCell className="font-sans text-[#8a91a5] ">{itemCode.barcode}</TableCell>
                                            <TableCell className="font-sans text-[#8a91a5] ">{itemCode.name}</TableCell>
                                            <TableCell className="font-sans text-[#8a91a5] ">{itemCode.measureName}</TableCell>
                                            <TableCell className="font-sans text-[#8a91a5] " align="right">{this.formatMoney(itemCode.sellPrice)}</TableCell>
                                            <TableCell className="font-sans text-[#8a91a5] " align="right">{this.formatMoney(itemCode.purchasePrice)}</TableCell>
                                            <TableCell className="font-sans text-[#8a91a5] " align="right">{this.formatQty(itemCode.qty)}</TableCell>
                                          </TableRow>
                                        ))
                                        )}
                                    </TableBody>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* <div className="ag-theme-alpine" style={gridStyle}>
                  <AgGridReact
                    // ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    rowSelection="single"
                    defaultColDef={defaultColDef}
                    enableRangeSelection={true}
                    enableFillHandle={true}
                    autoGroupColumnDef={autoGroupColumnDef}
                    ensureDomOrder={true}
                    sideBar={true}
                    onRowDoubleClicked={(e) => {

                      const itemData: Item = e.data as Item;
                      this.setItemState(false, itemData, 0);
                    }}
                  // onRowDoubleClicked={(e) => {
                  //   const itemData = e.data as Item;
                  //   this.setState({ selectedItem: itemData, subitems: itemData.itemcodes });
                  //   this.setItemState(false, itemData, 0);
                  // }}
                  />
                </div> */}

        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => this.setItemCodeState(false, nonSelectedItemCode)}>
          <Box sx={{ width: 400 }}
            role="presentation"
            className="flex flex-col bg-[#f1f2f4] h-full">
            <div className="flex flex-col w-full h-1/6 items-center justify-center bg-[#8a91a5]">
              <Typography className="w-full font-sans font-semibold text-lg text-center text-white">
                {selectedItemCode.id === 0 ? "БАРААНЫ ТӨРӨЛ НЭМЭХ" : "БАРААНЫ ТӨРӨЛ ЗАСАХ"}
              </Typography>
              <Typography className="w-full font-sans font-semibold text-lg text-center text-white">
                {selectedItem.name}
              </Typography>
            </div>
            <div className="flex flex-col items-center justify-start h-5/6 gap-5 p-7">

              <div className="w-full">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  БАРКОД {selectedItemCode.id !== 0 && `(№ ${selectedItemCode.id})`}
                </Typography>
                <TextField
                  className="w-full"
                  variant="outlined"
                  value={selectedItemCode?.barcode}
                  onChange={(e) =>
                    this.handleItemCodeTextFieldChange("barcode", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  НЭР
                </Typography>
                <TextField
                  className="w-full"
                  variant="outlined"
                  value={selectedItemCode?.name}
                  onChange={(e) =>
                    this.handleItemCodeTextFieldChange("name", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  ЗАРАХ ҮНЭ
                </Typography>
                <TextField
                  type="number"
                  className="w-full"
                  variant="outlined"
                  value={selectedItemCode?.sellPrice}
                  onChange={(e) =>
                    this.handleItemCodeTextFieldChange("sellPrice", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  АВАХ ҮНЭ
                </Typography>
                <TextField
                  type="number"
                  className="w-full"
                  variant="outlined"
                  value={selectedItemCode?.purchasePrice}
                  onChange={(e) =>
                    this.handleItemCodeTextFieldChange("purchasePrice", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  ХЭМЖИХ НЭГЖ
                </Typography>
                <Select className="w-full" value={selectedItemCode?.measureId}
                  onChange={(e) =>
                    this.handleItemCodeTextFieldChange("measureId", e.target.value)
                  }>
                  {this.state.measures.map((measure) => (
                    <MenuItem key={measure.id} value={measure.id}>
                      {measure.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="w-full">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  ТОО
                </Typography>
                <TextField
                  type="number"
                  className="w-full"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={selectedItemCode?.qty}
                  onChange={(e) =>
                    this.handleItemCodeTextFieldChange("qty", e.target.value)
                  }
                />
              </div>
              <div className="w-9/12">
                <Button
                  variant="contained"
                  className="font-sans bg-[#6d758e] text-base text-center capitalize text-white w-full h-11 hover:bg-[#6d758e]"
                  onClick={() => this.saveUpdateItemCode(selectedItemCode)}>
                  {selectedItemCode.id === 0 ? "БҮРТГЭХ" : "ШИНЭЧЛЭХ"}
                </Button>
              </div>
              <div className="w-9/12">
                <Button
                  className="font-sans text-[#6d758e] text-base text-center capitalize w-full h-8"
                  onClick={() => this.setItemCodeState(false, nonSelectedItemCode)}>
                  БОЛИХ
                </Button>
              </div>
            </div>

          </Box>
        </Drawer>
      </>
    );
  }
}

export default ItemController;
