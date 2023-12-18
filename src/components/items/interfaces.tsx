interface Item {
  id: number;
  code: string;
  name: string;
  measureName: string;
  itemgroupName: string;
  measureId: number;
  itemgroupId: number;
  createdDate: string;
  branchId: number;
  isActive: boolean;
  isDeleted: boolean;
  itemcodes: ItemCode[]
}
interface ItemCode {
  id: number;
  itemId: number;
  barcode: string;
  name: string;
  sellPrice: number;
  purchasePrice: number;
  measureId: number;
  measureName: string;
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
interface Measure {
  id: number;
  name: string;
  code: string;
}
interface ItemState {
  loading: boolean;
  error: string;
  selectedItem: Item;
  nonSelectedItem: Item;
  selectedItemCode: ItemCode;
  nonSelectedItemCode: ItemCode;
  selectedItemGroup: ItemGroup;
  selectedRowId: number;
  isDrawerOpen: boolean;
  isFilterOpen: boolean;
  open: boolean;
  columnDefs: any[];
  defaultColDef: any;
  autoGroupColumnDef: any;
  rowData: Item[];
  rowSearchData: Item[],
  measures: Measure[];
  itemGroups: ItemGroup[];
  selectedRowItemCodes: ItemCode[];
}