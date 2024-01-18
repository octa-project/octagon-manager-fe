import axios from "axios";

// export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://43.231.114.215:7001";
export const URL_PREFIX = "http://localhost:8400";

const apiSku = (mainRouteName: string) => ({
  getManyCustom: () => axios.get(`${URL_PREFIX}/itemcode/${mainRouteName}`),
  getManyGroups: () => axios.get(`${URL_PREFIX}/group/${mainRouteName}`),
  getOneBarcode: (barcode: string) =>
    axios.get(`${URL_PREFIX}/item-code/${mainRouteName}?barcode=${barcode}`),
});
export default apiSku;
