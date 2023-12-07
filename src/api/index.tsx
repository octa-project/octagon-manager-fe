import apiItem from "./apiItem";
import apiItemCode from "./apiItemCode"
import apiReport from "./apiReport";
import apiTransaction from "./apiTransaction"
import api from '@/src/api';
import apiItemGroup from './apiItemGroup';
import apiMeasure from "./apiMeasure";


const transaction_save = apiTransaction("save-transaction")
const transaction_update = apiTransaction("update-transaction")
const transaction_delete = apiTransaction("delete-transaction-by-id")
const transaction_get_by_id = apiTransaction("get-transaction-by-id")
const transaction_get_transactions = apiTransaction("get-transactions")
const transaction_get_transactions_amount_sale_id = apiTransaction("get-transaction-amount-by-sale-id")
const transaction_get_transactions_sale_id = apiTransaction("get-transaction-by-sale-id")


const bank_transaction_save = apiTransaction("save-bank-transaction")
const bank_transaction_update = apiTransaction("update-bank-transaction")
const bank_transaction_delete = apiTransaction("delete-bank-transaction-by-id")
const bank_transaction_get_transactions = apiTransaction("get-bank-transactions")
const bank_transaction_get_by_id = apiTransaction("get-bank-transaction-by-id")


const itemCode_get_all_itemcodes = apiItemCode("get-all-itemCodes")
const itemCode_save_itemCode = apiItemCode("save-itemCode")
const itemCode_update_itemCode = apiItemCode("update-itemCode")
const itemCode_get_by_id = apiItemCode("get-itemCode-by-id")
const itemCode_get_by_barcode = apiItemCode("get-itemCode-by-barcode")
const itemCode_delete = apiItemCode("delete-itemCode_by_id")


const item_save = apiItem("save-item")
const item_update = apiItem("update-item")
const item_get_all_items = apiItem("get-all-items")
const item_get_item_by_id = apiItem("get-item-by-id")
const item_get_item_by_code = apiItem("get-item-by-code")
const item_delete = apiItem("delete-item-by-id")

const itemGroup_save_itemGroup = apiItemGroup("save-itemGroup")
const itemGroup_update_itemGroup = apiItemGroup("update-itemGroup")
const itemGroup_get_itemGroup_by_id = apiItemGroup("get-itemGroup-by-id")
const itemGroup_get_all_itemGroups = apiItemGroup("get-all-itemGroups")
const itemGroup_delete = apiItemGroup("delete-itemGroup-by-id")


const report_get_cashier_report_between_date = apiReport("get-cashier-report-between-date")
const report_get_income_report_between_date = apiReport("get-income-report-between-date")
const report_get_outcome_report_between_date = apiReport("get-outcome-report-between-date")
const report_get_price_report_between_date = apiReport("get-price-report-between-date")
const report_get_sale_report_between_date = apiReport("get-sale-report-between-date")
const report_get_transactions_report_between_date = apiReport("get-transacrions-report-between-date")

const measure_get_all = apiMeasure("get-all-measures")
const measure_get_by_id = apiMeasure("get-measure-by-id")

export default {

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

    itemCode_get_all_itemcodes,
    itemCode_save_itemCode,
    itemCode_update_itemCode,
    itemCode_get_by_id,
    itemCode_get_by_barcode,
    itemCode_delete,

    item_save,
    item_update,
    item_get_all_items,
    item_get_item_by_id,
    item_get_item_by_code,
    item_delete,

    report_get_cashier_report_between_date,
    report_get_income_report_between_date,
    report_get_outcome_report_between_date,
    report_get_price_report_between_date,
    report_get_sale_report_between_date,
    report_get_transactions_report_between_date,

    itemGroup_save_itemGroup,
    itemGroup_update_itemGroup,
    itemGroup_get_itemGroup_by_id,
    itemGroup_get_all_itemGroups,
    itemGroup_delete,

    measure_get_all,
    measure_get_by_id,
}
