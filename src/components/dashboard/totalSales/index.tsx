import api from "@/src/api";
import { AssuredWorkloadSharp } from "@mui/icons-material";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Component, ReactNode } from "react";

interface TotalSaleControllerState {
  anchorEl: HTMLElement | null;
  rowData: getTopTenItem[];
}

interface getTopTenItem {
  qty: number;
  itemBarCode: number;
  itemName: string;
}

class TotalSales extends Component<{}, TotalSaleControllerState> {
  constructor(props: any) {
    super(props);

    this.state = {
      anchorEl: null,
      rowData: [],
    };
  }

  componentDidMount() {
    this.getDatas();
  }

  getDatas = async () => {
    try {
      const result = await api.get_Top_Ten_Item.GetTopTenItem();
      if (result.data.code === "200") {
        this.setState({ rowData: this.state.rowData.concat(result.data.data) });
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
    } finally {
    }
  };

  renderTableRows() {
    return this.state.rowData.map((item, index) => (
      <TableRow key={index}>
        <TableCell className="text-sm">{item.itemName}</TableCell>
        <TableCell className="text-sm">{item.itemBarCode}</TableCell>
        <TableCell className="text-sm">{item.qty}</TableCell>
      </TableRow>
    ));
  }

  render() {
    return (
      <div style={{ overflowX: "auto" }}>
        <Card className="w-full h-52 shadow-md rounded-lg items-center justify-center flex flex-col">
          <div className="bg-white flex-initial w-full h-full shadow rounded-lg overflow-auto">
            <div className="flex">
              <Table style={{ maxHeight: "300px", overflowY: "auto" }}>
                <TableHead>
                  <TableRow>
                    <TableCell className="bg-[#6d758fff] text-white ">
                      Нэр
                    </TableCell>
                    <TableCell className="bg-[#6d758fff] text-white ">
                      Код
                    </TableCell>
                    <TableCell className="bg-[#6d758fff] text-white ">
                      Тоо
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.renderTableRows()}</TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default TotalSales;
