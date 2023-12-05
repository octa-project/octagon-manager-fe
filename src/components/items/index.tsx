import * as React from 'react';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Drawer, TextField } from '@mui/material';
import { Box } from '@mui/system';
import api from '@/src/api';

interface Item {
  id: number;
  barcode: string;
  name: string;
  sellPrice: number;
  qty: number;
  createdDate: string; // Assuming createdDate is a string, adjust accordingly
  isDeleted: boolean; // Assuming isDeleted is a boolean, adjust accordingly
}

interface ItemState {
  loading: boolean;
  error: string | null;
  selectedRow: Item | null;
  isDrawerOpen: boolean;
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
      isDrawerOpen: false,
      columnDefs: [
        { field: 'edit', headerName: 'Засах' },
        { field: 'name', headerName: 'Нэр', filter: 'agTextColumnFilter' },
        { field: 'barcode', headerName: 'Баркод', pivot: true },
        { field: 'sellPrice', headerName: 'Зарах үнэ' },
        { field: 'qty', headerName: 'Тоо' },
        { field: 'createdDate', headerName: 'Хугацаа' },
        { field: 'isDeleted', headerName: 'Устгасан' },
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

  getItems = async () => {
    try {
      this.setState({ loading: true, error: null });

      const result = await api.itemCode_get_all_itemcodes.itemCodeGetAllItemCodes();

      if (result.data.code === '200') {
        this.setState({ rowData: result.data.data });
      } else {
        throw new Error('Failed to fetch data');
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

      if (result.data.code === '200') {
        alert('Амжилттай устгагдлаа');
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

      const result = await api.itemCode_update_itemCode.itemCodeUpdateItemCodes(body);

      if (result.data.code === '200') {
        alert('Амжилттай засагдлаа');
        this.getItems();
      } else {
        throw new Error('Failed data');
      }
    } catch (error) {
      // Handle error
    } finally {
      this.setState({ loading: false });
    }
  };

  toggleDrawer = (isOpen: boolean, row: Item | null) => {
    this.setState({ isDrawerOpen: isOpen, selectedRow: row });
  };

  handleTextFieldChange = (field: keyof Item, value: string | number) => {
    this.setState((prevState) => ({
      selectedRow: {
        ...prevState.selectedRow,
        [field]: value,
      },
    }));
  };

  render() {
    const containerStyle = { width: '100%', height: '100%' };
    const gridStyle = { height: '100%', width: '100%' };
    const {
      rowData,
      columnDefs,
      defaultColDef,
      autoGroupColumnDef,
      selectedRow,
      isDrawerOpen,
    } = this.state;

    return (
      <>
        <Button onClick={this.getItems}>
          <TableCell>
            <Button
              className="bg-green-600 hover:bg-green-400"
              variant="contained"
            >
              БАРАА ТАТАХ
            </Button>
          </TableCell>
        </Button>

        <div className="bg-white flex-initial w-full h-screen p-2">
          <div style={containerStyle}>
            <div className="ag-theme-alpine" style={gridStyle}>
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                animateRows={true}
                rowSelection="multiple"
                defaultColDef={defaultColDef}
                enableRangeSelection={true}
                enableFillHandle={true}
                autoGroupColumnDef={autoGroupColumnDef}
                ensureDomOrder={true}
                sideBar={true}
                onRowDoubleClicked={(e) => {
                  // Ensure that e.data is of type Item
                  const itemData: Item = e.data as Item;
                  this.toggleDrawer(true, itemData);
                }}
              />
            </div>
          </div>
        </div>

        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => this.toggleDrawer(false, null)}
        >
          <Box sx={{ width: 500 }} role="presentation" className="p-10">
            <TextField
              label="Баркод"
              className="pt-5 pb-5 w-full"
              variant="standard"
              value={selectedRow?.barcode}
              onChange={(e) =>
                this.handleTextFieldChange('barcode', e.target.value)
              }
            />
            <TextField
              label="Нэр"
              className="pt-5 pb-5 w-full"
              variant="standard"
              value={selectedRow?.name}
              onChange={(e) => this.handleTextFieldChange('name', e.target.value)}
            />
            <TextField
              label="Зарах үнэ"
              className="pt-5 pb-5 w-full"
              variant="standard"
              value={selectedRow?.sellPrice}
              onChange={(e) =>
                this.handleTextFieldChange('sellPrice', e.target.value)
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
                this.handleTextFieldChange('qty', e.target.value)
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
      </>
    );
  }
}

export default ItemController;
