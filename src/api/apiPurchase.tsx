import axios from "axios"

// export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX :"http://43.231.114.215:7001"
export const URL_PREFIX = "http://localhost:7001";

const apiPurchase = (mainRouteName: string) => ({

    getMany: () => axios.get(`${URL_PREFIX}/purchase/${mainRouteName}`),
    saveOne: (data: any) => axios.post(`${URL_PREFIX}/purchase/${mainRouteName}`, data),
    updateStatus: (data: any) => axios.post(`${URL_PREFIX}/purchase/${mainRouteName}`, data),
})

export default apiPurchase;
