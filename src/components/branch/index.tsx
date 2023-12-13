"use client"
import * as React from "react";
import { useMemo, Component } from "react";
import api from "@/src/api";
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

interface ItemGroup {
    id: number;
    name: string;
    code: number;
    parentId: number;
    color: string;
    isDeleted: boolean;
    branchId: number;
}

interface BranchState {
  loading: boolean;
  error: string;
  columnDefs: any[];
  defaultColDef: any;
//   rowData: any[];
//   containerStyle: any;
//   gridStyle: any;
  itemGroups: ItemGroup[];
}

class BranchController extends Component<{}, BranchState> {

    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            error: '',
            columnDefs: [
                { field: 'athlete', headerName: 'aaaaaa', filter: "agTextColumnFilter" },
                { field: 'age', pivot: true },
                { field: 'country' },
                { field: 'year' },
                { field: 'date' },
                { field: 'sport' },
                { field: 'gold' },
                { field: 'silver' },
                { field: 'bronze', aggFunc: 'sum' },
                { field: 'total', aggFunc: 'sum' },
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
            itemGroups: [],
        };
    }

    componentDidMount() {
        this.getItemGroups();
    }

    // containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    // gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    // defaultColDef = useMemo(() => {
    //     return {
    //       flex: 1,
    //       minWidth: 100,
    //       cellDataType: false,
    //       resizable: true,
    //       sortable: true,
    //       enablePivot: true,
    //       filter: true,
    //       enableRowGroup: true,
    //       enableValue: true,
    //     };
    // }, []);

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

    getGridItems = async () => {
        const response = await fetch('https://www.ag-grid.com/example-assets/olympic-winners.json');
        const result = await response.json();
        // setRowData(result)
    }

    render() {
        return (
            <>
                <div className="ag-theme-alpine">
                <AgGridReact
                    rowData={this.state.itemGroups} // Row Data for Rows
                    columnDefs={this.state.columnDefs} // Column Defs for Columns
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection='multiple' // Options - allows click selection of rows
                    defaultColDef={this.state.defaultColDef}
                    enableRangeSelection={true}
                    enableFillHandle={true}
                    // autoGroupColumnDef={autoGroupColumnDef}
                    ensureDomOrder={true}
                    sideBar={true}
                    // onRowDoubleClicked={(e) => doubleClick(e.data)}
                    // onRowDoubleClicked={(e) => console.log('aa', e.data)}
                    />
                </div>
            </>
        );
    }
}

export default BranchController;
