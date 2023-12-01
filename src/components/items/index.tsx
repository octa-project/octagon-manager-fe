import api from "@/src/api";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Result } from "postcss";
import { Component } from "react";
import { get } from "http";

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

      if (result.data.code == "200") {
        alert("Амжилттай устгагдлаа");
        this.getItems();
      }
    } catch (error) {}
  };

  render() {
    const { loading, error } = this.state;

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
      </>
    );
  }
}

export default ItemController;
