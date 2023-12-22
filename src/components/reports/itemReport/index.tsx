import React, { Component, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface ItemReportModel {

    startDate: Date;
    endDate: Date;

    datas: ItemReportModel[];

}

class ItemReport extends Component<{}, AgReportState> {
    constructor(props: any) {
        super(props);

}
render() {
    const containerStyle = { width: "100%", height: "100%" };
    const gridStyle = { height: "100%", width: "100%" };

    return (
      <div className="h-full">
       ghjk
      </div>
    );
  }
}

export default ItemReport;
