import axios from "axios"

export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://43.231.114.215:8400"

const apiItem = (mainRouteName: string) => ({
  getByBarCode: (code: string) => axios.get(`${URL_PREFIX}/item/${mainRouteName}?barcode=${code}`),
  getByBarCodeLike: (code: string) => axios.get(`${URL_PREFIX}/item/${mainRouteName}?barcode=${code}`),
  getByBarNameLike: (name: string) => axios.get(`${URL_PREFIX}/item/${mainRouteName}?name=${name}`),

  saveSale: (data: any) => axios.post(`${URL_PREFIX}/sale/${mainRouteName}`, data),
  getSaleById: (sid:number) => axios.get(`${URL_PREFIX}/sale/${mainRouteName}?id=${sid}`),
  addSaleItemToSale: (sid:number, code: string) => axios.post(`${URL_PREFIX}/sale-item/${mainRouteName}?saleId=${sid}&barcode=${code}`),
  getSaleItemsBySaleId: (sid:number) => axios.get(`${URL_PREFIX}/sale-item/${mainRouteName}?id=${sid}`),
  updateSaleItemFromSale: (sid:number, code: string, qty:number) => axios.post(`${URL_PREFIX}/sale-item/${mainRouteName}?saleId=${sid}&barcode=${code}&qty=${qty}`),
})

export default apiItem
