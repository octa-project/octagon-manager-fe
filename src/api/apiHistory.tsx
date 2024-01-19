import axios from "axios";

// export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX :"http://43.231.114.215:7001"
export const URL_PREFIX = process.env.REACT_APP_IS_PROD
  ? process.env.REACT_APP_PROD_URL_PREFIX
  : "http://localhost:7001";

const apiHistory = (mainRouteName: string) => ({
  getManyBySaleId: (saleId: number) =>
    axios.get(`${URL_PREFIX}/sale-items/${mainRouteName}?saleId=${saleId}`),
    getMany: (startDate: string, endDate: string) =>
    axios.get(
      `${URL_PREFIX}/sale/${mainRouteName}?startDate=${startDate}&endDate=${endDate}`
    ),
});

export default apiHistory;
