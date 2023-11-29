import apiBankTerminal from "./apiBankTerminal"
import apiItem from "./apiBuilder"
import apiTransaction from "./apiTransaction"

const get_by_barcode = apiItem("get-item-by-barcode")
const get_by_barcode_like = apiItem("get-item-by-barcode-like")
const get_by_name_like = apiItem("get-item-by-name-like")

const save_sale = apiItem('save-sale')
const get_sale_by_id = apiItem('get-sale-by-id')
const add_sale_item_to_sale = apiItem('add-sale-item-to-sale')
const get_sale_items_by_sale_id = apiItem('get-sale-items-by-sale-id')
const update_sale_item_from_sale = apiItem('update-sale-item-from-sale')

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


const bank_terminal_transaction = apiBankTerminal("bank")
const bank_print_transaction = apiBankTerminal("print")


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get_by_barcode,
    get_by_barcode_like,
    get_by_name_like,
    
    save_sale,
    get_sale_by_id,
    add_sale_item_to_sale,
    get_sale_items_by_sale_id,
    update_sale_item_from_sale,

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

    bank_terminal_transaction,
    bank_print_transaction,
}
