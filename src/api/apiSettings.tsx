import axios from "axios"

export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://43.231.114.215:7001";

const apiSettings = (mainRouteName: string) => ({
    InsertMainSettings:(data:any) => axios.post(`${URL_PREFIX}/setting/${mainRouteName}`, data),
    GetMainSettings:(id:any ) => axios.post(`${URL_PREFIX}/setting/${mainRouteName}?id=${id}`),
    UpdateMainSettings:(data:any) => axios.put(`${URL_PREFIX}/setting/${mainRouteName}`, data),

    InsertDeviceSettings:(data:any) => axios.post(`${URL_PREFIX}/setting/${mainRouteName}`, data),
    UpdateDeviceSettings:(data:any) => axios.post(`${URL_PREFIX}/setting/${mainRouteName}`, data),
    GetDeviceSettings:(id:any) => axios.post(`${URL_PREFIX}/setting/${mainRouteName}?id=${id}`, id),

    GetPrinterList:() => axios.get(`${URL_PREFIX}/setting/${mainRouteName}`)
})
export default apiSettings