import axios from "axios"

export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://43.231.114.215:7001";

const apiItem = (mainRouteName: string) => ({

    itemSave: (data:any) => axios.post(`${URL_PREFIX}/item/${mainRouteName}`,data),
    itemUpdate:(data:any) => axios.post(`${URL_PREFIX}/item/${mainRouteName}`,data),
    GetAllItems: () => axios.get(`${URL_PREFIX}/item/${mainRouteName}`,),
    GetItemById:(id:any) => axios.get(`${URL_PREFIX}/item/${mainRouteName}?id=${id}`),
    GetItemByCode:(id:any) => axios.get(`${URL_PREFIX}/item/${mainRouteName}?id=${id}`),
    DeleteItemById:(id:any) => axios.post(`${URL_PREFIX}/item/${mainRouteName}?id=${id}`),
})

export default apiItem
