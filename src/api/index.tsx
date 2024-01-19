import apiItem from "./apiItem";
import apiItemCode from "./apiItemCode";
import apiReport from "./apiReport";
import apiTransaction from "./apiTransaction";
import api from "@/src/api";
import apiItemGroup from "./apiItemGroup";
import apiMeasure from "./apiMeasure";
import apiSale from "./apiSale";
import apiDashboard from "./apiDashboard";
import apiBranch from "./apiBranch";
import apiSettings from "@/src/api/apiSettings";
import apiWallet from "@/src/api/apiWallet";
import apiSku from "./apiSku";
import apiPurchase from "./apiPurchase";
import apiSupplier from "./apiSupplier";
import apiProfile from "@/src/api/apiProfile";
import apiPdfGenerator from "./apiPdfGenerator";
import apiHistory from "./apiHistory";

const transaction_save = apiTransaction("save-transaction");
const transaction_update = apiTransaction("update-transaction");
const transaction_delete = apiTransaction("delete-transaction-by-id");
const transaction_get_by_id = apiTransaction("get-transaction-by-id");
const transaction_get_transactions = apiTransaction("get-transactions");
const transaction_get_transactions_amount_sale_id = apiTransaction(
  "get-transaction-amount-by-sale-id"
);
const transaction_get_transactions_sale_id = apiTransaction(
  "get-transaction-by-sale-id"
);

const bank_transaction_save = apiTransaction("save-bank-transaction");
const bank_transaction_update = apiTransaction("update-bank-transaction");
const bank_transaction_delete = apiTransaction("delete-bank-transaction-by-id");
const bank_transaction_get_transactions = apiTransaction(
  "get-bank-transactions"
);
const bank_transaction_get_by_id = apiTransaction("get-bank-transaction-by-id");

// const itemCode_get_all_itemcodes = apiItemCode("get-all-itemCodes");
const itemCode_get_custom_all_itemcodes = apiItemCode("custom-all");
const itemCode_save_itemCode = apiItemCode("save-itemCode");
const itemCode_update_itemCode = apiItemCode("update-itemCode");
const itemCode_get_by_id = apiItemCode("get-itemCode-by-id");
const itemCode_get_by_barcode = apiItemCode("get-itemCode-by-barcode");
const itemCode_delete = apiItemCode("delete-itemCode_by_id");

const item_save = apiItem("save-item");
const item_update = apiItem("update-item");
//const item_get_all_items = apiItem("get-all-items");
const item_get_all_complete_items = apiItem("complete");
const item_get_item_by_id = apiItem("get-item-by-id");
const item_get_item_by_code = apiItem("get-item-by-code");
const item_delete = apiItem("delete-item-by-id");

const itemGroup_save_itemGroup = apiItemGroup("save-itemGroup");
const itemGroup_update_itemGroup = apiItemGroup("update-itemGroup");
const itemGroup_get_itemGroup_by_id = apiItemGroup("get-itemGroup-by-id");
const itemGroup_get_all_itemGroups = apiItemGroup("get-all-itemGroups");
const itemGroup_delete = apiItemGroup("delete-itemGroup-by-id");

const report_get_cashier_report_between_date = apiReport(
  "get-cashier-report-between-date"
);
const report_get_income_report_between_date = apiReport(
  "get-income-report-between-date"
);
const report_get_outcome_report_between_date = apiReport(
  "get-outcome-report-between-date"
);
const report_get_price_report_between_date = apiReport(
  "get-price-report-between-date"
);
const report_get_sale_report_between_date = apiReport(
  "get-sale-report-between-date"
);
const report_get_transactions_report_between_date = apiReport(
  "get-transacrions-report-between-date"
);
const report_get_html = apiReport("sale-report");
const get_sale_report = apiReport("get-sale-report");

const measure_get_all = apiMeasure("get-all-measures");
const measure_get_by_id = apiMeasure("get-measure-by-id");

const saleGetMany = apiSale("get-many");
const saleGetOne = apiSale("get-one");
const saleDelete = apiSale("delete");

const get_dashboard = apiDashboard("get-dashboard-data");
const get_daily_income = apiDashboard("get-daily-income");
const get_dashboard_data_weekly = apiDashboard("get-dashboard-data-weekly");
const getBranchAll = apiBranch("get-branch");
const saveBranch = apiBranch("save-branch");

