interface TabHeaders {
    id: string;
    name: string;
    index: string;
}

interface Printer {
    id: string;
    name: string;
    ownerName: string;
    printType: number;
    branchId: number;
    branchName: string;
    isActive: boolean;
}

interface settingsPrinterState {
    first: boolean;
    open: boolean;
    selectedPrinter: Printer;
    nonSelectedPrinter: Printer;
    printersData: Printer[];
    printersSearchData: Printer[];
}