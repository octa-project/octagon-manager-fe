
const sleep = async (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

const currencyFormatter = (params:any) => {
  return   formatNumber(params) +'₮';
};

const currencyFormatterAgGrid = (params:any) => {
  return   formatNumber(params.value) +'₮';
};

const formatNumber = (number: number): string => {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export {
  sleep, currencyFormatter,currencyFormatterAgGrid
};
