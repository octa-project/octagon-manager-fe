import * as React from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  Alert,
  AlertTitle,
  Drawer,
  Snackbar,
  TextField,
  IconButton,
  ButtonGroup,
  Typography,
  Divider,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import api from "@/src/api";
import items from "@/src/app/items/page";
import { GroupAdd } from "@mui/icons-material";
import Image from "next/image";

//#region interfaces
interface Item {
  id: number;
  barcode: string;
  name: string;
  sellPrice: number;
  qty: number;
  measureName: string;
  createdDate: string;
  isDeleted: boolean;
}
interface ItemGroup {
  id: number;
  name: string;
  code: number;
  parentId: number;
  color: string;
  isDeleted: boolean;
  branchId: number;
}
interface Measure {
  id: number;
  name: string;
  code: string;
}
interface ItemState {
  loading: boolean;
  error: string;
  selectedRow: Item;
  selectedItemGroup: ItemGroup;
  isDrawerOpen: boolean;
  drawerType: number;
  open: boolean;
  columnDefs: any[];
  defaultColDef: any;
  autoGroupColumnDef: any;
  rowData: Item[];
  measures: Measure[];
  itemGroups: ItemGroup[];
}
//#endregion

class ItemController extends Component<{}, ItemState> {

  //#region Constructer and props
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      error: '',
      selectedRow: {
        id: 0,
        barcode: '',
        name: '',
        sellPrice: 0,
        qty: 0,
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
      isDrawerOpen: false,
      drawerType: 0,
      open: false,
      columnDefs: [
        { field: "id", headerName: "№" },
        { field: "name", headerName: "Нэр", filter: "agTextColumnFilter" },
        { field: "barcode", headerName: "Баркод", },
        { field: "sellPrice", headerName: "Зарах үнэ" },
        { field: "qty", headerName: "Тоо" },
        { field: "measureName", headerName: "Хэмжих нэгж" },
        { field: "itemGroup", headerName: "Бүлэг" },
        { field: "createdDate", headerName: "Бүртгэсэн огноо" },
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
      measures: [],
      itemGroups: [],
    };
  }

  componentDidMount() {
    this.getItems();
    this.getMeasures();
    this.getItemGroups();

  }

  //#endregion

  //#region Event

  handleTextFieldChange = (field: keyof Item, value: string | number) => {
    this.setState((prevState) => ({
      selectedRow: {
        ...prevState.selectedRow,
        [field]: value,
      },
    }));
  };

