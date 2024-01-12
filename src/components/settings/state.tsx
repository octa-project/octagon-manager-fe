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

interface Printer {
    id: string;
    name: string;
    ownerName: string;
    printType: number;
    branchId: number;
    branchName: string;
    isActive: boolean;
}

interface SettingsPrinterState {
    first: boolean;
    open: boolean;
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

}

interface MainSettingState {
    mainSettings: MainSettings;
}