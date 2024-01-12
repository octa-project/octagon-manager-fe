import axios from "axios"
//  export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://43.231.114.215:7001";
//export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://localhost:8200"
export const URL_PREFIX = "http://localhost:7001";

const apiItemCode = (mainRouteName: string) => ({

    itemCodeSaveItemCode: (data:any) => axios.post(`${URL_PREFIX}/itemcode/${mainRouteName}`,data),
    itemCodeUpdateItemCodes:(data:any) => axios.post(`${URL_PREFIX}/itemcode/${mainRouteName}`,data),
    itemCodeGetAllItemCodes: () => axios.get(`${URL_PREFIX}/itemcode/${mainRouteName}`,),  
    itemCodeGetItemCodeByIdItemCodes:(id:any) => axios.get(`${URL_PREFIX}/itemcode/${mainRouteName}?id=${id}`),
    itemCodeGetItemCodeByBarcode:(barcode:any) => axios.get(`${URL_PREFIX}/itemcode/${mainRouteName}?barcode=${barcode}`),
    itemCodeDeleteItemCodeById:(id:any) => axios.post(`${URL_PREFIX}/itemcode/${mainRouteName}?id=${id}`),
})

export default apiItemCode