  handleTextFieldItemGroupChange = (field: keyof ItemGroup, value: string | number) => {
    this.setState((prevState) => ({
      selectedItemGroup: {
        ...prevState.selectedItemGroup,
        [field]: value,
      },
    }));
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  setItemState = (isOpen: boolean, row: Item, DrawerType: number) => {
    this.setState({
      isDrawerOpen: isOpen,
      selectedRow: row,
      drawerType: DrawerType,
    });
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
        this.handleClick();
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

      debugger
      const result = await api.measure_get_all.getMeasures();
      if (result.data.code === "200") {
        const measures: Measure[] = result.data.data.map((measure: { id: any; name: any; code: any; }) => ({
          id: measure.id,
          code: measure.code,
          name: measure.name,
        }));

        console.log(result.data.data)
        this.setState({ measures });
        this.handleClick();
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
        const rowData: Item[] = result.data.data.map((item: { id: any; barcode: any; name: any; sellPrice: any; qty: any; createdDate: any; isDeleted: string; }) => ({
          id: item.id,
          barcode: item.barcode,
          name: item.name,
          sellPrice: item.sellPrice,
          qty: item.qty,
          createdDate: item.createdDate,
          isDeleted: item.isDeleted === 'true',
        }));

        this.setState({ rowData });
        this.handleClick();
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

      const result = await api.itemCode_get_all_itemcodes.itemCodeGetAllItemCodes();

      if (result.data.code === "200") {
        const rowData: Item[] = result.data.data.map((item: { id: any; barcode: any; name: any; sellPrice: any; qty: any; measureName: any; createdDate: any; isDeleted: string; }) => ({
          id: item.id,
          barcode: item.barcode,
          name: item.name,
          sellPrice: item.sellPrice,
          qty: item.qty,
          measureName: item.measureName,
          createdDate: item.createdDate,
          isDeleted: item.isDeleted === 'true',
        }));

        console.log(result.data.data)

        this.setState({ rowData });
        this.handleClick();
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
        alert("Амжилттай устгагдлаа");
        this.getItems();
      }
    } catch (error) {
      // Handle error
    }
  };

  updateItemCode = async (item: Item | null) => {
    try {
      this.setState({ loading: true, error: '' });

      const body = {
        id: item?.id,
        barcode: item?.barcode,
        name: item?.name,
        sellPrice: item?.sellPrice,
        qty: item?.qty,
        isDeleted: false,
        branchId: 1,
      };

      const result =
        await api.itemCode_update_itemCode.itemCodeUpdateItemCodes(body);

      if (result.data.code === "200") {
        alert("Амжилттай засагдлаа");
        this.getItems();
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      // Handle error
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

  render() {

    //#region styles
    const containerStyle = { width: "100%", height: "100%" };
    const gridStyle = { height: "100%", width: "100%" };
    //#endregion

    //#region state
    const {
      rowData,
      columnDefs,
      defaultColDef,
      autoGroupColumnDef,
      selectedRow,
      selectedItemGroup,
      isDrawerOpen,
      drawerType,
      open,
    } = this.state;
    //#endregion
   
    return (
      <>
        <div className="grid grid-cols-4 gap-3">

          <div className="col-span-1 bg-white shadow-md h-screen">
            <Typography className="font-sans text-center font-semibold pt-2 pb-3 text-[#6d758f]">
              {this.state.selectedRow.id === 0 ? "Шинэ бараа бүртгэх" : "Бараа засах"}
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
                Зураг оруулах
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
                  Барааны нэр
                </Typography>
                <TextField className="w-full" value={selectedRow?.name} />
              </div>
              <div className="w-9/12">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  Баркод
                </Typography>
                <TextField variant="outlined" className="w-full" value={selectedRow?.barcode} />
              </div>
              <div className="w-9/12">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  Хэмжих нэгж
                </Typography>
                <Select
                  className="w-full"
                >
                  {this.state.measures.map((measure) => (
                    <MenuItem key={measure.id} value={measure.id}>
                      {measure.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="w-9/12">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  Барааны бүлэг
                </Typography>

                <Select
                  className="w-full"
                >
                  {this.state.itemGroups.map((itemgroup) => (
                    <MenuItem key={itemgroup.id} value={itemgroup.id}>
                      {itemgroup.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="w-9/12">
                <Typography className="font-sans text-left text-xs font-semibold pb-1 text-[#6d758f]">
                  Үнэ
                </Typography>
                <TextField variant="outlined" type="number" className="w-full" value={selectedRow?.sellPrice} />
              </div>
              <div className="w-9/12 pt-5">
                <Button
                  variant="contained"
                  className="font-sans bg-[#6d758e] text-base text-center capitalize text-white w-full h-11 hover:bg-[#6d758e]"
                >
                  Хадгалах
                </Button>
              </div>
              <div className="w-9/12">
                <Button
                  className="font-sans text-[#6d758e] text-base text-center capitalize w-full h-8"
                  onClick={() => this.setItemState(false, {
                    id: 0,
                    barcode: '',
                    name: '',
                    sellPrice: 0,
                    qty: 0,
                    measureName: "",
                    createdDate: '',
                    isDeleted: false,
                  }, 0)}
                >
                  Болих
                </Button>
              </div>

            </div>
          </div>

          <div className="flex flex-col col-span-3">
            <div className="flex h-1/5">
              <div className="p-2">

              </div>
            </div>

            <div className="bg-white flex-initial w-full h-4/5 p-2">
              <div style={containerStyle}>
                <div className="ag-theme-alpine" style={gridStyle}>
                  <AgGridReact
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>


        <Drawer
          anchor="left"
          open={isDrawerOpen && drawerType == 0}
          onClose={() => this.setItemState(false, {
            id: 0,
            barcode: '',
            name: '',
            sellPrice: 0,
            qty: 0,
            measureName: "",
            createdDate: '',
            isDeleted: false,
          }, 0)}
        >
          <Box sx={{ width: 500 }} role="presentation" className="p-10">
            <TextField
              label="Баркод"
              className="pt-5 pb-5 w-full"
              variant="standard"
              value={selectedRow?.barcode}
              InputProps={{
                readOnly: true,
              }}
              onChange={(e) =>
                this.handleTextFieldChange("barcode", e.target.value)
              }
            />
            <TextField
              label="Нэр"
              className="pt-5 pb-5 w-full"
              variant="standard"
              value={selectedRow?.name}
              onChange={(e) =>
                this.handleTextFieldChange("name", e.target.value)
              }
            />
            <TextField
              label="Зарах үнэ"
              className="pt-5 pb-5 w-full"
              variant="standard"
              value={selectedRow?.sellPrice}
              onChange={(e) =>
                this.handleTextFieldChange("sellPrice", e.target.value)
              }
            />
            <TextField
              id="standard-number"
              label="Тоо"
              type="number"
              className="pt-5 pb-20 w-full"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              value={selectedRow?.qty}
              onChange={(e) =>
                this.handleTextFieldChange("qty", e.target.value)
              }
            />
            <Button
              variant="contained"
              className="bg-green-600 hover:bg-green-400 text-white w-full"
              onClick={() => this.updateItemCode(selectedRow)}
            >
              Хадгалах
            </Button>
          </Box>
        </Drawer>

        <Drawer
          anchor="right"
          open={isDrawerOpen && drawerType == 1}
          onClose={() => this.setItemState(false, {
            id: 0,
            barcode: '',
            name: '',
            sellPrice: 0,
            qty: 0,
            measureName: "",
            createdDate: '',
            isDeleted: false,
          }, 0)}
        >

          <Box sx={{ width: 500 }} role="presentation" className="p-10">
            <TextField
              label="Нэр"
              className="pt-5 pb-5 w-full"
              variant="standard"
              value={selectedItemGroup?.name}
              // InputProps={{
              //   readOnly: true,
              // }}
              onChange={(e) =>
                this.handleTextFieldItemGroupChange("name", e.target.value)
              }
            />
            <TextField
              label="Толгой"
              className="pt-5 pb-5 w-full"
              variant="standard"
              value={selectedItemGroup?.code}
              onChange={(e) =>
                this.handleTextFieldItemGroupChange("code", e.target.value)
              }
            />

            <Button
              variant="contained"
              className="bg-green-600 hover:bg-green-400 text-white w-full"
              onClick={() => this.saveItemGroup(selectedItemGroup)}
            >
              Бүлэг хадгалах
            </Button>
          </Box>
        </Drawer>
        {/* <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert severity="success">
            <AlertTitle>Амжилттай</AlertTitle>
            Бараа шинэчлэгдлээ
          </Alert>
        </Snackbar> */}
      </>
    );
  }
}

export default ItemController;
