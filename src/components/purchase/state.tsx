interface Purchase {
    id: string;
    items: PurchaseItem[];
    supplierId: string;
    date: string;
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
    createdDate: string;
    lastModifiedDate: string;
    createdBy: string;
    lastModifiedBy: string;
}


interface Supplier {
    id: string;
    code: string;
    name: string;
    email: number;
    phone: number;
    taxNumber: string;
}
