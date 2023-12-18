import axios from "axios"

export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://43.231.114.215:7001";

const apiSale = (mainRouteName: string) => ({
    GetMany:(startDate:any,endDate:any) => axios.get(`${URL_PREFIX}/sale/${mainRouteName}?startDate=${startDate}&endDate=${endDate}`),
    GetOneSale:(id:any) => axios.get(`${URL_PREFIX}/sale/${mainRouteName}?id=${id}`),
    DeleteSale:(id:any) => axios.post(`${URL_PREFIX}/sale/${mainRouteName}?id=${id}`),
})
export default apiSale