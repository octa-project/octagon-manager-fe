interface Purchase {

    id: string;
    items: PurchaseItem[];
    suplierId: string;
    suplierName: string;
    date: string;
    time: string;
    totalAmount: number;
}

interface PurchaseItem {

    id: string;
    name: string;
    barcode: string;
    qty: number;
    costPrice:number;
}