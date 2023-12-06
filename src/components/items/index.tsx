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
} from "@mui/material";
import { Box } from "@mui/system";
import api from "@/src/api";
import items from "@/src/app/items/page";
import { GroupAdd } from "@mui/icons-material";

interface Item {
  id: number;
  barcode: string;
  name: string;
  sellPrice: number;
  qty: number;
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

interface ItemState {
  loading: boolean;
  error: string | null;
  selectedRow: Item | null;
  selectedItemGroup: ItemGroup | null;
  isDrawerOpen: boolean;
  drawerType: number;
  open: boolean;
  columnDefs: any[];
  defaultColDef: any;
  autoGroupColumnDef: any;
  rowData: Item[];
}

class ItemController extends Component<{}, ItemState> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      selectedRow: null,
      selectedItemGroup: null,
      isDrawerOpen: false,
      drawerType: 0,
      open: false,
      columnDefs: [
        {
          field: "edit",
          headerName: "Засах",
          icons: {
            sortAscending: '<i class="fa fa-sort-alpha-up"/>',
            sortDescending: '<i class="fa fa-sort-alpha-down"/>',
          },
        },
        { field: "name", headerName: "Нэр", filter: "agTextColumnFilter" },
        { field: "barcode", headerName: "Баркод", pivot: true },
        { field: "sellPrice", headerName: "Зарах үнэ" },
        { field: "qty", headerName: "Тоо" },
        { field: "createdDate", headerName: "Хугацаа" },
        { field: "itemGroup", headerName: "Бүлэг" },
        {
          field: "isDeleted",
          headerName: "Устгасан",
          checkboxSelection: false,
          headerCheckboxSelection: false,
          width: 50,
          editable: false,
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
    };
  }

  componentDidMount() {
    this.getItems();
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  getItems = async () => {
    try {
      this.setState({ loading: true, error: null });

      const result =
        await api.itemCode_get_all_itemcodes.itemCodeGetAllItemCodes();

      if (result.data.code === "200") {
        this.setState({ rowData: result.data.data });
        this.handleClick();
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      // Handle error
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
      this.setState({ loading: true, error: null });

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
      this.setState({ loading: true, error: null });

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

  toggleDrawer = (isOpen: boolean, row: Item | null, DrawerType: number) => {
    this.setState({
      isDrawerOpen: isOpen,
      selectedRow: row,
      drawerType: DrawerType,
    });
  };

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

  render() {
    const containerStyle = { width: "100%", height: "100%" };
    const gridStyle = { height: "100%", width: "100%" };
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

    return (
      <>
        <div className="flex">
          <div className="p-5">
            <Button
              className="bg-green-600 hover:bg-green-400"
              variant="contained"
              onClick={() => this.toggleDrawer(true, null, 0)}
            >
              {" "}
              БАРАА БҮРТГЭХ
            </Button>
          </div>
          <div className="p-5">
            <Button
              className="bg-green-600 hover:bg-green-400"
              variant="contained"
              onClick={() => this.toggleDrawer(true, null, 1)}
            >
              {" "}
              БҮЛЭГ НЭМЭХ
            </Button>
          </div>
          <div className="p-5">
            <Button
              className="bg-green-600 hover:bg-green-400"
              variant="contained"
              onClick={() => this.getItems}
            >
              {" "}
              БАРАА ТАТАХ
            </Button>
          </div>
        </div>

        <div className="bg-white flex-initial w-full h-screen p-2">
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
                  // Ensure that e.data is of type Item
                  const itemData: Item = e.data as Item;
                  this.toggleDrawer(true, itemData, 0);
                }}
              />
            </div>
          </div>
        </div>

        <Drawer
          anchor="left"
          open={isDrawerOpen && drawerType == 0}
          onClose={() => this.toggleDrawer(false, null, 0)}
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
          onClose={() => this.toggleDrawer(false, null, 0)}
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
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert severity="success">
            <AlertTitle>Амжилттай</AlertTitle>
            Бараа шинэчлэгдлээ
          </Alert>
        </Snackbar>
      </>
    );
  }
}

export default ItemController;
