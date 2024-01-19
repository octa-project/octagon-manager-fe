interface Purchase {
  id: number;
  items: PurchaseItem[];
  supplierId: string;
  supplierName: string;
  branchId: string;
  createdDate: string;
  totalAmount: number;
  totalDiscount: number;
  totalQty: number;
  totalCost: number;
  vat: number;
  cityTax: number;
  isPaid: boolean;
}

interface PurchaseItem {
  id: string;
  barcode: string;
  itemName: string;
  sellPrice: number;
  costPrice: number;
  purchaseId: string;
  discount: number;
  qty: number;
}

interface Supplier {
  id: string;
  code: string;
  name: string;
  email: number;
  phone: number;
  taxNumber: string;
}
