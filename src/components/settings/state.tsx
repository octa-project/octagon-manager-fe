interface TabHeaders {
    id: string;
    name: string;
    index: string;
}

interface TextFieldCustom {
    id: string;
    title: string
    paramName: keyof MainSettings;
}

interface TextFieldCustomForPrinter {
    id: string;
    title: string
    paramName: keyof Printer;
}

interface Printer {
    id: string;
    name: string;
    ownerName: string;
    printType: number;
    branchId: number;
    branchName: string;
    active: boolean;
    ipAddress: string;
    cashierPrinter: boolean;
    retailDeviceName:string;

}

interface PrinterState{
    printer: Printer;
}

interface PrinterRegisterState{
    printer: Printer;
    value: string;
    printerName: string[];
}

interface SettingsPrinterState {
    first: boolean;
    open: boolean;
    modalOpen: boolean;
    modalClose: boolean;
    secondaryOpen: boolean;
    selectedPrinter: Printer;
    nonSelectedPrinter: Printer;
    printersData: Printer[];
    printersSearchData: Printer[];
    skeleten: number[];
}

interface MainSettings {

    id: number,
    name: string,
    taxNumber: string,
    contractNumber: string,
    city: string,
    address: string,
    phone: string,
    isActive: boolean,
    isDeleted: boolean,
    branchId: number,
    motto: string

}

interface MainSettingState {
    mainSettings: MainSettings;
}