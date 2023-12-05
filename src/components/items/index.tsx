import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Component } from "react";
import api from "@/src/api";
import { TextField } from "@mui/material";
import items from "@/src/app/items/page";

interface Item {
  id: number;
  barcode: string;
  name: string;
  sellPrice: number;
  qty: number;
}

export class ItemController extends Component {
  state = {
    loading: false,
    error: null,
    isDrawerOpen: false,
    selectedRow: null,
  };

  rows: Item[] = [];

  getItems = async () => {
    try {
      this.setState({ loading: true, error: null });

      const result =
        await api.itemCode_get_all_itemcodes.itemCodeGetAllItemCodes();

      if (result.data.code === "200") {
        this.rows = result.data.data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      this.setState({ error });
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

  updateItemCode = async (item: Item ) => {
    try {
      this.setState({ loading: true, error: null });

      debugger;
      const body = {
        id: 1,
        barcode: item.barcode,
        name: "zolooo",
        sellPrice: "20000",
        measureId: "1",
        qty: "10",
        isDeleted: "false",
        branchId: "1",
      };

      const result =
        await api.itemCode_update_itemCode.itemCodeUpdateItemCodes(body);

      if (result.data.code === "200") {
        this.getItems();
      } else {
        throw new Error("Failed data");
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  toggleDrawer = (isOpen: boolean, row: Item | null) => {
    this.setState({ isDrawerOpen: isOpen });
    this.setState({ selectedRow: row });
  };

  render() {
    const { loading, error, isDrawerOpen } = this.state;

    return (
      <>
        <Button onClick={this.getItems} disabled={loading}>
          <TableCell>
            <Button
              className="bg-green-600 hover:bg-green-400"
              variant="contained"
            >
              БАРАА ТАТАХ
            </Button>
          </TableCell>
        </Button>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ЗАСАХ</TableCell>
                <TableCell>Id</TableCell>
                <TableCell>БАРКОД</TableCell>
                <TableCell>НЭР</TableCell>
                <TableCell>ЗАРАХ ҮНЭ</TableCell>
                <TableCell>ТОО</TableCell>
                <TableCell>УСТГАХ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6}>Loading...</TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6}>Error: {error}</TableCell>
                </TableRow>
              ) : (
                this.rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Button
                        className="bg-cyan-500 hover:bg-cyan-400"
                        variant="contained"
                        // onClick={() => this.updateItemCode(row)}
                        onClick={() => this.toggleDrawer(true, row)}
                      >
                        ЗАСАХ
                      </Button>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.barcode}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.sellPrice}</TableCell>
                    <TableCell>{row.qty}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => this.deleteItem(row.id)}
                        className="bg-red-500 hover:bg-red-400"
                        variant="contained"
                      >
                        УСТГАХ
                      </Button>
                      {""}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => this.toggleDrawer(false ,null  )}
        >
          <Box
            sx={{ width: 500 }}
            role="presentation"
            className="p-10"
            // onClick={() => this.toggleDrawer()}
            // onKeyDown={() => this.toggleDrawer(false)}
          >
            <TextField
              label="Баркод"
              className="pt-5 pb-5 w-full"
              variant="standard"
            />
            <TextField
              label="Нэр"
              className="pt-5 pb-5 w-full"
              variant="standard"
            />
            <TextField
              label="Зарах үнэ"
              className="pt-5 pb-5 w-full"
              variant="standard"
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
            />
            <Button
              variant="contained"
              className=" bg-green-600 hover:bg-green-400 text-white w-full"
              onClick={() => this.state.selectedRow && this.updateItemCode(this.state.selectedRow)}
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
