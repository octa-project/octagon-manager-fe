import axios from "axios"

export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://localhost:8400"

const apiItem = (mainRouteName: string) => ({

    itemSave: (data:any) => axios.post(`${URL_PREFIX}/item/${mainRouteName}`,data),
    itemUpdate:(data:any) => axios.post(`${URL_PREFIX}/item/${mainRouteName}`,data),
    GetAllItems: () => axios.get(`${URL_PREFIX}/item/${mainRouteName}`,),
    GetItemById:(id:any) => axios.get(`${URL_PREFIX}/itemcode/${mainRouteName}?id=${id}`),
    GetItemByCode:(id:any) => axios.get(`${URL_PREFIX}/item/${mainRouteName}?id=${id}`),
    DeleteItemById:(id:any) => axios.delete(`${URL_PREFIX}/item/${mainRouteName}?id=${id}`),
})

export default apiItem
