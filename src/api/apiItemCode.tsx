import axios from "axios"
 export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://43.231.114.215:7400"
//export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://localhost:8200"

const apiItemCode = (mainRouteName: string) => ({

    itemCodeSaveItemCode: (data:any) => axios.post(`${URL_PREFIX}/itemcode/${mainRouteName}`,data),
    itemCodeUpdateItemCodes:(data:any) => axios.post(`${URL_PREFIX}/itemcode/${mainRouteName}`,data),
    itemCodeGetAllItemCodes: () => axios.get(`${URL_PREFIX}/itemcode/${mainRouteName}`,),  
    itemCodeGetItemCodeByIdItemCodes:(id:any) => axios.get(`${URL_PREFIX}/itemcode/${mainRouteName}?id=${id}`),
    itemCodeGetItemCodeByBarcode:(id:any) => axios.get(`${URL_PREFIX}/itemcode/${mainRouteName}?id=${id}`),
    itemCodeDeleteItemCodeById:(id:any) => axios.delete(`${URL_PREFIX}/itemcode/${mainRouteName}?id=${id}`),
})

export default apiItemCode
