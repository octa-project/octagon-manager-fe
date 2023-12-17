import axios from "axios"

export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://43.231.114.193:7002";

const apiDashboard = (mainRouteName: string) => ({

    //itemSave: (data:any) => axios.post(`${URL_PREFIX}/dashboard/${mainRouteName}`,data),
    //itemUpdate:(data:any) => axios.post(`${URL_PREFIX}/dashboard/${mainRouteName}`,data),
    //GetAllItems: () => axios.get(`${URL_PREFIX}/dashboard/${mainRouteName}`,),
    getDashboard:(date:string) => axios.get(`${URL_PREFIX}/dashboard/${mainRouteName}?date=${date}`),
    getDashboardDataWeekly:() => axios.get(`${URL_PREFIX}/dashboard/${mainRouteName}`),
    //GetItemByCode:(id:any) => axios.get(`${URL_PREFIX}/dashboard/${mainRouteName}?id=${id}`),
    //DeleteItemById:(id:any) => axios.post(`${URL_PREFIX}/dashboard/${mainRouteName}?id=${id}`),
})

export default apiDashboard
