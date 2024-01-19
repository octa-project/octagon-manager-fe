interface SaleItem {
    id: number;
    saleItemId: number;
    saleId: number;
    itemCodeId: number;
    itemName: string;
    itemBarcode: string;
    qty: number;
    unitSalePrice: number;
    totalSalePrice: number;
  }
  
  interface Sale {
    stocks: SaleItem[];
    bankTransactions: BankTransaction[];
    transactions: Transaction[];
    totalQty: number;
    totalAmount: number;
    totalPaidAmount: number;
    totalNonCashAmount: number;
    totalCashAmount: number;
    isPaid: boolean;
    cityTax: number;
    taxType: number;
    vat: number;
    discount: number;
    id: number;
  }
  
  interface SaleHistory {
    stocks: SaleItem[];
    bankTransactions: BankTransaction[];
    transactions: Transaction[];
    totalQty: number;
    createdDate: string;
    totalAmount: number;
    totalPaidAmount: number;
    totalNonCashAmount: number;
    totalCashAmount: number;
    isPaid: boolean;
    cityTax: number;
    taxType: number;
    vat: number;
    discount: number;
    id: number;
  }
  
  interface BankTransaction {
    id: number;
    date: string;
    saleId: number;
    name: string;
    pan: string;
    operationCode: string;
    entryMode: string;
    rrn: string;
    bankId: string;
    dbRefNo: string;
    terminalId: string;
    approvalCode: string;
    amount: number;
    traceNo: string;
    data: string;
    branchId: number;
  }
  
  interface Transaction {
    id: number;
    name: string;
    amount: number;
    transactionType: number;
    bankId: string;
    bankTransactionId: string;
  }
  
  interface ItemCode {
    id: number;
    branchId: number;
    itemId: number;
    barcode: string;
    name: string;
    expirationId: string;
    sellPrice: number;
    costPrice: number;
    measureId: number;
    itemGroupId: number;
    qty: number;
    properSize: number;
    packSize: number;
  }
  