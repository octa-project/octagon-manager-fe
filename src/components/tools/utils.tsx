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
