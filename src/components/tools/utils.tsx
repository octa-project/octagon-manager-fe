export const formatMoney = (amount: number | bigint) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
    }).format(amount);

    return `${formattedAmount} ₮`;
};

export const formatQty = (amount: number | bigint) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
    }).format(amount);

    return `${formattedAmount}`;
};
export const formatDate = (date: {
    getFullYear: () => any;
    getMonth: () => number;
    getDate: () => any;
    getHours: () => any;
    getMinutes: () => any;
    getSeconds: () => any;
}) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