const insertMainSetting = apiSettings("save-setting");
const updateMainSetting = apiSettings("save-setting");
const getMainSetting = apiSettings("get-setting-by-id");

const insertDeviceSetting = apiSettings("device-settings");
const updateDeviceSetting = apiSettings("device-settings");
const getDeviceSetting = apiSettings("device-settings");
const getDeviceListByBranch = apiSettings("device-settings-list");
const getDeviceListByBranchForOrder = apiSettings("device-settings-list-order");
const deleteDeviceSettings = apiSettings("device-settings");
const GetPrinterList = apiSettings("get-printer-list");
const get_Top_Ten_Item = apiSale("get-top-ten-item");
const getProfileInfo = apiProfile("");
const itemcode_getManyCustom = apiSku("custom-all");
const itemcode_getOneBarcode = apiSku("by-barcode");
const groups_getManyGroups = apiSku("all");
const purchase_getMany = apiPurchase("get-all");
const purchase_saveOne = apiPurchase("save");
const supplier_getMany = apiSupplier("all");
const supplier_saveOne = apiSupplier("add");
const supplier_updateOne = apiSupplier("update");
const getPdf = apiPdfGenerator("pdf=generate");
const getWalletBalance = apiWallet("get-balance");
const getWalletTransactionHistory = apiWallet("get-history");
const walletToAccountTransaction = apiWallet("wallet-to-account-transaction");
const cardToWalletTransaction = apiWallet("card-to-wallet");
const getCardWeb = apiWallet("card-web");
const getCardList = apiWallet("get-card-list");
const saveCard = apiWallet("save-card");
const walletToWalletTransaction = apiWallet("wallet-to-wallet-transaction");
const getReportFile = apiReport("getReportFile");

const sale_items_getMany_bySaleId = apiHistory("get-many-sale-id");
const sale_getMany = apiHistory("get-many");

export default {
  sale_items_getMany_bySaleId,
  sale_getMany,
  
  getWalletBalance,
  getWalletTransactionHistory,
  walletToAccountTransaction,
  walletToWalletTransaction,
  cardToWalletTransaction,
  getCardWeb,
  getCardList,
  saveCard,

  transaction_save,
  transaction_update,
  transaction_delete,
  transaction_get_by_id,
  transaction_get_transactions,
  transaction_get_transactions_amount_sale_id,
  transaction_get_transactions_sale_id,

  bank_transaction_save,
  bank_transaction_update,
  bank_transaction_delete,
  bank_transaction_get_transactions,
  bank_transaction_get_by_id,

  itemCode_get_custom_all_itemcodes,
  itemCode_save_itemCode,
  itemCode_update_itemCode,
  itemCode_get_by_id,
  itemCode_get_by_barcode,
  itemCode_delete,

  item_save,
  item_update,
  //item_get_all_items,
  item_get_all_complete_items,
  item_get_item_by_id,
  item_get_item_by_code,
  item_delete,

  report_get_cashier_report_between_date,
  report_get_income_report_between_date,
  report_get_outcome_report_between_date,
  report_get_price_report_between_date,
  report_get_sale_report_between_date,
  report_get_transactions_report_between_date,
  get_sale_report,

  itemGroup_save_itemGroup,
  itemGroup_update_itemGroup,
  itemGroup_get_itemGroup_by_id,
  itemGroup_get_all_itemGroups,
  itemGroup_delete,

  measure_get_all,
  measure_get_by_id,

  saleGetMany,
  saleGetOne,
  saleDelete,

  get_dashboard,
  get_daily_income,
  get_dashboard_data_weekly,

  getBranchAll,
  saveBranch,
  insertMainSetting,
  updateMainSetting,
  getMainSetting,

  insertDeviceSetting,
  updateDeviceSetting,
  getDeviceSetting,

  GetPrinterList,
  get_Top_Ten_Item,

  groups_getManyGroups,
  itemcode_getOneBarcode,

  purchase_getMany,
  purchase_saveOne,

  supplier_getMany,
  supplier_saveOne,
  supplier_updateOne,
  itemcode_getManyCustom,
  getProfileInfo,
  getDeviceListByBranch,
  getDeviceListByBranchForOrder,
  deleteDeviceSettings,

  getPdf,
  getReportFile,
  report_get_html,
};
