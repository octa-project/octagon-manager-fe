interface Item {
  id: number;
  code: string;
  name: string;
  measureName: string;
  itemGroupName: string;
  measureId: number;
  itemgroupId: number;
  createdDate: string;
  branchId: number;
  isActive: boolean;
  children: ItemCode[];
}
interface ItemCode {
  id: number;
  itemId: number;
  barcode: string;
  name: string;
  sellPrice: number;
  costPrice: number;
  measureId: number;
  measureName: string;
  qty: number;
  createdDate: string;
}

interface ItemCodeSku {
  id: number;
  itemId: number;
  barcode: string;
  name: string;
  expirationId: number;
  sellPrice: number;
  costPrice: number;
  measureId: number;
  measureName: string;
  groupId: number;
  groupName: string;
  qty: number;
  createdDate: string;
  properQty: number;
  packSize: number;
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
  tabValue: string;
  first: boolean;
  downloadAll: boolean;
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
  rowItemCodeData: ItemCode[];
  rowItemCodeSkuData: ItemCodeSku[];
  rowSearchData: Item[];
  rowSearchItemCodeData: ItemCode[];
  rowSearchItemCodeSkuData: ItemCodeSku[];
  measures: Measure[];
  itemGroups: ItemGroup[];
  skuItemGroups: ItemGroup[];
  selectedRowItemCodes: ItemCode[];
  selectedSkuGroupId: number;
  skeleten: number[];
}
